-- Crear base de datos
CREATE DATABASE IF NOT EXISTS tienda_db;

-- Usar la base de datos
USE tienda_db;

-- Crear tabla products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price FLOAT NOT NULL,
    quantity INT DEFAULT 0
);
