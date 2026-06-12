# TradeMart Full Stack Application

## Overview

TradeMart is a full-stack marketplace application that connects buyers and sellers in a unified platform. It allows users to register, browse products, manage carts, place orders, and track activity in real time.

This project represents the final stage of the TradeMart system where the frontend, backend, and database are fully integrated into a production-ready architecture.

The system is built as part of the DecodeLabs Full Stack Development Internship Project 4.

---

## Features

### User Features
- User registration and login
- Role-based access (Buyer / Seller / Admin)
- Profile management

### Marketplace Features
- Product listing and browsing
- Product filtering by category and type
- Seller product management

### Cart & Order System
- Add/remove products from cart
- Update cart quantities
- Checkout and order creation
- Order history tracking

### Activity Tracking
- User activity logs
- System event tracking (login, orders, cart updates)

### Dashboard
- Unified user dashboard
- Cart summary
- Order summary
- Recent activity feed
- Basic analytics

---

## Tech Stack

### Frontend
- React.js
- Redux / Context API
- Axios
- TailwindCSS / CSS

### Backend
- Node.js
- Express.js
- REST API architecture

### Database
- MySQL
- Relational schema design
- Foreign key relationships
- Transactions for order handling

---

## System Architecture

Frontend (React)
        ↓
REST API (Express.js)
        ↓
MySQL Database

---

## Project Structure

TradeMart-Project-4
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services (API calls)
│   └── App.js
│
├── backend
│   ├── config
│   ├── routes
│   ├── controllers
│   ├── middleware
│   ├── database
│   ├── server.js
│
├── database
│   ├── schema.sql
│   └── seed.sql
│
├── README.md
└── package.json

---

## Installation

### Clone Repository

git clone <repository-url>
cd TradeMart-Project-4

---

### Backend Setup

cd backend
npm install

Create `.env` file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=trademart
JWT_SECRET=your_secret_key

Start backend server:

node server.js

Backend runs at:
http://localhost:3000

---

### Database Setup

Run MySQL schema:

source database/schema.sql;

(Optional seed data can be added later)

---

### Frontend Setup

cd frontend
npm install
npm start

Frontend runs at:
http://localhost:5173 or 3000 (based on setup)

---

## API Overview

### Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/refresh

### Users
- GET /users/:id
- PUT /users/:id

### Products
- GET /products
- POST /products
- PUT /products/:id
- DELETE /products/:id

### Cart
- GET /cart/:userId
- POST /cart/add
- DELETE /cart/item/:id

### Orders
- POST /orders/checkout
- GET /orders/:userId

### Activity
- GET /activity/:userId

### Dashboard
- GET /dashboard/:userId

---

## Database Design

Main Tables:
- users
- products
- carts
- cart_items
- orders
- order_items
- activity_logs

Relationships:
- One user → many products
- One user → one cart
- One cart → many cart_items
- One user → many orders
- One order → many order_items

---

## Security (Planned Enhancements)

- JWT authentication
- Refresh token system
- Password hashing (bcrypt)
- Role-based access control (RBAC)
- Rate limiting
- Input validation

---

## Future Improvements

- Payment gateway integration
- Real-time notifications
- Advanced analytics dashboard
- Image upload system (S3 / Cloudinary)
- Microservices architecture
- Deployment (AWS / Render / Vercel)

---

## Status

Project-4 is currently in active development and will evolve into a fully production-ready full-stack marketplace system.