import { auditSql, primarySql, readFile } from './lib.ts'

async function runPrimaryMigrationSchema() {
    try {
        const schemaDDL = readFile('schema.sql')
        await primarySql.unsafe(schemaDDL)

    } catch (error) {
        console.error("Primary Schema migration error:\n")
        throw error
    }
}

async function runPrimaryMigrationProcedure() {
    try {
        const procedureDDL = readFile('procedure.sql')
        await primarySql.unsafe(procedureDDL)

    } catch (error) {
        console.error("Primary Procedure migration error:\n")
        throw error
    }
}

async function runAuditMigrationSchema() {
    try {
        const schemaDDL = readFile('schema_audit.sql')
        await auditSql.unsafe(schemaDDL)

    } catch (error) {
        console.error("Audit Schema migration error:\n")
        throw error
    }
}

async function runAuditMigrationProcedure() {
    try {
        const procedureDDL = readFile('procedure_audit.sql')
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
        console.error("Migration failed. Exiting.\n" + error)
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

main()