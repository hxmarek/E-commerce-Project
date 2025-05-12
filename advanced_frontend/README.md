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

- **User Authentication**: Login and registration for users, stores, and admins.
- **Product Management**: Add, delete, and view products at the store level.
- **Shopping Cart**: Add products to the cart, compare items, and proceed to checkout.
- **Order Management**: Manage and track orders.
- **Admin Dashboard**: Manage users and stores.
- **Modular Architecture**: Divided into well-defined modules for admin, store, and core functionalities.

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

## Contributions

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request for review.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

```
