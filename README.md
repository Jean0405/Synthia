# Synthia

## OBJETIVOS GENERALES

- El objetivo general de este proyecto es desarrollar una plataforma de gestión de proyectos que permita la creación de módulos, asignación de desarrolladores y seguimiento del progreso, con el fin de facilitar la administración y ejecución eficiente de proyectos.

| **OBJETIVOS ESPECÍFICOS**                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permitir la creación de usuarios en la plataforma, con la capacidad de acceder y participar en proyectos.                                                                                     |
| Asignar roles a los usuarios para establecer sus responsabilidades y permisos dentro de los proyectos.                                                                                        |
| Proporcionar a los administradores la capacidad de crear, editar y eliminar proyectos según sea necesario.                                                                                    |
| Permitir la creación de módulos dentro de los proyectos, para organizar y estructurar las tareas específicas.                                                                                 |
| Facilitar la asignación de uno o varios usuarios a cada módulo, para definir claramente quiénes son los responsables de su desarrollo.                                                        |
| Permitir a los usuarios marcar el estado de los módulos como "En desarrollo" o "Finalizado" para mantener un seguimiento actualizado del progreso.                                            |
| Brindar a los administradores la capacidad de marcar el estado de un proyecto completo como "En desarrollo" o "Finalizado", lo que indica su estado general.                                  |
| Ofrecer a los administradores la posibilidad de agregar comentarios de feedback a los módulos de un proyecto, para proporcionar retroalimentación y mejorar la calidad del trabajo realizado. |

## DIAGRAMA DE RELACIONES EN LA BASE DE DATOS

![diagrama relacional](./IMAGES//diagrama_db.png)

## ⬇️ INSTALACIÓN

1. Clona este repositorio en tu computadora, usa el siguiente comando:

```bash
git clone https://github.com/Jean0405/Synthia.git
```

2. Asegurate de tener Node.js instalado en tu computadora. De no ser así, descargalo e instala [Node js](https://nodejs.org/es/download)

3. Instala las dependencias:

```bash
npm install
```

4. Crea un archivo en la raiz del proyecto llamado **.env**, aqui tienes un ejemplo de las variables necesarias que debe incluir.

```env
MY_CONFIG={"hostname":"", "port":}
MY_CONNECTION={"host":"", "user":"","password":"","database":"", "port":}
JWT_PRIVATE_KEY=""
```

- **NOTA:** _Recuerda poner tus propias variables de entorno._

5. EJECUTA TODOS LOS QUERYS DEL ARCHIVO **DB/db.sql**

- ⚠️⚠️ **NOTA:** _Es importante que ejecutes al final el siguiente query, debido a que en el proyecto solo hay 2 roles ---> **[ **admin** y **desarrollador** ]**. Y deben existir por defecto en la DB para la creación de los usuarios._ ⚠️⚠️

```sql
INSERT INTO roles(nombre) VALUES ("admin"),("desarrollador");
```

## 📍 **USO DE LOS ENDPOINTS**

| ⚠️⚠️ **IMPORTANTE A TENER EN CUENTA** ⚠️⚠️ |
| ------------------------------------------ |

| _PARA PODER USAR LOS ENDPOINTS DEBES HABERTE REGISTRADO Y TENER UN TOKEN ACTIVO, ESTE SE OBTIENE AL HABER CREADO TU USUARIO_

❗❗ **DE LO CONTRARIO NO FUNCIONARAN LOS ENDPOINTS SIN UN TOKEN**❗❗|

Para probar los endpoints puedes usar la herramienta de **THUNDER CLIENT** en **Visual studio code**

Para el ejemplo, usaremos la ruta http://localhost:3300

## ⚪⚪**ENDPOINTS USUARIOS**

### **POST** ---> Este endpoint permite crear usuarios en la base de datos

```bash
http://localhost:3300/usuario/post
```

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body donde se te sea necesario en el caso de **usuarios**

```json
{
  "id": 1005184201,
  "nombre": "Jeanpierre",
  "email": "jean123@gmail.com",
  "contrasena": "jean123",
  "id_rol": 1
}
```

### **GET** ---> Este endpoint permite listar usuarios los usuarios junto a sus roles

```bash
http://localhost:3300/usuario/get
```

### **DELETE** ---> Este endpoint permite eliminar usuarios de la base de datos.

```bash
http://localhost:3300/usuario/delete/1005184201
```

- **Nota:** _El **1005184201** representa el ID del usuario que se desea eliminar._

### **PUT** ---> Este endpoint permite editar usuarios de la base de datos.

```bash
http://localhost:3300/usuario/put/1005184201
```

- **Nota:** _El **1005184201** representa el ID del usuario que se desea editar._

## ⚫⚫**ENDPOINTS PROYECTOS**

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body cuando este sea necesario en el caso de **proyectos**

```json
{
  "nombre": "Gestor proyectos",
  "descripcion": "Gestor de proyectos y documentacion",
  "fecha_creacion": "2023-07-17"
}
```

### **POST** ---> Este endpoint permite crear proyectos de la base de datos.

```bash
http://localhost:3300/proyecto/1005184201
```

- **Nota:** _El **1005184201** representa el ID de tu usuario, esto para **validar** que tengas los permisos para hacerlo._

### **GET** ---> Este endpoint permite listar los proyectos de la base de datos

```bash
http://localhost:3300/proyecto
```

### **DELETE** ---> Este endpoint permite eliminar los proyectos de la base de datos

```bash
http://localhost:3300/proyecto/1005184201/1
```

- **Nota:** _El **1005184201** representa el **ID de tu usuario**, esto para validar que tengas los permisos para hacerlo y el **1** representa el **ID del proyecto** que se desea eliminar, además con él validamos que se exista en la DB._

### **PUT** ---> Este endpoint permite editar los proyectos de la base de datos

```bash
http://localhost:3300/proyecto/1005184201/1
```

- **Nota:** _El **1005184201** representa el **ID de tu usuario**, esto para validar que tengas los permisos para hacerlo y el **1** representa el **ID del proyecto** que se desea eliminar, además con él validamos que se exista en la DB._

## 🟠🟠**ENDPOINTS PROYECTOS_ESTADOS**

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body cuando este sea necesario en el caso de **proyectos_estados**

```json
{
  "id_estado": 1,
  "id_proyecto": 1
}
```

### **POST** ---> Este endpoint permite asignar un estado a determinado proyecto de la DB.

```bash
http://localhost:3300/proyecto/1005184201/1
```

- **Nota:** _El **1005184201** representa el **ID de tu usuario**, esto para validar que tengas los permisos para hacerlo y el **1** representa el **ID del proyecto** que se desea eliminar, además con él validamos que se exista en la DB._

### **PUT** ---> Este endpoint permite editar el estado de un determinado proyecto de la DB.

```bash
http://localhost:3300/proyecto/proyectos_estados/1005184201/1
```

- **Nota:** _El **1005184201** representa el **ID de tu usuario**, esto para validar que tengas los permisos para hacerlo y el **1** representa el **ID del proyecto** al que deseas editar su estado, además con él validamos que se exista en la DB._

## 🟢🟢**ENDPOINTS MÓDULOS**

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body cuando este sea necesario en el caso de **módulos**

```json
{
  "nombre": "Frontend del LOGIN",
  "descripcion": "blah blah blah",
  "id_proyecto": 1
}
```

### **POST** ---> Este endpoint permite crear módulos y asignarlos a un proyecto determinado

```bash
http://localhost:3300/modulo/1005184201
```

- **Nota:** _El **1005184201** representa el ID de tu usuario, esto para **validar** que tengas los permisos para hacerlo._

### **GET** ---> Este endpoint permite listar los módulos existentes junto a los proyectos a los cuales pertenecen

```bash
http://localhost:3300/modulo
```

- **Nota:** Este endpoint no requiere **ID de tu usuario** debido a que cualquiera tiene permitido visualizar los módulos que hay.

### **GET** ---> Este endpoint permite listar un módulo en especifico

```bash
http://localhost:3300/modulo/1
```

- **Nota:** El **1** representa el **ID del módulo** que se desea listar

### **DELETE** ---> Este endpoint permite eliminar un módulo de la DB.

```bash
http://localhost:3300/modulo/1005184201/1
```

- **Nota:** _El **1005184201** representa el **ID de tu usuario**, esto para validar que tengas los permisos para hacerlo y el **1** representa el **ID del proyecto** al que deseas editar su estado, además con él validamos que se exista en la DB._

### **PUT** ---> Este endpoint permite editar un módulo de la DB.

```bash
http://localhost:3300/modulo/1005184201/1
```

- **Nota:** _El **1005184201** representa el **ID de tu usuario**, esto para validar que tengas los permisos para hacerlo y el **1** representa el **ID del proyecto** al que deseas editar su estado, además con él validamos que se exista en la DB._

## 🟣🟣**ENDPOINTS MODULOS_USUARIOS**

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body cuando este sea necesario en el caso de **modulos_usuarios**

```json
{
  "id_usuario": 1005184201,
  "id_modulo": 1
}
```

### **POST** ---> Este endpoint permite asignar un usuario a determinado módulo

```bash
http://localhost:3300/modulo/modulos_usuarios/post/1005371571
```

- **Nota:** _En el URL debe ir el ID del usuario que hará la petición para la validación de permisos, mientras que en el BODY debe ir el ID del desarrollador que se asignara al módulo_

### **DELETE** ---> Este endpoint permite eliminar un usuario de determinado módulo

```bash
http://localhost:3300/modulo/modulos_usuarios/delete/1005371571
```

- **Nota:** _En el URL debe ir el ID del usuario que hará la petición para la validación de permisos, mientras que en el BODY debe ir el ID del desarrollador y el ID del módulo para borrar el enlace entre ellos._

## 🔵🔵**ENDPOINTS COMENTARIOS**

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body cuando este sea necesario en el caso de **comentarios**

```json
{
  "contenido": "Se debe cambiar el color del botón de login, etc, etc.",
  "fecha_creacion": "2023-07-23",
  "id_usuario": 1005184201,
  "id_modulo": 1
}
```

### **POST** ---> Este endpoint permite crear comentarios en un módulo

```bash
http://localhost:3300/modulo/comentario/post
```

### **GET** ---> Este endpoint permite listar los comentarios de un módulo especifico

```bash
http://localhost:3300/modulo/comentario/get/1
```

- **Nota:** El **1** representa el ID del módulo del cual listamos los comentarios.

### **DELETE** ---> Este endpoint permite listar los comentarios de un módulo especifico

```bash
http://localhost:3300/modulo/comentario/delete/1005184201/1
```

- **Nota:** El **1005184201** representa el ID del usuario que hace la petición, mientras el **1** el ID del comentario a eliminar.

## 🟡🟡**ENDPOINT MODULOS_ESTADOS**

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body cuando este sea necesario en el caso de **modulos_estados**

```json
{
  "id_estado": 1,
  "id_modulo": 1
}
```

### **POST** ---> Este endpoint permite asignar un estado a un módulo

```bash
http://localhost:3300/modulo/modulos_estados/1005184201
```

- **Nota:** El **1005184201** en el **URL** representa el ID del usuario que hace la petición, mientras que los datos del enlace entre estados y módulos van en el **BODY**.

### **PUT** ---> Este endpoint permite editar un estado de un módulo especifico

```bash
http://localhost:3300/modulo/modulos_estados/1005184201/1
```

- **Nota:** En el URL debe ir el **ID del usuario** que realizar la petición y el **ID del modulo_estado**, mientras en el BODY va el dato del **nuevo estado**.

## 🔴🔴**ENDPOINT ESTADOS**

**Ejemplo**: Este ejemplo es para que puedas copiar y usar en el body cuando este sea necesario en el caso de **estados**

```json
{
  "nombre": "EN DESARROLLO"
}
```

### **POST** ---> Este endpoint permite crear un estado

```bash
http://localhost:3300/estado/1005184201
```

- **Nota:** En el URL debe ir el **ID del usuario** que realizar la petición y en el BODY el dato del **nuevo estado**.

### **DELETE** ---> Este endpoint permite eliminar un estado especifico

```bash
http://localhost:3300/estado/1005184201/1
```

- **Nota:** En el **1005184201** representa el ID del usuario que realiza la petición para validar permisos, y el **1** representa el ID del estado.

## LENGUAJES Y HERRAMIENTAS UTILIZADOS

<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>

## AUTORES

- [@Jean0405](https://github.com/Jean0405)

## COLABORADOR

- [@CampusLands](https://github.com/CampusLands)
