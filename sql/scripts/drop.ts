import postgres from 'postgres'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const primarySql = postgres('postgres://postgres:password@localhost:5432/bank_simulation_dev_dotnet')
const auditSql = postgres('postgres://postgres:password@localhost:5433/bank_simulation_audit_dev_dotnet')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function dropPrimaryDatabase() {
    try {
        const primaryDropPath = path.join(__dirname, '..', 'sqls', 'drop.sql')
        const primaryDropDDL = fs.readFileSync(primaryDropPath, 'utf8')

        await primarySql.unsafe(primaryDropDDL)
    } catch (error) {
        console.error("Primary Database drop error:\n" + error)
        throw error
    } finally {
        await primarySql.end()
    }
}

async function dropAuditDatabase() {
    try {
        const auditDropPath = path.join(__dirname, '..', 'sqls', 'drop_audit.sql')
        const auditDropDDL = fs.readFileSync(auditDropPath, 'utf8')
        
        await auditSql.unsafe(auditDropDDL)
    } catch (error) {
        console.error("Audit Database drop error:\n" + error)
        throw error
    } finally {
        await auditSql.end()
    }
}

async function main() {
    try {
        await dropPrimaryDatabase()
        await dropAuditDatabase()

        console.log("All drop operations completed successfully.")
    } catch (error) {
       console.error("Drop failed. Exiting.\n"+error)
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

main()