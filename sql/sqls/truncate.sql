TRUNCATE TABLE 
    transactions,
    user_roles,
    users,
    roles,
    jwt_blacklist,
    password_reset_tokens
RESTART IDENTITY CASCADE;