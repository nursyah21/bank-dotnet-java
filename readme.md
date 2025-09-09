# Bank Simulation: A Dotnet/Java + React Portfolio Project

This project showcases a secure, scalable, and fully-featured banking application. It demonstrates extensive skills across the entire software development lifecycle, from full-stack development to DevOps. It was built with a strong emphasis on clean code, stability, and modern enterprise practices.

## Quick Start

## Screenshots

## Motivation

While this is a basic bank simulation, its core functionality (Auth + CRUD) is built to enterprise standards. Instead of focusing on a multitude of haphazard features, this project prioritizes stability and clean code qualities highly valued by companies. The backend and frontend are tightly integrated via OpenAPI contracts.

Here’s a quick overview of the key decisions behind the project:

- **Dotnet:** The backend uses Dotnet, a robust alternative to Java, widely adopted in enterprise settings. 
- **Java:** The backend use Spring Boot, as a standard backend for finance enterprise.  
- **React:** The frontend uses React with NextJS as a framework for frontend.
- **PostgreSQL:** Chosen for its reliability and strong support for write-heavy operations, which are crucial for a banking system.  
- **Modular Architecture:** The folder structure is feature-based, promoting team collaboration and maintainability.  
- **Test-Driven Development (TDD):** This methodology was used throughout development to ensure an error-free and stable application.  
- **Load Testing:** The application was rigorously load-tested with K6 to assess its reliability and performance under high traffic.  

## Tech Stack

- **Backend:**  
  - Dotnet 8 + EF Core
  - Java 17 + Spring Boot 3.4.9
- **Frontend:** React with NextJS 
- **Database:** PostgreSQL  
- **API Contract:** OpenAPI 3.0
- **Containerization:** Docker  
- **Load Testing:** K6  
- **CI/CD:** GitHub Actions  
- **Monitoring:** Prometheus + Grafana  

## Core Features

- **Authentication**  
  - **Login:** Supports roles for both Admin and Customer.  
  - **Registration:** Available for new Customer accounts.  
  - **Password Reset:** Allows both Admin and Customer roles to reset passwords.  

- **Customer Management (Role: Customer)**  
  - **Funds Transfer:** Send money to another customer (minimum transfer: 10).  
  - **Withdrawal:** Withdraw money from an account.  
  - **Transaction History:** View transactions with search, pagination, sorting and filter.  

- **Admin Management (Role: Admin)**  
  - **Customer & Transaction Viewing:** View customer and transactions with search, pagination, sorting and fiter.
  - **Funds Management:** Top up customer balances.

For complete specification read [openapi](./openapi/api.v1.yml)  

## Security

The application was built with a strong focus on security, implementing multiple layers of protection:

- **Dotnet 8 (LTS):** Chosen for its long-term support, which is ideal for enterprise environments.  
- **Rate Limiting:** Protects against brute-force attacks.  
  - **IP-based:** 5 requests per minute.  
  - **ID/Role-based:** 100 requests/minute for regular users, 500 requests/minute for admins.  
  - **IP Whitelist:** Unlimited access for development and testing.  
- **Stored Procedures:** Used to prevent SQL injection and improve database performance.  
- **Bcrypt Password Hashing:** Offers an excellent balance between security and performance.  
- **JWT Bearer (HTTP Only with SameSite=Lax):** Mitigates XSS and CSRF attacks.  
- **UUIDs for IDs:** Prevents enumeration attacks by making IDs non-sequential.  
- **Logging For Mutation Actions:** For compliance audit.  

## Frontend / UI
 
- **Built with shadcn/ui Components**: The interface leverages accessible and customizable components from shadcn/ui.

## Architecture

- **Domain-Driven Design (DDD):** The project follows a modular, domain-driven approach.  
- **Test-Driven Development (TDD):** Development was guided by a TDD workflow to ensure reliability.  
- **Secure Deployment:** The system is architected with a secure deployment model:  
  - Only the frontend is exposed to the public.  
  - The backend and database are accessible exclusively within the internal network.  

## Testing

- **Seeder:** Seeder generates 1,000 customers with 100 transactions each, producing a backup file of ~15 MB. 

## Limitation For Speed Development

- To avoid over-engineering in this portfolio project, the database model is built strictly to the OpenAPI specification. As a result, certain enterprise features like soft deletes (`is_deleted`) are not universally present on all tables.  
- Data for frequent queries (e.g., user sessions) is not stored in an in-memory database like Redis. To prioritize simplicity and reduce infrastructure overhead, all data is stored and retrieved directly from PostgreSQL.  
- No refresh tokens are used; instead, a blacklist token is used to keep JWTs secure, and the JWT time limit is only 1 hour.  
- No PIN is required when performing mutation actions.  
- Search does not use full-field search because we didn’t employ a dedicated search engine; we use exact match on indexed columns.  
- For audit, records are only shown in the database and not surfaced in the frontend.  
- Migration tooling is fully custom. Tools like Flyway were considered, but due to limited time to explore and adapt their automation model, custom SQL scripts were used instead. This approach offers direct control and flexibility and can be extended as needed.  