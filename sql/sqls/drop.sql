-- Disable triggers and foreign key checks for a clean drop
-- This is optional but can prevent dependency errors
-- SET session_replication_role = 'replica';

-- Drop all indexes first
DROP INDEX IF EXISTS idx_users_created_at;
DROP INDEX IF EXISTS idx_transactions_created_at;

-- Drop dependent objects first
DROP TRIGGER IF EXISTS update_users_updated_at ON users CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Drop all stored procedures
DROP PROCEDURE IF EXISTS sp_delete_expired_tokens CASCADE;
DROP PROCEDURE IF EXISTS sp_register_user;
DROP PROCEDURE IF EXISTS sp_promote_to_admin;
DROP PROCEDURE IF EXISTS sp_validate_user;
DROP PROCEDURE IF EXISTS sp_reset_password_user;
DROP PROCEDURE IF EXISTS sp_add_role;
DROP PROCEDURE IF EXISTS sp_delete_role;
DROP PROCEDURE IF EXISTS sp_transfer_money_by_customer;
DROP PROCEDURE IF EXISTS sp_top_up_money_by_admin;
DROP PROCEDURE IF EXISTS sp_withdrawal_money_by_user;

-- Drop tables that have foreign key dependencies
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS user_roles CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;

-- Drop independent tables
DROP TABLE IF EXISTS jwt_blacklist CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- Drop the custom type
DROP TYPE IF EXISTS transaction_type CASCADE;