CREATE DATABASE IF NOT EXISTS trademart;

USE trademart;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, category, price, type)
VALUES
('Laptop', 'Electronics', 30000, 'Sell'),
('Book', 'Books', 500, 'Sell'),
('Phone', 'Electronics', 25000, 'Sell');