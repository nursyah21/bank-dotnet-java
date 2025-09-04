import { primarySql, auditSql, getUser, getPassword, readFile } from './lib.ts'
import { randomBytes } from 'node:crypto'

async function testLogMutation(
    { userId, action, message }:
        { userId: string | null, action: string, message: string }
) {
    await auditSql.unsafe('CALL sp_log_mutation($1, $2, $3)', [userId, action, message]);

    const logEntry = userId
        ? await auditSql`
        SELECT * FROM audit_log 
        WHERE user_id = ${userId} AND action = ${action} AND message = ${message}
    `
        : await auditSql`
        SELECT * FROM audit_log 
        WHERE user_id IS NULL AND action = ${action} AND message = ${message}
    `;

    if (logEntry.length === 0) {
        throw new Error("sp_log_mutation failed: Log entry not found.");
    }
}

async function testAddRole(roleName: string) {
    await primarySql.unsafe('CALL sp_add_role($1)', [roleName])

    const roleResult = await primarySql`SELECT * FROM roles WHERE name = ${roleName}`
    if (roleResult.length === 0) {
        throw new Error(`sp_add_role failed: Role '${roleName}' not found.`)
    }

    const log = {
        userId: null,
        action: "add_role",
        message: `Role "${roleName}" added`
    }

    await testLogMutation(log)
}

async function testDeleteRole(roleName: string) {
    await primarySql.unsafe('CALL sp_delete_role($1)', [roleName])

    const roleResult = await primarySql`SELECT * FROM roles WHERE name = ${roleName} LIMIT 1`

    if (roleResult.length !== 0) {
        throw new Error(`sp_delete_role failed: Role '${roleName}' was not deleted.`)
    }

    const log = {
        userId: null,
        action: "delete_role",
        message: `Role "${roleName}" deleted`
    }

    await testLogMutation(log)
}


async function testRegisterUser(username: string): Promise<string> {
    const user = getUser()
    user.username = username
    user.is_validated = false
    user.password_hash = getPassword('password')

    await primarySql.unsafe('CALL sp_register_user($1, $2, $3, $4)', [user.username, user.email, user.password_hash, user.birth_date])

    const userResult = await primarySql`SELECT * FROM users WHERE username = ${user.username} LIMIT 1`
    const userId = userResult[0].id

    if (userResult.length === 0) {
        throw new Error("sp_register_user failed: User not found.")
    }
    if (userResult[0].is_validated) {
        throw new Error("sp_register_user failed: User should not be validated initially.")
    }

    const log = {
        userId: userId,
        action: "register",
        message: "create new account"
    }

    await testLogMutation(log)
    return userId;
}

async function testValidateUser(userId: string) {
    await primarySql.unsafe('CALL sp_validate_user($1)', [userId])

    const validatedUser = await primarySql`SELECT is_validated FROM users WHERE id = ${userId} LIMIT 1`
    if (!validatedUser[0].is_validated) {
        throw new Error("sp_validate_user failed: User was not validated.")
    }

    const log = {
        userId: userId,
        action: "validate_user",
        message: "User was validated"
    }
    await testLogMutation(log)
}

async function testPromoteToAdmin(userId: string) {
    await primarySql.unsafe('CALL sp_promote_to_admin($1)', [userId])

    const userRole = await primarySql`
        SELECT r.name FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = ${userId}
        LIMIT 1
    `
    if (userRole[0].name !== 'admin') {
        throw new Error("sp_promote_to_admin failed: User was not promoted to admin.")
    }

    const log = {
        userId: userId,
        action: "change role user",
        message: "promote to admin"
    }

    await testLogMutation(log)
}

async function testCreateTokenResetPasswordUser(userId: string, token: string) {
    await primarySql.unsafe('CALL sp_create_reset_password_token($1, $2)', [userId, token])

    const tokenExists = await primarySql`SELECT * FROM password_reset_tokens WHERE user_id = ${userId} AND token = ${token}`

    if (tokenExists.length === 0) {
        throw new Error("sp_create_reset_password_token failed: Token was not created.")
    }

    const log = {
        userId: userId,
        action: "create reset password token",
        message: "created new token for reset password"
    }
    await testLogMutation(log)
}

async function testResetPasswordUser(userId: string, token: string) {
    const newPasswordHash = getPassword('new_password')
    await primarySql.unsafe('CALL sp_reset_password_user($1, $2)', [token, newPasswordHash])

    const updatedUser = await primarySql`SELECT password_hash FROM users WHERE id = ${userId} LIMIT 1`
    if (updatedUser[0].password_hash !== newPasswordHash) {
        throw new Error("sp_reset_password_user failed: Password was not updated.")
    }

    const tokenExists = await primarySql`SELECT * FROM password_reset_tokens WHERE token = ${token}`
    if (tokenExists.length !== 0) {
        throw new Error("sp_reset_password_user failed: Token was not deleted.")
    }

    const log = {
        userId: userId,
        action: "reset password",
        message: "user password was reset and token deleted"
    }

    await testLogMutation(log)
}

async function testDeleteResetPasswordExpiredTokens() {
    await primarySql`UPDATE password_reset_tokens SET expires_at = NOW() - INTERVAL '1 hour'`

    await primarySql.unsafe('CALL sp_delete_expired_password_reset_tokens()', [])

    const tokenExists = await primarySql`SELECT * FROM password_reset_tokens`
    if (tokenExists.length !== 0) {
        throw new Error("sp_delete_expired_password_reset_tokens failed: Expired token was not deleted.")
    }

    const log = {
        userId: null,
        action: "delete expired token",
        message: "token was deleted"
    }

    await testLogMutation(log)
}

async function testTransferMoneyByCustomer(senderId: string, receiverId: string, transferAmount: number) {
    const initialSenderBalance = 100.00;
    const initialReceiverBalance = 0.00;

    await primarySql`UPDATE users SET balance = ${initialSenderBalance} WHERE id = ${senderId}`
    await primarySql`UPDATE users SET balance = ${initialReceiverBalance} WHERE id = ${receiverId}`

    await primarySql.unsafe('CALL sp_transfer_money_by_customer($1, $2, $3)', [senderId, receiverId, transferAmount])

    const newSenderBalance = await primarySql`SELECT balance FROM users WHERE id = ${senderId}`
    const newReceiverBalance = await primarySql`SELECT balance FROM users WHERE id = ${receiverId}`

    if (newSenderBalance[0].balance !== (initialSenderBalance - transferAmount).toFixed(2)) {
        throw new Error(`sp_transfer_money_by_customer failed: Sender balance is incorrect. Expected ${(initialSenderBalance - transferAmount).toFixed(2)}, got ${newSenderBalance[0].balance}`)
    }
    if (newReceiverBalance[0].balance !== (initialReceiverBalance + transferAmount).toFixed(2)) {
        throw new Error(`sp_transfer_money_by_customer failed: Receiver balance is incorrect. Expected ${(initialReceiverBalance + transferAmount).toFixed(2)}, got ${newReceiverBalance[0].balance}`)
    }

    const log = {
        userId: senderId,
        action: "transfer money",
        message: `send money ${transferAmount.toFixed(2)} to ${receiverId}`
    }

    await testLogMutation(log)
}

async function testTopUpMoneyByAdmin(adminId: string, userId: string, topUpAmount: number) {
    await primarySql`UPDATE users SET balance = 0.00 WHERE id = ${userId}`

    await primarySql.unsafe('CALL sp_top_up_money_by_admin($1, $2, $3)', [adminId, userId, topUpAmount])

    const newBalance = await primarySql`SELECT balance FROM users WHERE id = ${userId}`

    if (newBalance[0].balance !== topUpAmount.toFixed(2)) {
        throw new Error(`sp_top_up_money_by_admin failed: User balance is incorrect. Expected ${topUpAmount.toFixed(2)}, got ${newBalance[0].balance}`)
    }

    const log = {
        userId: adminId,
        action: "top up money",
        message: `top up money ${topUpAmount.toFixed(2)} to ${userId}`
    }

    await testLogMutation(log)
}

async function testWithdrawalMoneyByUser(userId: string, withdrawalAmount: number) {
    const firstBalance = withdrawalAmount * 2;

    await primarySql`UPDATE users SET balance = ${firstBalance} WHERE id = ${userId}`

    await primarySql.unsafe('CALL sp_withdrawal_money_by_user($1, $2)', [userId, withdrawalAmount])

    const newBalance = await primarySql`SELECT balance FROM users WHERE id = ${userId}`

    if (newBalance[0].balance !== withdrawalAmount.toFixed(2)) {
        throw new Error(`sp_withdrawal_money_by_user failed: User balance is incorrect. Expected ${withdrawalAmount.toFixed(2)}, got ${newBalance[0].balance}`)
    }

    const log = {
        userId: userId,
        action: "withdrawal money",
        message: `withdraw money ${withdrawalAmount.toFixed(2)}`
    }

    await testLogMutation(log)
}

async function cleanDatabase() {
    const primaryTruncateDDL = readFile('truncate.sql')
    const auditTruncateDDL = readFile('truncate_audit.sql')
    await primarySql.unsafe(primaryTruncateDDL)
    await auditSql.unsafe(auditTruncateDDL)
}


async function main() {
    try {
        await cleanDatabase()

        await testAddRole("customer")
        await testAddRole("admin")
        await testAddRole("temprole")
        await testDeleteRole("temprole")

        const users = {
            customerOne: await testRegisterUser("user1"),
            customerTwo: await testRegisterUser("user2"),
            adminUser: await testRegisterUser("admin"),
        };

        await testValidateUser(users.customerOne);
        await testValidateUser(users.customerTwo);
        await testValidateUser(users.adminUser);
        await testPromoteToAdmin(users.adminUser);

        const tokenResetPassword = randomBytes(32).toString('hex');
        await testCreateTokenResetPasswordUser(users.customerOne, tokenResetPassword);
        await testResetPasswordUser(users.customerOne, tokenResetPassword);

        await testDeleteResetPasswordExpiredTokens();

        await testTransferMoneyByCustomer(users.customerOne, users.customerTwo, 50.00);
        await testWithdrawalMoneyByUser(users.customerOne, 50.00);
        await testTopUpMoneyByAdmin(users.adminUser, users.customerOne, 75.00);

        console.log("All stored procedure tests passed successfully!")
    } catch (error) {
        console.error("Test failed. Exiting.\n" + error)
        throw error
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

main()