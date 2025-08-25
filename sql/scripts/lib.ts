import { hashSync } from 'bcrypt';
import postgres from 'postgres';
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

export function getPassword(password: string): string {
    return hashSync(password, 10)
}

export const primarySql = postgres('postgres://postgres:password@localhost:5432/bank_simulation_dev_dotnet')
export const auditSql = postgres('postgres://postgres:password@localhost:5433/bank_simulation_audit_dev_dotnet')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function readFile(fileSql: string){
    return fs.readFileSync(path.join(__dirname, '..', 'sqls', fileSql), 'utf8')
}