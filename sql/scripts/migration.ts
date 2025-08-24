import postgres from 'postgres'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const primarySql = postgres('postgres://postgres:password@localhost:5432/bank_simulation_dev_dotnet')
const auditSql = postgres('postgres://postgres:password@localhost:5433/bank_simulation_audit_dev_dotnet')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


async function runPrimaryMigrationSchema(){
    try {
        const schemaDDL = fs.readFileSync(path.join(__dirname, '..', 'sqls', 'schema.sql'), 'utf8')
        await primarySql.unsafe(schemaDDL)        

    } catch (error) {
        console.error("Primary Schema migration error:\n")
        throw error
    }
}

async function runPrimaryMigrationProcedure(){
    try {
        const procedureDDL = fs.readFileSync(path.join(__dirname, '..', 'sqls', 'procedure.sql'), 'utf8')
        await primarySql.unsafe(procedureDDL)
        
    } catch (error) {
        console.error("Primary Procedure migration error:\n")
        throw error
    }
}

async function runAuditMigrationSchema(){
    try {
        const schemaDDL = fs.readFileSync(path.join(__dirname, '..', 'sqls', 'schema_audit.sql'), 'utf8')
        await auditSql.unsafe(schemaDDL)        

    } catch (error) {
        console.error("Audit Schema migration error:\n")
        throw error
    }
}

async function runAuditMigrationProcedure(){
    try {
        const procedureDDL = fs.readFileSync(path.join(__dirname, '..', 'sqls', 'procedure_audit.sql'), 'utf8')
        await auditSql.unsafe(procedureDDL)
        
    } catch (error) {
        console.error("Audit Procedure migration error:\n")
        throw error
    }
}

async function main() {
    try {
        await runPrimaryMigrationSchema()
        await runPrimaryMigrationProcedure()

        await runAuditMigrationSchema()
        await runAuditMigrationProcedure()
        console.log("All migrations completed successfully.")
    } catch (error) {
        console.error("Migration failed. Exiting.\n"+error)
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

main()