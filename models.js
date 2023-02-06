// ----- IMPORTACIONES
// Require importa el módulo que le pida
const mongoose = require('mongoose');

// Se importa desde .env para no compartir credenciales
// (y si no existe, para este caso se tomará los datos directamente, que es inseguro)
const DB_URI = process.env.DB_URI // || "mongodb://127.0.0.1:27017/taller"; 


// ----- CONEXIÓN A LA BD
// Conexión a la Base de Datos de MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(DB_URI)
    .then(db => console.log("Conectado a servidor BD"))
    .catch(err => console.error("ERROR", err));

const Pieza = mongoose.model('Pieza', new mongoose.Schema(
    {
        nombre: { type: String, default: "Sin nombre" },
        precio: { type: Number, default: 0 },
        material: { type: String, default: "Sin material" },
        color: { type: String, default: "Sin color" },
        peso: { type: Number, default: 0 }
    }
));

const Vehiculo = mongoose.model('Vehículo', new mongoose.Schema(
    {
        marca: { type: String, default: "Sin marca" },
        modelo: { type: String, default: "Sin modelo" },
        version: { type: String, default: "Sin versión" },
        color: { type: String, default: "Sin color" },
        anyo: { type: Number, default: 0 }
    }
));

const Cliente = mongoose.model('Cliente', new mongoose.Schema(
    {
        nombre: { type: String, default: "Sin nombre" },
        apellidos: { type: String, default: "Sin apellidos" },
        direccion: { type: String, default: "Sin dirección" },
        categoria: { type: String, default: "Sin categoría" },
    }
));


module.exports = { Pieza, Vehiculo, Cliente };