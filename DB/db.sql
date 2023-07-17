CREATE DATABASE Synthia;

USE Synthia;

CREATE TABLE
    roles (
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL
    );

CREATE TABLE
    usuarios (
        id INT NOT NULL PRIMARY KEY,
        nombre VARCHAR(70) NOT NULL,
        email VARCHAR(70) NOT NULL,
        contraseña VARCHAR(30) NOT NULL,
        id_rol INT
    );

CREATE TABLE
    modulos_usuarios(
        id INT PRIMARY KEY,
        id_usuario INT,
        id_modulo INT
    );

CREATE TABLE
    comentarios(
        id INT AUTO_INCREMENT PRIMARY KEY,
        contenido VARCHAR(255) NOT NULL,
        fecha_creacion DATE NOT NULL,
        id_usuario INT,
        id_modulo INT
    );

CREATE TABLE
    modulos(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        id_proyecto INT
    );

CREATE TABLE
    modulos_estados(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_estado INT,
        id_modulo INT
    );

CREATE TABLE
    proyectos(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        descripcion VARCHAR(255) NOT NULL,
        fecha_creacion DATE
    );

CREATE TABLE
    estados(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(20)
    );

CREATE TABLE
    proyectos_estados(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_proyecto INT
    );

INSERT INTO roles(nombre) VALUES ("admin"),("programador");