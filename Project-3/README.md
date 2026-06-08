# TradeMart Backend API

## Overview

TradeMart Backend API is a RESTful backend service developed as part of DecodeLabs Full Stack Development Project 2.

The project demonstrates backend fundamentals including API development, request handling, JSON responses, data validation, HTTP status codes, and CRUD operations using Node.js and Express.js.

This API serves as the backend foundation for the TradeMart marketplace platform where users can buy, sell, borrow, and lend products.

---

## Features

* Retrieve all products
* Retrieve a product by ID
* Add new products
* Update existing products
* Delete products
* Validate user input
* Return appropriate HTTP status codes
* JSON-based request and response handling

---

## Tech Stack

* Node.js
* Express.js
* JavaScript

---

## Project Structure

```text
Project-2
│
├── data
│   └── products.js
│
├── routes
│   └── products.js
│
├── server.js
├── README.md
├── package.json
└── package-lock.json
```

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the server:

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

Response:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "category": "Electronics",
    "price": 25000,
    "type": "Sell"
  }
]
```

---

### Get Product By ID

```http
GET /products/:id
```

Example:

```http
GET /products/1
```

---

### Create Product

```http
POST /products
```

Request Body:

```json
{
  "name": "Office Chair",
  "category": "Furniture",
  "price": 1200,
  "type": "Sell"
}
```

---

### Update Product

```http
PUT /products/:id
```

Request Body:

```json
{
  "name": "Gaming Laptop",
  "category": "Electronics",
  "price": 45000,
  "type": "Sell"
}
```

---

### Delete Product

```http
DELETE /products/:id
```

Example:

```http
DELETE /products/2
```

---

## Validation

The API validates incoming product data.

Required fields:

* name
* category
* price
* type

If any required field is missing, the API returns:

```http
400 Bad Request
```

---

## HTTP Status Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 200         | OK                    |
| 201         | Created               |
| 400         | Bad Request           |
| 404         | Not Found             |
| 500         | Internal Server Error |

---

## Testing

The API can be tested using:

* Postman
* Thunder Client
* Browser (GET endpoints)

---

## Future Improvements

* Database integration (MongoDB/MySQL)
* Authentication and authorization
* Product search and filtering
* Frontend integration with TradeMart
* Persistent data storage

---


