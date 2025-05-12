# Advanced Backend for E-commerce Project

This backend application is a part of the "Full Stack E-commerce Project" built for the Advanced Application Development Course. It provides robust APIs and services to manage users, products, orders, and authentication. The application is developed using **Spring Boot** and integrates various modern technologies for security, data management, and payment processing.

---

## Features

- **User Management**: User registration, login, and profile management.
- **Product Management**: CRUD operations for products and product comments.
- **Order Management**: Create and retrieve orders for users and store owners.
- **Authentication & Authorization**: Role-based access control for users, store owners, and admins.
- **Payment Integration**: Stripe payment gateway for seamless transactions.
- **API Security**: Secured endpoints using JSON Web Tokens (JWT).
  
---

## Project Structure

The backend is organized as follows:

- **`src/main/java/com/example/advanced_backend`**
  - `controller`: Contains RESTful APIs for users, products, orders, and authentication.
  - `service`: Business logic for the application.
  - `repository`: Interfaces for database access using Spring Data JPA.
  - `model`: Entity classes representing database tables.
  - `config`: Configuration files for security, CORS, and other settings.

---

## Prerequisites

- **Java**: Version 21 or higher.
- **Spring Boot**: 3.4.4.
- **MySQL**: Database for storing application data.
- **Maven**: For building and managing dependencies.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/furkantosun1607/E-commerce-Project.git
   cd E-commerce-Project/advanced_backend
   ```

2. Configure the database:
   - Update the `application.properties` file in `src/main/resources` with your MySQL database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/user_db?useSSL=false&serverTimezone=UTC
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

3. Install dependencies and build the project:
   ```bash
   mvn clean install
   ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

---

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login for users.
- `POST /api/auth/admin/login`: Admin login.

### Products
- `GET /api/products`: Retrieve all products.
- `POST /api/products`: Create a new product.
- `GET /api/products/{id}`: Retrieve product by ID.

### Orders
- `POST /orders`: Create an order.
- `GET /orders`: Retrieve user orders.

### Payments
- `POST /api/payment-intent`: Create a payment intent using Stripe.

---

## Dependencies

The backend relies on the following dependencies:
- **Spring Boot Starter Web**: For building REST APIs.
- **Spring Boot Starter Security**: For authentication and authorization.
- **Spring Boot Starter Data JPA**: For interacting with the database.
- **MySQL Connector**: For connecting to the MySQL database.
- **Stripe Java SDK**: For payment processing.
- **JWT**: For token-based authentication.

---

## Testing

Run the tests using:
```bash
mvn test
```
Ensure your database is configured properly before running the tests.

---

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---
