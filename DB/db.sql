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
        id INT AUTO_INCREMENT PRIMARY KEY,
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

INSERT INTO
    usuarios(
        id,
        nombre,
        email,
        contrasena,
        id_rol
    )
VALUES (
        1005111333,
        "Hilter",
        "hitler@gmail.com",
        "hitler",
        2
    );

INSERT INTO
    proyectos (
        nombre,
        descripcion,
        fecha_creacion
    )
VALUES (
        "Ecommerce tienda churros",
        "bla bla bla bla",
        "2023-07-19"
    );

/*QUERYS DE PRUEBA*/

SELECT * FROM usuarios;

SELECT * FROM proyectos;

SELECT * FROM modulos;

SELECT * FROM modulos_usuarios;

SELECT
    modulos.id,
    modulos.nombre AS modulo,
    proyectos.nombre AS proyecto,
    usuarios.id AS id_usuario,
    usuarios.nombre AS usuarios_asignados
FROM modulos_usuarios AS ms
    INNER JOIN usuarios ON ms.id_usuario = usuarios.id
    INNER JOIN modulos ON ms.id_modulo = modulos.id
    INNER JOIN proyectos ON modulos.id_proyecto = proyectos.id
WHERE modulos.id = 3;

SELECT
    usuarios.id,
    usuarios.nombre,
    usuarios.email,
    roles.nombre AS rol
FROM usuarios
    INNER JOIN roles ON usuarios.id_rol = roles.id
WHERE usuarios.id = 1005184201;

SELECT COUNT(*) AS total FROM proyectos WHERE id = 4;

SELECT
    modulos.id AS id_modulo,
    modulos.nombre AS modulo,
    modulos.descripcion AS descripcion,
    proyectos.nombre AS nombre_proyecto
FROM modulos
    INNER JOIN proyectos ON modulos.id_proyecto = proyectos.id;

SELECT
    usuarios.*,
    roles.nombre AS rol
FROM usuarios
    INNER JOIN roles ON usuarios.id_rol = roles.id
WHERE usuarios.id = 1005184201;

SELECT * FROM modulos WHERE id = 1;

UPDATE modulos
SET
    nombre = "Crear ENDPOINTS",
    descripcion = "blah",
    id_proyecto = 1
WHERE id = 3;