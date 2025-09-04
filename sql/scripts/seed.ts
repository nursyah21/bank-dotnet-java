import { faker } from "@faker-js/faker";
import { auditSql, cleanDatabase, getPassword, getUser, primarySql, testLogMutation } from "./lib.ts";

async function genRole(roles: Array<string>) {

    const rolesData = roles.map(roleName => [roleName]);

    await primarySql.unsafe(`
        INSERT INTO roles (name) 
        SELECT * FROM UNNEST($1::text[])
        ON CONFLICT (name) DO NOTHING
    `, [primarySql.array(rolesData)])

    const log = {
        userId: null,
        action: "add_role",
        message: `Role "${roles}" added`
    }

    await testLogMutation(log)
}

async function genCustomer(length: number) {
    const password = getPassword('password')

    const customerData: Array<any[]> = [];
    for (let i = 0; i < length; i++) {
        const user = getUser();
        user.username = user.username.substring(0, 15) + i.toString().padStart(4, '0')
        user.email = `${user.username}@gmail.com`
        customerData.push([
            user.username,
            user.email,
            user.birth_date,
            password,
            true,
            50.00
        ]);
    }

    await primarySql.unsafe(`
    INSERT INTO users (username, email, birth_date, password_hash, is_validated, balance)
        -- Use a generic text array and explicitly cast the values
        SELECT * FROM UNNEST($1::text[], $2::text[], $3::date[], $4::text[], $5::boolean[], $6::numeric[])
    `, [
        primarySql.array(customerData.map(d => d[0])),
        primarySql.array(customerData.map(d => d[1])),
        primarySql.array(customerData.map(d => d[2])),
        primarySql.array(customerData.map(d => d[3])),
        primarySql.array(customerData.map(d => d[4])),
        primarySql.array(customerData.map(d => d[5])),
    ])

    await primarySql.unsafe(`
        INSERT INTO user_roles (user_id, role_id)
        SELECT id, (SELECT id FROM roles WHERE name = 'customer')
        FROM users
        WHERE is_validated = TRUE
    `)

    const log = {
        userId: null,
        action: "generate customer",
        message: `generate ${length} customer`
    }

    await testLogMutation(log)
}

async function genAdmin(length: number) {
    const password = getPassword('password')

    const adminData: Array<any[]> = [];
    for (let i = 0; i < length; i++) {
        const user = getUser();
        user.username = 'admin' + i.toString().padStart(4, '0')
        user.email = `${user.username}@gmail.com`
        adminData.push([
            user.username,
            user.email,
            user.birth_date,
            password,
            true,
        ]);
    }

    await primarySql.unsafe(`
    INSERT INTO users (username, email, birth_date, password_hash, is_validated)
        -- Use a generic text array and explicitly cast the values
        SELECT * FROM UNNEST($1::text[], $2::text[], $3::date[], $4::text[], $5::boolean[])
    `, [
        primarySql.array(adminData.map(d => d[0])),
        primarySql.array(adminData.map(d => d[1])),
        primarySql.array(adminData.map(d => d[2])),
        primarySql.array(adminData.map(d => d[3])),
        primarySql.array(adminData.map(d => d[4])),
    ])

    await primarySql.unsafe(`
        INSERT INTO user_roles (user_id, role_id)
        SELECT id, (SELECT id FROM roles WHERE name = 'admin')
        FROM users
        WHERE username IN (${adminData.map(d => `'${d[0]}'`).join(', ')})
    `)

    const log = {
        userId: null,
        action: "generate admin",
        message: `generate ${length} admin`
    }

    await testLogMutation(log)
}

async function getCustomerIds(): Promise<Array<string>> {
    const customerUsers = await primarySql`
        SELECT u.id
        FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.role_id = r.id
        WHERE r.name = 'customer'
    `

    return customerUsers.map(user => user.id)
}

async function genTransaction(length: number, customerIds: Array<string>) {
    if (customerIds.length < 2) {
        console.warn("Not enough customers to generate transactions. Skipping.")
        return;
    }

    const transactionsDataForArray = [];
    for (const senderId of customerIds) {
        for (let i = 0; i < length; i++) {
            let receiverId = faker.helpers.arrayElement(customerIds);
            while (senderId === receiverId) {
                receiverId = faker.helpers.arrayElement(customerIds);
            }

            transactionsDataForArray.push([
                senderId,
                receiverId,
                faker.finance.amount({ min: 5, max: 50, dec: 2 }),
                'send'
            ]);
        }
    }

    await primarySql.unsafe(`
        INSERT INTO transactions (sender_id, receiver_id, amount, type)
        SELECT * FROM UNNEST($1::uuid[], $2::uuid[], $3::numeric[], $4::transaction_type[])
    `, [
        primarySql.array(transactionsDataForArray.map(d => d[0])),
        primarySql.array(transactionsDataForArray.map(d => d[1])),
        primarySql.array(transactionsDataForArray.map(d => d[2])),
        primarySql.array(transactionsDataForArray.map(d => d[3])),
    ])

    await primarySql.unsafe(`
        WITH transaction_updates AS (
            SELECT sender_id AS user_id, -SUM(amount) AS balance_change FROM transactions GROUP BY sender_id
            UNION ALL
            SELECT receiver_id AS user_id, SUM(amount) AS balance_change FROM transactions GROUP BY receiver_id
        )
        UPDATE users
        SET balance = users.balance + changes.total_change
        FROM (
            SELECT user_id, SUM(balance_change) AS total_change
            FROM transaction_updates
            GROUP BY user_id
        ) AS changes
        WHERE users.id = changes.user_id;
    `)

    const log = {
        userId: null,
        action: "generate transaction",
        message: `generate ${length} transaction for ${customerIds.length} customer`
    }

    await testLogMutation(log)
}

async function fixNegativeBalances() {
    const negativeBalanceUsers = await primarySql`
        SELECT id, balance
        FROM users
        WHERE balance < 0
    `

    for (const user of negativeBalanceUsers) {
        const topUpAmount = 50.00 - Number(user.balance)

        await primarySql`
            UPDATE users
            SET balance = balance + ${topUpAmount}
            WHERE id = ${user.id}
        `
    }

    const log = {
        userId: null,
        action: "balance_fix",
        message: `Fixed negative balance`
    }
    await testLogMutation(log)
}

async function main() {
    const usersLength = 1000
    const adminLength = 5
    const userTransactionLength = 100

    try {
        await cleanDatabase()

        await genRole(['admin', 'customer'])
        await genCustomer(usersLength)
        await genAdmin(adminLength)
        const customerIds = await getCustomerIds()

        await genTransaction(userTransactionLength, customerIds)
        await fixNegativeBalances()

        console.log("Seeding successfully.")
    } catch (error) {
        console.log("Seeding error:", error)
        throw error
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

main()
