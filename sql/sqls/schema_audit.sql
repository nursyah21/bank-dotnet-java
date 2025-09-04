-- DDL for the audit_log table
-- This table is designed to track and store all mutation actions for compliance and security auditing.
CREATE TABLE IF NOT EXISTS audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID,
    action VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing on user_id and created_at for efficient querying of audit logs.
-- This helps in quickly retrieving all actions performed by a specific user or actions within a certain timeframe.
CREATE INDEX idx_audit_log_user_id ON audit_log (user_id);
CREATE INDEX idx_audit_log_created_at ON audit_log (created_at);