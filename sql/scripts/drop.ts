import { auditSql, primarySql, readFile } from './lib.ts'

async function dropPrimarySchema() {
    try {
        const primaryDropDDL = readFile('drop.sql')

        await primarySql.unsafe(primaryDropDDL)
    } catch (error) {
        console.error("Primary Database drop error:\n" + error)
        throw error
    } finally {
        await primarySql.end()
    }
}

async function dropAuditSchema() {
    try {
        const auditDropDDL = readFile('drop_audit.sql')

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
        await dropPrimarySchema()
        await dropAuditSchema()

        console.log("All drop operations completed successfully.")
    } catch (error) {
        console.error("Drop failed. Exiting.\n" + error)
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

main()