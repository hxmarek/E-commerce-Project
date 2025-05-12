# Advanced Frontend for E-commerce Project

This repository contains the **frontend** implementation of the E-commerce Project for the Advanced Application Development course. The project is built using **Angular** and follows a modular architecture for scalability and maintainability.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Modules Overview](#modules-overview)
- [Authentication](#authentication)
- [Contributions](#contributions)
- [License](#license)

## Project Overview

The **frontend** is responsible for the client-side of the application, offering a seamless user experience for both customers and administrators. The application includes features like user authentication, product management, cart management, and order tracking.

## Features

🔐 User Authentication
Supports login and registration for different user types:

Regular users

Store accounts

Admin accounts

Modules: login/, register/, store-login/, store-register/, adminlogin/

🛒 Product Management
Store owners can add, delete, and manage products.
Product details are viewable by users.
Modules: product/, productDetail/, store/add-product/, store/delete-products/, store/store-products/

🛍️ Shopping Cart & Checkout
Users can add products to their cart, compare them, and proceed to checkout.
Modules: cart/, checkout/, compare/, comparison/

📦 Order Management
Store owners can view and update order statuses.
Users can view their own order history.
Modules: store/manage-orders/, userorders/

🧑‍💼 Admin Dashboard
Admins can manage users and stores, including delete operations.
Modules: admin/admin-dashboard/, admin/admin-users/, admin/admindeleteuser/, admin/adminstores/, admin/admindeletestore/

📝 User Feedback
Users can leave comments and reviews.
Module: usercomments/

💳 Payment Integration
Stripe integration for secure online payments.
Module: stripe/

🧱 Modular Architecture
The application is structured using well-defined modules with separate routing for:

Admin

Store

Core user functionalities
Modules: admin.module.ts, admin-routing.module.ts, store.module.ts, store-routing.module.ts, app.module.ts, app-routing.module.ts

🛡️ Guards & Interceptors
Includes route guards and HTTP interceptors for security and token handling.
Modules: guards/, interceptors/

🧩 Reusable UI Components
Shared layout components such as header and footer are modularized.
Modules: header/, footer/

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- A running backend service (check the [backend documentation](../backend/README.md) for setup instructions)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/furkantosun1607/E-commerce-Project.git
   cd E-commerce-Project/advanced_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   ng serve
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:4200
   ```

## Folder Structure

The frontend is organized into the following folders:

```
advanced_frontend/
├── src/
│   ├── app/
│   │   ├── admin/           // Admin module
│   │   ├── store/           // Store module
│   │   ├── cart/            // Shopping cart
│   │   ├── guards/          // Route guards
│   │   ├── login/           // Login functionality
│   │   ├── header/          // Header component
│   │   ├── footer/          // Footer component
│   │   ├── product/         // Product listing and details
│   │   └── ...
│   ├── assets/              // Static assets
│   ├── environments/        // Environment configuration
│   └── ...
├── angular.json             // Angular configuration
├── package.json             // NPM dependencies
└── README.md                // Documentation
```

## Modules Overview

### Admin Module

- **Path**: `src/app/admin`
- **Description**: Provides features for admin users, including user and store management.
- **Components**:
  - `AdminDashboardComponent`
  - `AdminUsersComponent`
  - `AdminStoresComponent`

### Store Module

- **Path**: `src/app/store`
- **Description**: Handles store-specific functionalities like product management and orders.
- **Components**:
  - `StoreProductsComponent`
  - `AddProductComponent`
  - `DeleteProductsComponent`
  - `StoreLoginComponent`
  - `StoreRegisterComponent`

### Core Module

- **Path**: `src/app/`
- **Description**: Contains shared components like the header, footer, and route guards.

## Authentication

- **Auth Guard**: Ensures that only authenticated users can access protected routes.
- **Interceptor**: Adds JWT tokens to HTTP requests for secure communication with the backend.

### Example Usage of Auth Guard

The `AuthGuard` is used in the `RouterModule` to protect specific routes:

```ts
{ path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] }
```





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
     Then add the stripe API key
      ```properties
     stripe.secret.key=sk_test_51RGz8QGhr6ab3e..............................
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

### Personal 
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/store/register`: Register a new store.
- `POST /api/auth/login`: Login for users.
- `POST /api/auth/admin/login`: Admin login.
- `POST api/auth/store/login`: Store login.
- `GET /api/auth/admin/users`: Retrieve all users.
- `GET /api/auth/admin/users`: Retrieve all stores.
- `DELETE /api/auth/admin/users/{id}`: Delete user by ID.
- `DELETE /api/auth/admin/stores/MyStore`: Delete store by ID.

### Products
- `GET /api/products`: Retrieve all products.
- `POST /api/products`: Create a new product.
- `GET /api/products/{id}`: Retrieve product by ID.
- `GET /api/products/my-products`: Retrieve products of logged store.
- `DELETE /api/products/{id}`: Delete product by ID.
- `POST /api/comments/product/{id}`: User makes a comment.
- `GET /api/comments/product/{id}`: Retrieve comments of a product by ID.

### Orders
- `POST /orders`: Create an order.
- `GET /orders`: Retrieve user orders.
- `GET /api/store/orders`: Retrieve stores orders.
- `PUT /api/store/orders/{id}/status?status=Confirmed`: Changes order status.

### Payments
- `POST /api/payment-intent`: Create a payment intent using Stripe.
- `GET /api/payments/stripe-check` Check payment

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
