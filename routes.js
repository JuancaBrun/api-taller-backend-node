// ----- IMPORTACIONES
// Require importa el módulo que le pida
const express = require('express');
const controller = require("./controllers.js");
const cors = require('cors');
const app = require('./server');
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

const router = express.Router();

router.get("/piezas", cors(), controller.readPiezas);
router.get("/piezas/:id", cors(), controller.readPieza);
router.delete("/piezas/:id", cors(), controller.deletePieza);
router.put("/piezas/:id", cors(), controller.updatePieza);
router.post("/piezas", cors(), controller.createPieza);

router.get("/vehiculos", cors(), controller.readVehiculos);
router.get("/vehiculos/:id", cors(), controller.readVehiculo);
router.delete("/vehiculos/:id", cors(), controller.deleteVehiculo);
router.put("/vehiculos/:id", cors(), controller.updateVehiculo);
router.post("/vehiculos", cors(), controller.createVehiculo);

router.get("/clientes", cors(), controller.readClientes);
router.get("/clientes/:id", cors(), controller.readCliente);
router.delete("/clientes/:id", cors(), controller.deleteCliente);
router.put("/clientes/:id", cors(), controller.updateCliente);
router.post("/clientes", cors(), controller.createCliente);

module.exports = router;