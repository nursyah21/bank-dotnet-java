-- Seed roles table
INSERT IGNORE INTO roles (name) VALUES
('admin'),
('user'),
('customer');

-- Seed initial admin user
-- NOTE: In a real application, the password hash should be generated securely.
SET @admin_user_id = UUID();
SET @admin_role_id = (SELECT id FROM roles WHERE name = 'admin');

INSERT INTO users (id, no_id, username, email, password_hash, birth_date)
VALUES (@admin_user_id, '0000000001', 'admin_user', 'admin@example.com', 'hashed_password_here', '1990-01-01');

-- Assign the 'admin' role to the user
INSERT INTO user_roles (user_id, role_id)
VALUES (@admin_user_id, @admin_role_id);