# Advanced Frontend for E-commerce Project

      https://github.com/furkantosun1607/E-commerce-Project

This repository contains the **frontend** implementation of the E-commerce Project for the Advanced Application Development course. The project is built using **Angular** and follows a modular architecture for scalability and maintainability.

## Table of Contents

- [Advanced Frontend for E-commerce Project](#advanced-frontend-for-e-commerce-project)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Folder Structure](#folder-structure)
  - [Modules Overview](#modules-overview)
    - [Admin Module](#admin-module)
    - [Store Module](#store-module)
    - [Core Module](#core-module)
  - [Authentication](#authentication)
    - [Example Usage of Auth Guard](#example-usage-of-auth-guard)
- [Advanced Backend for E-commerce Project](#advanced-backend-for-e-commerce-project)
  - [Features](#features-1)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites-1)
  - [Installation](#installation-1)
  - [API Endpoints](#api-endpoints)
    - [Personal](#personal)
    - [Products](#products)
    - [Orders](#orders)
    - [Payments](#payments)
  - [Dependencies](#dependencies)
  - [USE CASE DIAGRAMS](#use-case-diagrams)

## Project Overview

The **frontend** is responsible for the client-side of the application, offering a seamless user experience for both customers and administrators. The application includes features like user authentication, product management, cart management, and order tracking.



## Features

🔐 User Authentication
Supports login and registration for different user types:

Regular users, Store accounts ,Admin accounts

Components: login/, register/, store-login/, store-register/, adminlogin/

🛒 Product Management
Store owners can add, delete, and manage products.
Product details are viewable by users.
Components: product/, productDetail/, store/add-product/, store/delete-products/, store/store-products/

🛍️ Shopping Cart & Checkout
Users can add products to their cart, compare them, and proceed to checkout.
Components: cart/, checkout/, compare/, comparison/

📦 Order Management
Store owners can view and update order statuses.
Users can view their own order history.
Components: store/manage-orders/, userorders/

🧑‍💼 Admin Dashboard
Admins can manage users and stores, including delete operations.
Components: admin/admin-dashboard/, admin/admin-users/, admin/admindeleteuser/, admin/adminstores/, admin/admindeletestore/

📝 User Feedback
Users can leave comments and reviews.
Component: usercomments/

💳 Payment Integration
Stripe integration for secure online payments.
Component: stripe/

🧱 Modular Architecture
The application is structured using well-defined modules with separate routing for:

Admin,Store,Core 

🚀 Lazy Loading
The application utilizes Angular’s lazy loading strategy to optimize performance by loading feature modules only when they are needed (e.g., Admin and Store modules).
This reduces initial load time and improves user experience, especially for larger applications.
Implemented In: app-routing.module.ts

🛡️ Guards & Interceptors
Includes route guards and HTTP interceptors for security and token handling.
Modules: guards/, interceptors/

🧩 Reusable UI Components
Shared layout components such as header and footer are modularized.
Components: header/, footer/

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
- **Description**: Contains shared and general application components such as layout elements, authentication (user), and cross-cutting concerns like route guards and HTTP interceptors. These are reused across admin, store, and user interfaces.
- **Components**:
  - `HeaderComponent`
  - `FooterComponent`
  - `LoginComponent`
  - `RegisterComponent`
  - `Guards`
  - `Interceptors`
  - `StripeComponent`
  - `UserCommentsComponent`
  - `UserOrdersComponent`
  - 


## Authentication

- **Auth Guard**: Ensures that only authenticated users can access protected routes.
- **Interceptor**: Adds JWT tokens to HTTP requests for secure communication with the backend.

### Example Usage of Auth Guard

The `AuthGuard` is used in the `RouterModule` to protect specific routes:

```ts
{ path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] }
```





# Advanced Backend for E-commerce Project

This backend application is a part of the "Full Stack E-commerce Project" built for the Advanced Application Development Course. It provides robust APIs and services to manage users, products, orders, and authentication. The application is developed using **Spring Boot** and integrates various modern technologies for security, data management, and payment processing.

---

## Features

- **User Management**: User registration, login, and profile management.
- **Product Management**: CRUD operations for products and product comments.
- **Order Management**: Create, retrieve and update orders for users and store owners.
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
  - `security`: Includes security-related components such as filters, jwt token providers, and authentication handlers.
  - `dto`: Used for transferring data between layers, especially between the controller and service layers, without exposing internal entity structures.

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

## USE CASE DIAGRAMS

This section presents the key use case diagrams of the FurkanShopCenter e-commerce application. These diagrams illustrate the interactions between users and system components during various processes such as browsing products, user authentication, cart management, checkout, and payment. Each use case diagram is designed to visualize the system flow and responsibilities of different modules from both frontend and backend perspectives.
![Use Case Diagram](ad1.png)
![Use Case Diagram](ad2.png)
![Use Case Diagram](ad3.png)
![Use Case Diagram](ad4.png)
![Use Case Diagram](ad5.png)
![Use Case Diagram](ad6.png)
![Use Case Diagram](ad7.png)

---


This frontend structure is developed using Angular with a modular architecture that ensures scalability, maintainability, lazy loading and clear separation of concerns. At the core lies the AppModule, which contains essential components used by general users, such as product browsing, cart management, checkout, user authentication, and order tracking. To support role-based functionality, the application includes two feature modules: AdminModule and StoreModule. The AdminModule enables administrators to manage users and stores, while the StoreModule allows store owners to handle products, process orders, and manage their store profiles. Common application logic is abstracted into shared services such as AuthService, CartService, and ProductService, which handle authentication, shopping cart operations, and product-related data respectively. Additionally, an authGuard is implemented to protect restricted routes, ensuring only authorized users can access certain views. An authInterceptor is also configured to automatically attach authentication tokens to HTTP requests, enhancing security and streamlining backend communication. This structured and layered architecture contributes to a robust and maintainable frontend application.
![Architecture Diagram](angular.png)


---


The backend architecture of the e-commerce project is developed using Spring Boot and follows a layered structure to promote clean code practices, scalability, and maintainability. The system is divided into multiple layers: Models, Controllers, Services, Repositories, Security, Configuration, and DTOs (Data Transfer Objects). The Models Layer represents the domain entities such as User, Admin, Order, Product, Store, OrderItem, and ProductComment, which map directly to database tables. These entities are accessed through the Repositories Layer, which handles CRUD operations and communication with the MySQL database. The Services Layer encapsulates the business logic and acts as an intermediary between the controllers and the repositories. Each entity type has its corresponding service and repository to ensure separation of concerns. The Controllers Layer handles incoming HTTP requests from the frontend, maps them to service methods, and returns appropriate responses. For instance, ProductController, OrderController, and AuthController serve as entry points for product operations, order management, and authentication, respectively.

Security is managed through the Security Layer, which uses JwtAuthenticationFilter for validating JWT tokens and enforces access control. Configuration settings for CORS and security are handled in the Config Layer using SecurityConfig and CorsConfig classes. The system also includes integration with external services such as Stripe for payment processing, visible through StripeController and StripeService. Data transfer between the frontend and backend is facilitated by DTOs, which include request and response classes such as LoginRequest, RegisterRequest, OrderResponse, and PaymentRequest, ensuring secure and structured data exchange.

This architecture, leveraging tools like Spring Security, JWT, Lombok, and Maven, provides a robust and flexible backend foundation that supports the core functionality of the e-commerce platform, while ensuring secure user interaction and efficient data management.
![Architecture Diagram](backendorjinal.png)




---
The Entity-Relationship (ER) diagram above illustrates the relational database structure used in the backend of the e-commerce system. The design follows a normalized schema that supports user management, product cataloging, order processing, and customer feedback functionalities. At the core of the database is the USER table, which stores essential user details such as name, email, and role. Users can place multiple ORDERS, each of which is linked to the USER entity via a foreign key (user_id). Orders contain metadata including payment type, payment time, order status, and total amount. Each order can include multiple ORDER_ITEM records, enabling a one-to-many relationship between ORDER and PRODUCT. The ORDER_ITEM table holds references to both order_id and product_id along with a quantity, establishing the items and quantities included in each order.

Products are managed within the PRODUCT table, which includes fields like name, price, rating, image, and category. Each product is associated with a STORE, referenced by the store_name foreign key, allowing the system to manage multi-vendor product listings. Customers can leave reviews through the PRODUCT_COMMENT table, which links users and products via foreign keys. Each comment includes a textual review, rating, and timestamp. This structure supports rich feedback mechanisms and helps calculate product review scores. Additionally, the ADMIN table is used to manage backend administrative access with roles and authentication credentials, while the STORE table holds vendor credentials and contact information.

This ER model provides a robust and scalable relational structure that supports the key features of an e-commerce platform, including order management, user authentication, product handling, and review systems.
![Architecture Diagram](erdiagram.png)

---
