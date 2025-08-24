-- sp_log_mutation
CREATE OR REPLACE PROCEDURE sp_log_mutation(
    p_user_id UUID,
    p_action VARCHAR,
    p_details JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO audit_log (user_id, action, details)
    VALUES (p_user_id, p_action, p_details);
END;
$$;