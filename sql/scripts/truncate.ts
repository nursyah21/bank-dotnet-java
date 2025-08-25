import { auditSql, primarySql, readFile } from './lib.ts'

async function truncatePrimarySchema() {
    try {
        const primaryTruncateDDL = readFile('truncate.sql')

        await primarySql.unsafe(primaryTruncateDDL)
    } catch (error) {
        console.error("Primary Database truncate error:\n" + error)
        throw error
    } finally {
        await primarySql.end()
    }
}

async function truncateAuditSchema() {
    try {
        const auditTruncateDDL = readFile('truncate_audit.sql')
    
        await auditSql.unsafe(auditTruncateDDL)
    } catch (error) {
        console.error("Audit Database truncate error:\n" + error)
        throw error
    } finally {
        await auditSql.end()
    }
}

async function main() {
    try {
        await truncatePrimarySchema()
        await truncateAuditSchema()

        console.log("All truncate operations completed successfully.")
    } catch (error) {
       console.error("Truncate failed. Exiting.\n" + error)
    } finally {
        await primarySql.end()
        await auditSql.end()
    }
}

main()