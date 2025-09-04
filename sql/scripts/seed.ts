import { faker } from '@faker-js/faker'
import fs from 'fs'
import { auditSql, getUser, primarySql } from "./lib.ts"

const usersLength = 1000
const userTransactionLength = 100

let sqlContent = ""
let sqlContentAuditLog = ""
const usersId = []


function seedRoleUser() {
    sqlContent += `-- Seed roles\n`
    sqlContent += `INSERT INTO roles (name) VALUES ('admin'), ('customer') ON CONFLICT (name) DO NOTHING;\n\n`
}

function seedUsersAndRoles() {
    const users = []
    const adminUser = getUser()
    adminUser.username = 'admin'
    adminUser.email = 'admin@mail.com'
    users.push(adminUser)

    for (let i = 0; i < usersLength; i++) {
        users.push(getUser())
    }

    sqlContent += `-- Seed 1001 users (including admin)\n`
    sqlContent += `INSERT INTO users (no_id, username, email, birth_date, password_hash)\n`
    sqlContent += `VALUES\n`

    for (let i = 0; i < users.length; i++) {
        sqlContent += `('${users[i].no_id}', '${users[i].username}', '${users[i].email}', '${users[i].birth_date}', '${users[i].password_hash}')`
        if (i != users.length - 1) {
            sqlContent += ','
        }
        sqlContent += '\n'
    }

    sqlContent += `ON CONFLICT (username) DO NOTHING;\n\n`

    sqlContent += `-- Assign roles to users\n`
    sqlContent += `INSERT INTO user_roles (user_id, role_id)\n`
    sqlContent += `SELECT id, (SELECT id FROM roles WHERE name = 'admin') FROM users WHERE username = 'admin';\n`

    sqlContent += `INSERT INTO user_roles (user_id, role_id)\n`
    sqlContent += `SELECT id, (SELECT id FROM roles WHERE name = 'customer') FROM users WHERE username != 'admin';\n\n`
}

function applyUsersAndRoles() {

}

function getUserId() {

}

async function seedTransactions() {
    console.log("Fetching existing user IDs for transaction seeding...")
    // HANYA mengambil kolom 'id' untuk mengoptimalkan kecepatan.
    const users = await primarySql`SELECT id FROM users`;
    console.log(`Fetched ${users.length} user IDs. Generating transaction data...`);

    const fakeTransactions = [];

    for (let i = 0; i < usersLength; i++) {
        const senderId = faker.string.uuid();

        for (let j = 0; j < userTransactionLength; j++) {
            const receiverId = faker.string.uuid();
            const amount = faker.finance.amount({ min: 10, max: 500, dec: 2 });

            fakeTransactions.push({
                sender_id: senderId,
                receiver_id: receiverId,
                amount: amount,
                type: 'send'
            });
        }
    }

    sqlContent += `-- Seed fake transactions\n`
    sqlContent += `INSERT INTO transactions (sender_id, receiver_id, amount, type)\n`
    sqlContent += `VALUES\n`

    for (let i = 0; i < fakeTransactions.length; i++) {
        const t = fakeTransactions[i];
        sqlContent += `('${t.sender_id}', '${t.receiver_id}', ${t.amount}, '${t.type}')`
        if (i != fakeTransactions.length - 1) {
            sqlContent += ','
        }
        sqlContent += '\n'
    }
}


async function seedAuditLogs() {
    const actions = ['login', 'logout', 'transfer_money', 'top_up', 'password_change'];
    const fakeLogs = [];

    for (let i = 0; i < usersLength; i++) {
        const userId = faker.string.uuid();
        for (let j = 0; j < userTransactionLength; j++) {
            const action = faker.helpers.arrayElement(actions);
            const details = JSON.stringify({
                ip: faker.internet.ipv4(),
                userAgent: faker.internet.userAgent(),
                additional_info: `Simulated action for user ${userId}`
            });
            fakeLogs.push({ user_id: userId, action, details });
        }
    }

    sqlContentAuditLog += `-- Seed fake audit log\n`
    sqlContentAuditLog += `INSERT INTO users (user_id, action, details)\n`
    sqlContentAuditLog += `VALUES\n`

    for (let i = 0; i < fakeLogs.length; i++) {
        sqlContentAuditLog += `('${fakeLogs[i].user_id}', '${fakeLogs[i].action}', '${fakeLogs[i].details}'')`
        if (i != fakeLogs.length - 1) {
            sqlContentAuditLog += ','
        }
        sqlContentAuditLog += '\n'
    }
}

function writeGenerateSeed() {
    try {
        seedRoleUser()
        seedUsersAndRoles()
        seedTransactions()
        seedAuditLogs()
        fs.writeFileSync('seed.sql', sqlContent)
        fs.writeFileSync('seed_audit.sql', sqlContentAuditLog)
    } catch (error) {
        console.log("Generate seeding file error:", error)
    }
}

async function applySeeder() {
    try {
        // only seeding if data not exist
        const roles = await primarySql`SELECT COUNT(*) FROM roles`;
        if (roles[0].count === '0') {
            await primarySql.unsafe(sqlContent);
        }

        const audit = await auditSql`SELECT COUNT(*) FROM audit_log`;
        if (audit[0].count === '0') {
            await auditSql.unsafe(sqlContentAuditLog);
        }
    } catch (error) {
        console.log("Apply seeder error:", error)
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

async function main() {
    try {
        writeGenerateSeed()
        await applySeeder()

        console.log("Seeding successfully.")
    } catch (error) {
        console.log("Seeding error:", error)
    }
}

main()
