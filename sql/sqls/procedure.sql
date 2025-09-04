-- sp register user
CREATE OR REPLACE PROCEDURE sp_register_user(
    p_username VARCHAR,
    p_email VARCHAR,
    p_password_hash VARCHAR,
    p_birth_date DATE
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id UUID;
    v_role_id INT;
BEGIN
    INSERT INTO users (username, email, password_hash, birth_date, is_validated, balance)
    VALUES (p_username, p_email, p_password_hash, p_birth_date, FALSE, 0.00)
    RETURNING id INTO v_user_id;

    SELECT id INTO v_role_id FROM roles WHERE name = 'customer';
    
    IF v_role_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role_id)
        VALUES (v_user_id, v_role_id);
    ELSE
        RAISE EXCEPTION 'Customer role does not exist.';
    END IF;
END;
$$;

-- sp promote to admin
CREATE OR REPLACE PROCEDURE sp_promote_to_admin(
    p_user_id UUID
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_admin_role_id INT;
BEGIN
    SELECT id INTO v_admin_role_id FROM roles WHERE name = 'admin';
    
    IF v_admin_role_id IS NOT NULL THEN
        UPDATE user_roles
        SET role_id = v_admin_role_id
        WHERE user_id = p_user_id;
    ELSE
        RAISE EXCEPTION 'Admin role does not exist.';
    END IF;
END;
$$;

-- sp create reset password token
CREATE OR REPLACE PROCEDURE sp_create_reset_password_token(
    p_user_id UUID,
    p_token VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM password_reset_tokens WHERE user_id = p_user_id;

    INSERT INTO password_reset_tokens (user_id, token, expires_at)
    VALUES (p_user_id, p_token, NOW() + INTERVAL '1 hour');

    IF NOT FOUND THEN
        RAISE EXCEPTION 'User with ID % not found', p_user_id;
    END IF;
END;
$$;


-- sp reset password user
CREATE OR REPLACE PROCEDURE sp_reset_password_user(
    p_token VARCHAR,
    p_new_password_hash VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    SELECT user_id INTO v_user_id
    FROM password_reset_tokens
    WHERE token = p_token AND expires_at > NOW();

    IF v_user_id IS NOT NULL THEN
        UPDATE users
        SET password_hash = p_new_password_hash
        WHERE id = v_user_id;

        DELETE FROM password_reset_tokens
        WHERE token = p_token;
    ELSE
        RAISE EXCEPTION 'Invalid or expired password reset token';
    END IF;
END;
$$;

-- sp_delete_expired_password_reset_tokens
CREATE OR REPLACE PROCEDURE sp_delete_expired_password_reset_tokens()
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM password_reset_tokens
    WHERE expires_at < NOW();
END;
$$;

-- sp_add_role
CREATE OR REPLACE PROCEDURE sp_add_role(
    p_role_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO roles (name)
    VALUES (p_role_name)
    ON CONFLICT (name) DO NOTHING;
END;
$$;

-- sp_delete_role
CREATE OR REPLACE PROCEDURE sp_delete_role(
    p_role_name VARCHAR(50)
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM roles
    WHERE name = p_role_name;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Role with name % not found', p_role_name;
    END IF;
END;
$$;

-- sp_transfer_money_by_customer
CREATE OR REPLACE PROCEDURE sp_transfer_money_by_customer(
    p_sender_id UUID,
    p_receiver_id UUID,
    p_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_sender_balance NUMERIC;
BEGIN
    SELECT balance INTO v_sender_balance FROM users WHERE id = p_sender_id FOR UPDATE;

    IF v_sender_balance < p_amount THEN
        RAISE EXCEPTION 'Insufficient balance for transfer. Current balance: %', v_sender_balance;
    END IF;
    
    UPDATE users
    SET balance = balance - p_amount
    WHERE id = p_sender_id;

    UPDATE users
    SET balance = balance + p_amount
    WHERE id = p_receiver_id;

    INSERT INTO transactions (sender_id, receiver_id, amount, type)
    VALUES (p_sender_id, p_receiver_id, p_amount, 'send');
END;
$$;

-- sp_top_up_money_by_admin
CREATE OR REPLACE PROCEDURE sp_top_up_money_by_admin(
    p_admin_id UUID,
    p_user_id UUID,
    p_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM users WHERE id = p_admin_id) THEN
        RAISE EXCEPTION 'Admin user with ID % does not exist', p_admin_id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM users WHERE id = p_user_id) THEN
        RAISE EXCEPTION 'User with ID % does not exist', p_user_id;
    END IF;
    
    UPDATE users
    SET balance = balance + p_amount
    WHERE id = p_user_id;

    INSERT INTO transactions (sender_id, receiver_id, amount, type)
    VALUES (p_admin_id, p_user_id, p_amount, 'top-up');
END;
$$;

-- sp_validate_user
CREATE OR REPLACE PROCEDURE sp_validate_user(
    p_user_id UUID
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users
    SET is_validated = TRUE
    WHERE id = p_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'User with ID % not found', p_user_id;
    END IF;
END;
$$;

-- sp_withdrawal_money_by_user
CREATE OR REPLACE PROCEDURE sp_withdrawal_money_by_user(
    p_user_id UUID,
    p_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_balance NUMERIC;
BEGIN
    SELECT balance INTO v_user_balance FROM users WHERE id = p_user_id FOR UPDATE;

    IF v_user_balance < p_amount THEN
        RAISE EXCEPTION 'Insufficient balance for withdrawal. Current balance: %', v_user_balance;
    END IF;

    UPDATE users
    SET balance = balance - p_amount
    WHERE id = p_user_id;

    INSERT INTO transactions (sender_id, receiver_id, amount, type)
    VALUES (p_user_id, NULL, p_amount, 'withdrawal');
END;
$$;

