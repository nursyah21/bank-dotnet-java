# Bank Simulation: A Dotnet + React Portfolio Project

This project showcases a secure, scalable, and fully-featured banking application. It demonstrates extensive skills across the entire software development lifecycle, from **full-stack development** to **DevOps**. It was built with a strong emphasis on clean code, stability, and modern enterprise practices.

## [Motivation](#motivation)

While this is a basic bank simulation, its core functionality (Auth + CRUD) is built to enterprise standards. Instead of focusing on a multitude of haphazard features, this project prioritizes stability and clean code qualities highly valued by companies.

Here's a quick overview of the key decisions behind the project:

- **Dotnet:** The backend uses Dotnet, a robust alternative to Java, widely adopted in enterprise settings.
- **React:** The Frontend uses React, because is more popular and good for create ui.
- **PostgreSQL:** Chosen for its reliability and strong support for write-heavy operations, which are crucial for a banking system.
- **Modular Architecture:** The folder structure is feature-based, promoting team collaboration and maintainability.
- **Test-Driven Development (TDD):** This methodology was used throughout development to ensure an error-free and stable application.
- **Load Testing:** The application was rigorously load-tested with **K6** to assess its reliability and performance under high traffic.


## [Tech Stack](#tech-stack)

- **Backend:** Dotnet 8
- **Frontend:** React
- **Database:** PostgreSQL
- **Containerization:** Docker
- **Testing:** K6 (Load Testing), Playwright (E2E Testing)
- **CI/CD:** Github Action
- **Monitoring:** Prometheus + Grafana

## [Core Features](#core-features)

- **Authentication**
    - **Login:** Supports roles for both Admin and Customer.
    - **Registration:** Available for new Customer accounts.
    - **Password Reset:** Allows both Admin and Customer roles to reset passwords.

- **Customer Management (Role: Customer)**
    - **Funds Transfer:** Send money to another customer (minimum transfer: 10).
    - **Withdrawal:** Withdraw money from an account (minimum withdrawal: 10).
    - **Transaction History:** View all transactions with full-field search, pagination (25 items per page), sorting by created at, and filtering by type.

- **Admin Management (Role: Admin)**
    - **Customer & Transaction Viewing:** See all customer profiles and transactions with full-field search, pagination (500 items per page), and sorting.
    - **Funds Management:** Top up customer balances (minimum: 10).


## [Security](#security)

The application was built with a strong focus on security, implementing multiple layers of protection:

- **Dotnet 8 (LTS):** Chosen for its long-term support, which is ideal for enterprise environments.
- **Rate Limiting:** Protects against **brute-force attacks**.
    - **IP-based:** 5 requests per minute.
    - **ID/Role-based:** 100 requests/minute for regular users, 500 requests/minute for admins.
    - **IP Whitelist:** Unlimited access for development and testing.
- **Stored Procedures:** Used to prevent **SQL injection** and improve database performance.
- **Bcrypt Password Hashing:** Offers an excellent balance between security and performance.
- **JWT Bearer (HTTP Only with SameSite=Lax):** Mitigates **XSS** and **CSRF** attacks.
- **UUIDs for IDs:** Prevents **enumeration attacks** by making IDs non-sequential.


## [Frontend / UI](#frontend--ui)

- **Use Client Side Rendering:** Because this app didnt need **SEO**, use client side is preferred for better performance
- **Clean & Familiar Design:** The UI is designed to be clean and familiar, inspired by Microsoft products like Word and Excel.
- **Navigation:** Uses a top navigation bar instead of a sidebar for a cleaner layout.

## [Architecture](#architecture)

- **Domain-Driven Design (DDD):** The project follows a modular, domain-driven approach.
- **Test-Driven Development (TDD):** Development was guided by a TDD workflow to ensure reliability.
- **Secure Deployment:** The system is architected with a secure deployment model:
    - Only the frontend is exposed to the public.
    - The backend and database are accessible exclusively within the internal network.

## [Limitation For Speed Development](#limitation-for-speed-development)

- No refresh tokens are used, instead, there's a blacklist token used to keep JWTs secure, and the JWT time limit is only 1 hour.
- No PIN is required when performing mutation actions.