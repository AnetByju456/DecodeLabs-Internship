# TradeMart Backend API - Project 3

## Overview

TradeMart Backend API is a Node.js and Express.js application that powers the backend of the TradeMart marketplace platform.

The project integrates a MySQL database to provide permanent data storage and supports marketplace operations such as user management, product listings, shopping carts, orders, activity tracking, and dashboard analytics through RESTful APIs.

Developed as part of the DecodeLabs Full Stack Development Internship - Project 3 (Database Integration).

---

## Project Objective

The goal of this project is to:

* Connect a backend application to a MySQL database
* Design and implement a relational database schema
* Perform CRUD operations using SQL
* Store and retrieve data permanently
* Establish relationships between entities using foreign keys
* Build backend APIs that support future frontend integration

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Packages Used

* express
* mysql2
* dotenv

### API Testing

* Postman

---

## Project Structure

Project-3/
│
├── config/
│   └── db.js
│
├── routes/
│   ├── products.js
│   ├── users.js
│   ├── orders.js
│   ├── cart.js
│   ├── activity.js
│   └── dashboard.js
│
├── database/
│   └── schema.sql
│
├── .env
├── package.json
├── package-lock.json
├── server.js
└── README.md

---

## Database Schema

### Users

Stores user account information.

| Column     | Type                              |
| ---------- | --------------------------------- |
| id         | INT (Primary Key, Auto Increment) |
| name       | VARCHAR(100)                      |
| email      | VARCHAR(100) UNIQUE               |
| phone      | VARCHAR(20)                       |
| password   | VARCHAR(255)                      |
| role       | ENUM('buyer','seller')            |
| created_at | TIMESTAMP                         |

### Products

Stores marketplace listings.

| Column     | Type                              |
| ---------- | --------------------------------- |
| id         | INT (Primary Key, Auto Increment) |
| name       | VARCHAR(100)                      |
| category   | VARCHAR(50)                       |
| price      | DECIMAL(10,2)                     |
| type       | VARCHAR(20)                       |
| user_id    | INT (Foreign Key)                 |
| created_at | TIMESTAMP                         |

### Orders

Stores order information.

| Column       | Type                                    |
| ------------ | --------------------------------------- |
| id           | INT (Primary Key, Auto Increment)       |
| user_id      | INT (Foreign Key)                       |
| total_amount | DECIMAL(10,2)                           |
| status       | ENUM('pending','completed','cancelled') |
| created_at   | TIMESTAMP                               |

### Order Items

Stores products associated with orders.

| Column     | Type                              |
| ---------- | --------------------------------- |
| id         | INT (Primary Key, Auto Increment) |
| order_id   | INT (Foreign Key)                 |
| product_id | INT (Foreign Key)                 |
| quantity   | INT                               |
| price      | DECIMAL(10,2)                     |

### Carts

Stores user carts.

| Column     | Type                              |
| ---------- | --------------------------------- |
| id         | INT (Primary Key, Auto Increment) |
| user_id    | INT (Foreign Key)                 |
| created_at | TIMESTAMP                         |

### Cart Items

Stores products added to carts.

| Column     | Type                              |
| ---------- | --------------------------------- |
| id         | INT (Primary Key, Auto Increment) |
| cart_id    | INT (Foreign Key)                 |
| product_id | INT (Foreign Key)                 |
| quantity   | INT                               |
| created_at | TIMESTAMP                         |

### Activity Logs

Stores user activities.

| Column     | Type                              |
| ---------- | --------------------------------- |
| id         | INT (Primary Key, Auto Increment) |
| user_id    | INT (Foreign Key)                 |
| action     | VARCHAR(255)                      |
| created_at | TIMESTAMP                         |

---

## Entity Relationships

* One User can create many Products
* One User can place many Orders
* One Order can contain many Order Items
* One Product can appear in many Order Items
* One User has one Cart
* One Cart can contain many Cart Items
* One Product can appear in many Cart Items
* One User can have many Activity Logs

---

## Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=trademart
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd Project-3
```

### Install Dependencies

```bash
npm install
```

### Create Database

Execute the contents of `schema.sql` using MySQL Workbench.

### Start Server

```bash
node server.js
```

Server runs on:

```text
http://localhost:3000
```

---

## API Endpoints

### Products

```http
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
GET    /products?category=Electronics
GET    /products?type=Sell
```

### Users

```http
GET    /users
GET    /users/:id
POST   /users/register
POST   /users/login
PUT    /users/:id
DELETE /users/:id
```

### Orders

```http
GET    /orders
GET    /orders/:id
POST   /orders
```

### Cart

```http
GET    /cart/:userId
POST   /cart
DELETE /cart/:cartItemId
```

### Activity Logs

```http
GET    /activity/:userId
POST   /activity
```

### Dashboard

```http
GET /dashboard/:userId
```

Returns:

* User information
* User products
* User activity logs
* User orders

---

## Features

* MySQL database integration
* Relational database design
* Persistent data storage
* RESTful API architecture
* CRUD operations
* User management
* Product management
* Shopping cart management
* Order management
* Dashboard data aggregation
* Activity tracking
* Product filtering
* Foreign key relationships
* Input validation
* Error handling
* Environment variable configuration

---

## Learning Outcomes

Through this project, the following concepts were practiced:

* Database schema design
* Relational database modeling
* MySQL integration with Node.js
* SQL queries
* CRUD operations
* Foreign key relationships
* REST API development
* Backend architecture
* Data persistence
* Error handling
* API testing with Postman

---

## Internship Milestone

DecodeLabs Full Stack Development Internship

Project 3: Database Integration

Focus Areas:

* Databases
* CRUD Operations
* Data Storage
* SQL Relationships
* Backend Development
* API Design
