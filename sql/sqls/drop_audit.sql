-- Drop tables from the audit database
DROP TABLE IF EXISTS audit_log CASCADE;

-- Drop all audit stored procedures
DROP PROCEDURE IF EXISTS sp_log_mutation;