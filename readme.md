# Bank Simulation Dotnet + React

This is part of my portfolio project for landing job,
a Bank Simulation Build With Dotnet And React.

## Motivation

This project was created to showcase my skills in backend with DotNet, frontend with React, QA engineering with K6, and DevOps using Docker, Prometheus, and Grafana.

Although this project is basic, Auth+CRUD implements enterprise standards, prioritizing them over a multitude of features that are simply done haphazardly.

This application's development emphasizes stability and clean code, which are highly sought after in enterprises.

1. The backend uses DotNet, a Java alternative commonly used in enterprises.
2. PostgreSQL was chosen because the bank system requires more write than read.
3. The folder structure is designed by feature, making it easier for a team to work with due to its modular nature.
4. The development uses test-driven development to ensure the app is error-free.
5. Load testing to assess the app's reliability under high traffic and resource consumption.

## Tech Stack

- Dotnet 8
- React
- PostgreSQL
- Docker
- K6
- Prometheus + Grafana

## Requirement

This is main feature of this app

- Auth Management
    - Login
    - Register
    - Reset Password

- User Management
    - Send money to another User
    - Withdraw money
    - See all transaction

- Admin Management
    - See all users profile
    - See all users transaction
    - Top up saldo users
    - Send money from another user to another user

## Non Functional Feature

Some Function have this additional feature to enhance security or for better user experience

- Ip Rate Limiter
- Search
- Filter
- Pagination