# BACKEND (con Node, Express y MongoDB)
Api sobre la temática de un taller de vehículos

## Introducción

> **Esta aplicación backend proporciona una API REST y ofrece la información en formato JSON**.
>
> Este tipo de aplicaciones tiene las siguientes ventajas:
>
> - Separación entre el backend y el frontend. 
> - Visibilidad, fiabilidad y escalabilidad. 
> - La API REST siempre es independiente del tipo de plataforma o lenguaje.
>
> REST: Representational State Transfer

Para trabajar con el entorno de ejecución Node.js y su gestor de paquetes podemos realizar la instalación desde los repositorios de Debian/Ubuntu o derivadas con:

```bash
sudo  apt  install  nodejs  npm
```

O, si deseamos una versión más actualizada, podemos recurrir al sitio oficial de Node.js:

[Página de descargas de node](https://nodejs.org/es/download/)


## Inicio de un proyecto

Para iniciar el proyecto hacemos:

```
mkdir  taller-mecanico
cd     taller-mecanico

npm  init  -y
```

La última sentencia nos crea un archivo **`package.json`** con la metainformación del proyecto. La opción `y` o `--yes` es para que no nos pregunte y escriba una configuración por defecto en dicho archivo. Siempre podemos editarlo más adelante y modificar la version, añadir el autor, ...


## Edición de package.json

El archivo **`package.json`** es el archivo de gestión de proyecto y dependencias. En él podremos editar el nombre del autor, la versión, el tipo de licencia, etc.

Una parte muy importante es indicar el punto de entrada. En este proyecto será el archivo **`server.js`**, que crearemos más adelante.

Para definir dicho punto de entrada, lo hacemos con la línea:

```
  "main": "server.js",
```

También hemos modificado una de las líneas de `scripts`. En concreto:

```
    "dev": "nodemon server.js"
```

Esta línea indica que cuando ejecutemos `npm run dev` en el terminal, lo que se va a ejecutar en última instancia es el comando `nodemon server.js`.  

NOTA: Los scripts se ejecutan desde el terminal de texto con `npm run` *nombre_script*.

NOTA: `nodemon` es un paquete de Node.js que ejecuta node en modo monitor, es decir, está comprobando constantente cualquier cambio en nuestros archivos, y si detecta alguno, entonces vuelve a reiniciar el entorno de ejecución con los nuevos cambios. Esto es muy útil para el proceso de desarrollo de la aplicación.


## Servidor web básico

En el archivo **[`server.js`](server.js)** escribiremos el código para crear nuestro propio servidor web. En su versión mínima, solamente son necesarias 3 líneas.


```javascript
const express = require('express');

const app = express();

app.listen(3000);
```

Como nuestro backend se va a destinar a proporcionar una API REST y el intercambio de información se va a realizar en formato JSON, modificaremos el archivo anterior para que tenga la siguiente apariencia:

```javascript
const express = require('express');

const app = express();

// MIDDLEWARE
app.use(express.json());    

// SERVIDOR WEB
app.listen(3000, () => console.log("Servidor iniciado..."));
```

Hemos añadido el *midleware* de soporte de formato JSON y un callback en la última línea para que, cuando el servidor web esté iniciado, nos muestre un mensaje indicando tal circunstancia. El *midleware* es el software disponible para su ejecución entre la petición de un cliente y la respuesta del servidor.

Para probar nuestro servidor web:

```bash
npm  run  dev
```

No obstante, esto dará un error. El motivo es que necesitamos instalar los paquetes **`express`** y **`nodemon`**.

El primero se instalará como dependencia de aplicación y el segundo como dependencia de desarrollo. La diferencia entre uno y otro es que el primero es necesario para el funcionamiento de la aplicación, mientras que el segundo sólo es necesario para facilitar el proceso de desarrollo.

Deberemos ejecutar:

```bash
npm  install  express
npm  install  nodemon  -D
```

Dichos módulos se guardan en la carpeta `node_modules` (entre muchos otros). El archivo `package-lock.json`  contiene la versión exacta de cada dependencia. Este archivo es muy importante, puesto que indicará al servidor de producción que utilice exactamente la mismas versiones de las dependencias que usamos en nuestro entorno de desarrollo, evitando así problemas en el despligue. 

Ahora, ya podremos ejecutar `npm run dev`, y si no hay errores, podremos abrir el navegador y acceder a la url `http://localhost:3000`.


## Servidor web completo

### Sirviendo código estático

Podemos servir código estático (HTML, CSS, imágenes, ...) añadiendo el siguiente *middleware*. 

```javascript
app.use(express.static('public'));
```
Esto pondrá a disposición de todo el mundo el contenido alojado en la carpeta `public`. 

No obstante, es mejor poner una ruta absoluta. Ello se hace mediante el siguiente código:

```javascript
const path = require('path');

app.use(express.static(path.join(__dirname , 'public')));
```

En [`public/index.html`](public/index.html) pondremos una página con información acerca de la API. 

![Info de la API](https://user-images.githubusercontent.com/79328934/217622961-34bacda5-0711-4049-a84d-640405ad610b.png)


### Haciendo pública nuestra API

**IMPORTANTE:** Debemos instalar el módulo `cors` que proporciona funcionalidad de [Cross-Origin Resource Sharing]
```
npm  install  cors
```

El código a añadir es:

```javascript
const cors = require('cors');

app.use(cors()); 
```

### Obteniendo información de configuración desde las variables de entorno 

**IMPORTANTE:** Debemos instalar el módulo `dotenv` para guardar la información de conexión a la base de datos mediante  **variables de entorno**

```
npm  install  dotenv
```

Utilizaremos .

Para ello usaremos un archivo `.env` y el módulo `dotenv` para leer dicho archivo.

Ejemplo de contenido del archivo `.env`:

```
PORT=3000
DB_URI=mongodb://localhost:27017/basedatos
```

Código a añadir al servidor web:

```javascript
require('dotenv').config();

const PORT   = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
```

Si la variable `PORT` no está definida en el archivo `.env`, entonces se utiliza el valor 3000. Para localhost podemos no definir dicha variable.

La variable `DB_URI` debe estar definida en el archivo `.env` sino la conexión a la base de datos fallará ya que contiene la URL de la base de datos.


### Conectando a una base de datos

**IMPORTANTE:** Debemos instalar el módulo `mongoose`
```
npm  install  mongoose
```

Para conectar a una base de datos MongoDB usaremos el módulo `mongoose`.

```javascript
const mongoose = require('mongoose');

// CONEXIÓN A BASE DE DATOS
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Conexión a BD correcta"))
    .catch(error => console.log("Error al conectarse a la BD" + error));
```

### Indicando el archivo que contiene las rutas

Lo hacemos con el siguiente código:

```javascript
const apiRoutes = require('./routes');

app.use('/api', apiRoutes);
```

Todo el código fuente del servidor está disponible en el archivo **[`server.js`](server.js)**.


## Rutas

Este backend proporpociona una **API Rest** con los siguientes **end-points**:

```
(GET)    /api/clientes         (Lista    todos los clientes)
(POST)   /api/clientes         (Crea     cliente)
(GET)    /api/clientes/:id     (Lista    cliente :id)
(PUT)    /api/clientes/:id     (Modifica cliente :id)
(DELETE) /api/clientes/:id     (Elimina  cliente :id)

```

En este caso hemos habilitado mediante `cors` el acceso a cada **end-point** de nuestra **API** desde cualquier URL. 

## Controladores

Los controladores son los encargados de realizar las operaciones CRUD. Para ello hacen uso de los modelos definidos.

```javascript
const { Cliente, Articulo } = require("./models.js");

exports.readClientes = (req, res) => 
    Cliente.find({}, (err, data) => {
        if (err) res.json({ error: err });
        else     res.json(data);
    });

// ...
```

Todo el código fuente de los controladores está disponible en el archivo **[`controllers.js`](controllers.js)**.

## Modelos

Tenemos 3 modelos:

- Cliente
- Vehículo 
- Pieza

Cada uno tiene un esquema asociado con sus propiedades.

## Base de datos

Como servidor de base de datos vamos a usar MongoDB en su versión Cloud. Para ello podemos registrarnos en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) en su modalidad *Free*, que nos proporciona 512 MB de almacenamiento, más que suficiente para lo que queremos hacer.

Una vez registrados, crearemos un cluster (por defecto son de 3 máquinas), luego una base de datos y un usuario y contraseña para acceder a dicha base de datos. A dicho usuario le daremos permisos de lectura y escritura.

Una vez realizados estos pasos, conseguiremos la URL de acceso para aplicación de Node.js. Tiene un formato similar al siguiente:

`mongodb+srv://`***`usuario`***`:`***`contraseña`***`@`***`servidor`***`/`***`basedatos`***`?retryWrites=true&w=majority`

### Guardamos datos de conexión en variable de entorno

En el archivo **`.env`** (abreviatura de *environment*) pondremos las **variables de entorno**, tales con la URL de conexión a la base de datos. En él escribiremos la línea:

`DB_URI=mongodb+srv://`***`usuario`***`:`***`contraseña`***`@`***`servidor`***`/`***`basedatos`***`?retryWrites=true&w=majority`

Deberemos sustituir `usuario`, `contraseña`, `servidor` y `basedatos` por los que nos sean propios.

> Nota: 
>
> Una forma más sencilla de trabajar, al menos durante el proceso de desarrollo, es utilizar una base de datos local. 
> Aunque cuando vayamos a desplegar la aplicación en Internet deberemos recurrir a una base de datos on-line.
>
> Si utilizamos un servidor MongoDB local, la URL tendrá la forma:
>
> `mongodb://localhost:27017/`*basedatos*


## Control de versiones (Git)

Para el control de versiones se usará **git** y **[GitHub](https://github.com)**.

Seguiremos los siguientes pasos:

1. Inicializa el repositorio local:

```
git  init
```

2. Edita el archivo `.gitignore` con el siguiente contenido:

```
node_modules/
.env
```

De esta forma indicamos que la carpeta `node_modules` y el archivo `.env` no serán incluidos en el repositorio, sólo permanecerán en el directorio de trabajo. 

## Despliegue


### Despliegue en Heroku


Para el despligue usaremos **[Heroku](https://www.heroku.com/)**.

Seguiremos los siguientes pasos:

1. Inicia sesión en el terminal.

```
heroku  login  --interactive
```

Si no usas **--interactive** te mandará al login desde el navegador (más sencillo)

2. Crea una nueva aplicación.

`heroku  apps:create` *nombre_aplicación*  

Esta operación, además de crear la aplicación, reserva un repositorio git para su alojamiento.

> Nota: Sustituye *nombre_aplicación* por el valor que desees. 
>
> Ten en cuenta que muchos nombres de aplicación pueden estar ya cogidos, sobre todo si son nombres sencillos o habituales.

3. Añade el vínculo al repositorio remoto de Heroku creado previamente.

`git  remote  add  heroku  https://git.heroku.com/` *nombre_aplicación.git*

> Nota: Sustituye *nombre_aplicación* por el nombre de tu aplicación. 

4. Despliega el contenido en Heroku.

```
git  push  heroku  master
```

7. Comprueba su funcionamiento.

```
heroku  open
```

### A tener en cuenta

Puesto que el archivo `.env` no se debe subir al sistema de control de versiones, en Heroku debemos declarar las variables de entorno desde la interfaz web o desde el CLI.

En concreto, en esta aplicación debemos configurar la variable DB_URI con la URI de conexión a la base de datos.

**Desde la interfaz web**

![image](https://user-images.githubusercontent.com/79328934/217625834-c880060e-1311-4c02-a6f3-ddc5e5fd385e.png)

**Desde CLI**

```bash
heroku login -i
heroku config:set DB_URI=mongodb+srv://...  -a taller-mecanico
```

Para ver las variables configuradas, ejecutamos:

```bash
heroku config -a taller-mecanico
```

> NOTA: Si deseamos eliminar una variable, lo hacemos con
>
> `heroku config:unset NOMBRE_VARIABLE -a taller-mecanico`


### Errores probables que ya he tenido

> Si tras desplegar en Heroku no aparece ningún error pero la aplicación no aparece en su url, **comprobar que el repositorio de Git Hub es público**.
> Hay que **respetar el orden de invocación de cors, json y routes** en el código (si no podría invocar una variable que aún no se ha inicializado.
> Para **ver errores a detalle** consultar los logs del servidor Heroku (se puede desde CLI y desde la web de Heroku)

Créditos: Este manual se basa en el de https://github.com/jamj2000
