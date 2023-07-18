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
        contrasena VARCHAR(30) NOT NULL,
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
        id_proyecto INT,
        id_estado INT
    );

ALTER TABLE usuarios
ADD
    CONSTRAINT fk_roles FOREIGN KEY (id_rol) REFERENCES roles(id);

ALTER TABLE modulos_usuarios
ADD
    CONSTRAINT fk_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
ADD
    CONSTRAINT fk_modulos FOREIGN KEY (id_modulo) REFERENCES modulos(id) ON DELETE CASCADE;

ALTER TABLE comentarios
ADD
    CONSTRAINT fk_usuariosComentarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
ADD
    CONSTRAINT fk_modulosComentarios FOREIGN KEY (id_modulo) REFERENCES modulos(id) ON DELETE CASCADE;

ALTER TABLE modulos
ADD
    CONSTRAINT fk_proyectoModulo FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON DELETE CASCADE;

ALTER TABLE modulos_estados
ADD
    CONSTRAINT fk_modulos_ModEstados FOREIGN KEY (id_modulo) REFERENCES modulos(id) ON DELETE CASCADE,
ADD
    CONSTRAINT fk_Modestados_Estados FOREIGN KEY (id_estado) REFERENCES estados(id) ON DELETE CASCADE;

ALTER TABLE proyectos_estados
ADD
    CONSTRAINT fk_proyectos_proEstados FOREIGN KEY (id_proyecto) REFERENCES proyectos(id) ON DELETE CASCADE,
ADD
    CONSTRAINT fk_estados_proEstados FOREIGN KEY (id_estado) REFERENCES estados(id) ON DELETE CASCADE;

INSERT INTO roles(nombre) VALUES ("admin"),("desarrollador");
INSERT INTO usuarios(id,nombre, email,contrasena, id_rol) VALUES (1005184201, "Jean Angarita","jean0405@gmail.com","jean123", 1),(1005371571, "Akio","akio@gmail.com","akio1234", 2);
SELECT * FROM usuarios;