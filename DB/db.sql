/*----------------------CREACIÓN DE LA BASE DE DATOS------------------------*/

CREATE DATABASE Synthia;

USE Synthia;

/*---------------------CREACIÓN DE LAS TABLAS-----------------------*/

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

/*----------------------CREANDO LAS RELACIONES ENTRE TABLAS--------------------*/

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

/*¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ IMPORTANTE !!!!!!!!!!!!!!!!!!*/

/*----------------------CREANDO LOS ROLES POR DEFECTO (Deben ser los unicos que existan en la DB)----------------------*/

INSERT INTO roles(nombre) VALUES ("admin"),("desarrollador");

/*--------QUERYS DE PRUEBA--------*/

/* 
 SELECT * FROM usuarios;
 SELECT * FROM proyectos;
 SELECT * FROM modulos;
 SELECT * FROM modulos_usuarios;
 SELECT * FROM comentarios;
 SELECT * FROM estados;
 SELECT * FROM proyectos_estados;
 SELECT * FROM modulos_estados; */

/* SELECT
 modulos.id,
 estados.nombre AS estado,
 modulos.nombre AS modulo,
 modulos.descripcion,
 proyectos.nombre AS nombre_proyecto
 FROM modulos_estados AS ms
 INNER JOIN modulos ON ms.id_modulo = modulos.id
 INNER JOIN estados ON ms.id_estado = estados.id
 INNER JOIN proyectos ON modulos.id_proyecto = proyectos.id;
 SELECT
 estados.nombre AS estado,
 proyectos.nombre AS proyecto,
 proyectos.descripcion,
 proyectos.fecha_creacion
 FROM proyectos_estados
 INNER JOIN proyectos ON proyectos_estados.id_proyecto = proyectos.id
 INNER JOIN estados ON proyectos_estados.id_estado = estados.id;
 SELECT
 modulos.nombre AS modulo,
 c.contenido AS comentario,
 c.fecha_creacion AS fecha,
 usuarios.id AS id_usuario,
 usuarios.nombre AS usuario
 FROM comentarios AS c
 INNER JOIN usuarios ON c.id_usuario = usuarios.id
 INNER JOIN modulos ON c.id_modulo = modulos.id
 WHERE modulos.id = 2;
 SELECT
 roles.nombre AS rol,
 usuarios.nombre AS usuario
 FROM modulos_usuarios AS ms
 INNER JOIN usuarios ON ms.id_usuario = usuarios.id
 INNER JOIN roles ON usuarios.id_rol = roles.id
 WHERE
 ms.id_usuario = 1005372573
 AND ms.id_modulo = 1;
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
 WHERE id = 3; */

SELECT * FROM usuarios;

SELECT
    proyectos.nombre AS proyecto,
    modulos.nombre AS modulos
FROM modulos
    INNER JOIN proyectos ON modulos.id_proyecto = proyectos.id;

SELECT
    modulos.id,
    estados.nombre AS estado,
    modulos.nombre AS modulo,
    modulos.descripcion,
    proyectos.nombre AS nombre_proyecto
FROM modulos_estados AS ms
    INNER JOIN modulos ON ms.id_modulo = modulos.id
    INNER JOIN estados ON ms.id_estado = estados.id
    INNER JOIN proyectos ON modulos.id_proyecto = proyectos.id;