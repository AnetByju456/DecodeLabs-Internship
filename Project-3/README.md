# TradeMart Backend API - Project 3

## Overview

TradeMart Backend API is a Node.js and Express.js application that provides CRUD operations for marketplace products.

This project demonstrates database integration using MySQL, allowing product data to be stored permanently and managed through RESTful API endpoints.

Developed as part of the DecodeLabs Full Stack Development Internship - Project 3 (Database Integration).

---

## Project Objective

The goal of this project is to:

- Connect a backend application to a MySQL database
- Design a database schema
- Perform CRUD operations
- Ensure proper data handling and validation
- Store and retrieve data permanently

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Packages Used
- express
- mysql2
- dotenv

### API Testing
- Postman

---

## Project Structure


Project-3/
│
├── config/
│   └── db.js
│
├── routes/
│   └── products.js
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

### Products Table

| Column | Type |
|----------|----------|
| id | INT (Primary Key, Auto Increment) |
| name | VARCHAR(100) |
| category | VARCHAR(100) |
| price | DECIMAL(10,2) |
| type | VARCHAR(50) |
| created_at | TIMESTAMP |

---

## Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=trademart_db
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

Run the SQL script:

```sql
source database/schema.sql;
```

Or execute the contents of `schema.sql` using MySQL Workbench.

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

### Get All Products

```http
GET /products
```

### Get Product By ID

```http
GET /products/:id
```

### Create Product

```http
POST /products
```

Request Body:

```json
{
  "name": "Laptop",
  "category": "Electronics",
  "price": 30000,
  "type": "Sell"
}
```

### Update Product

```http
PUT /products/:id
```

Request Body:

```json
{
  "name": "Gaming Laptop",
  "category": "Electronics",
  "price": 50000,
  "type": "Sell"
}
```

### Delete Product

```http
DELETE /products/:id
```

---

## Features

- MySQL database integration
- Persistent data storage
- RESTful API design
- Create, Read, Update and Delete operations
- Input validation
- Error handling
- Environment variable configuration

---

## Learning Outcomes

Through this project, the following concepts were practiced:

- Database schema design
- MySQL integration with Node.js
- SQL queries
- CRUD operations
- REST APIs
- Backend architecture
- Data persistence

---

## Internship Milestone

DecodeLabs Full Stack Development Internship

**Project 3: Database Integration**

Focus Areas:

- Databases
- CRUD Operations
- Data Storage
- Backend Development