// ----- IMPORTACIONES
// Require importa el módulo que le pida
require('dotenv').config();
const { application } = require('express');
const express = require('express');
const bp = require('body-parser')


const app = express();
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const routes = require('./routes');
// Rutas
app.use('/api', routes);

// Se importa desde .env para no compartir credenciales
// (y si no existe, para este caso se tomará los datos directamente, que es inseguro)
const PORT = process.env.PORT // || 5000;


// ----- MIDDLEWARE
// Todo lo que va dentro de use sería un middleware
// Archivos estáticos. Deberás crear un archivo public/index.html para ver el resultado
app.use(express.static('public')); // Archivos estáticos colgarán de /public/
app.use(express.json()); // Soporte de JSON


// ----- INICIA SERVIDOR
// Inicia Servidor en puerto de IP:3000
app.listen(3000, () => console.log("Inicio de Servidor web"));