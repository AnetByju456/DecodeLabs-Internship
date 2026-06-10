# TradeMart Backend API

## Overview

TradeMart Backend API is a RESTful backend service developed as part of the DecodeLabs Full Stack Development Internship Project 2.

The project demonstrates backend development using Node.js and Express.js, starting from basic CRUD APIs and evolving into a full marketplace backend simulation with users, cart system, order processing, activity logging, and a unified dashboard API.

This backend serves as the foundation for the TradeMart marketplace platform where users can buy, sell, and manage products through a role-based system.

---

## Features

### Core Features
- Product CRUD operations
- User registration and login system
- Cart management system
- Order processing with checkout flow
- Activity logging system
- Unified dashboard API

### Advanced Backend Features
- In-memory relational data simulation
- Cart to order conversion flow
- Order status management
- Activity tracking for user actions
- Modular route structure

---

## Tech Stack

- Node.js
- Express.js
- JavaScript

---

## Project Structure

Project-2
│
├── data
│   ├── products.js
│   ├── users.js
│   ├── carts.js
│   ├── cartItems.js
│   ├── orders.js
│   ├── orderItems.js
│   ├── activityLogs.js
│
├── routes
│   ├── products.js
│   ├── users.js
│   ├── carts.js
│   ├── orders.js
│   ├── activity.js
│   ├── dashboard.js
│
├── server.js
├── package.json
└── package-lock.json

---

## Installation

Clone the repository:

git clone <repo-url>

Install dependencies:

npm install

Start the server:

node server.js

Or using nodemon:

nodemon server.js

Server runs at:

http://localhost:3000

---

## API Endpoints

---

## Products

GET /products
GET /products/:id
POST /products
PUT /products/:id
DELETE /products/:id

Filtering (optional):
GET /products?category=Electronics
GET /products?type=Sell

---

## Users

POST /users/register
POST /users/login
GET /users
GET /users/:id
PUT /users/:id
DELETE /users/:id

---

## Cart

GET /cart/:userId
POST /cart/add
PUT /cart/item/:id
DELETE /cart/item/:id
DELETE /cart/clear/:userId

---

## Orders

GET /orders
GET /orders/:id
GET /orders/user/:userId
POST /orders/checkout
PUT /orders/:id
DELETE /orders/:id

Order Status Values:
- Placed
- Shipped
- Delivered
- Cancelled

---

## Activity Logs

GET /activity
GET /activity/user/:userId
POST /activity
DELETE /activity/:id

---

## Dashboard API

GET /dashboard/:userId

Returns:
- User details
- Cart summary
- Orders history
- Recent activity
- User statistics

---

## Data Models

User:
{
  id,
  name,
  email,
  phone,
  password,
  role
}

Product:
{
  id,
  name,
  category,
  price,
  type,
  sellerId
}

Cart Item:
{
  id,
  cartId,
  productId,
  quantity
}

Order:
{
  id,
  userId,
  totalAmount,
  status,
  createdAt
}

Activity Log:
{
  id,
  userId,
  action,
  timestamp
}

---

## HTTP Status Codes

200 - OK  
201 - Created  
400 - Bad Request  
401 - Unauthorized  
404 - Not Found  
500 - Internal Server Error  

---

## Validation

The API validates incoming product data.

Required fields:
- name
- category
- price
- type

If any required field is missing:
400 Bad Request

---

## Testing

API can be tested using:
- Postman
- Thunder Client
- Browser (GET endpoints)

---

## Future Improvements

- MySQL database integration (Project 3)
- Authentication middleware (JWT-based system)
- Role-based access control
- Product search and filtering improvements
- Frontend integration with TradeMart
- Persistent storage instead of in-memory arrays

---

## Project Status

Completed:
- Product API system
- User management system
- Cart system
- Order system with checkout flow
- Activity logging system
- Dashboard aggregation API

Next Phase:
- Database migration to MySQL (Project 3)


