import { hashSync } from 'bcrypt';
import postgres from 'postgres';
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { faker } from '@faker-js/faker';

export function getPassword(password: string): string {
    return hashSync(password, 10)
}

export const primarySql = postgres('postgres://postgres:password@localhost:5432/bank_simulation_dev')
export const auditSql = postgres('postgres://postgres:password@localhost:5433/bank_simulation_audit_dev')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function readFile(fileSql: string){
    return fs.readFileSync(path.join(__dirname, '..', 'sqls', fileSql), 'utf8')
}

export function getUser() {
    const username = faker.internet.username().replace(/[^a-zA-Z0-9_]/g, '').substring(0, 28)
    const email = `${username}@gmail.com`
    const birth_date = faker.date.past({ years: 50, refDate: '2000-01-01' }).toISOString().split('T')[0]
    
    // for convenient "is_validated = true".
    // the default schema in database "is_validate = false"
    const is_validated = true
    const balance = 100.00
    const password_hash = 'password must be reassign with getPassword'

    return { username, email, birth_date, password_hash, is_validated, balance }
}

export async function testLogMutation(
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

export async function cleanDatabase() {
    const primaryTruncateDDL = readFile('truncate.sql')
    const auditTruncateDDL = readFile('truncate_audit.sql')
    await primarySql.unsafe(primaryTruncateDDL)
    await auditSql.unsafe(auditTruncateDDL)
}