const { Pieza, Vehiculo, Cliente } = require("./models.js");

/*          PIEZA           */


exports.readPiezas = (req, res) => Pieza.find({}, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.readPieza = (req, res) => Pieza.findOne({ _id: req.params.id }, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.deletePieza = (req, res) => Pieza.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.updatePieza = (req, res) => Pieza.findOneAndUpdate({ _id: req.params.id },
    { $set: { nombre: req.body.nombre, precio: req.body.precio, material: req.body.material, color: req.body.color, peso: req.body.peso } },
    (error, data) => {
        if (error) res.json(error);
        else res.json(data);
    });

exports.createPieza = (req, res) => {
    new Pieza({ nombre: req.body.nombre, precio: req.body.precio, material: req.body.material, color: req.body.color, peso: req.body.peso })
        .save((err, data) => {
            if (err) res.json({ error: err });
            else res.json(data);
        });
}


/*          VEHÍCULO            */



exports.readVehiculos = (req, res) => Vehiculo.find({}, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.readVehiculo = (req, res) => Vehiculo.findOne({ _id: req.params.id }, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.deleteVehiculo = (req, res) => Vehiculo.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.updateVehiculo = (req, res) => Vehiculo.findOneAndUpdate({ _id: req.params.id },
    { $set: { marca: req.body.marca, modelo: req.body.modelo, version: req.body.version, color: req.body.color, anyo: req.body.anyo } },
    (error, data) => {
        if (error) res.json(error);
        else res.json(data);
    });

exports.createVehiculo = (req, res) => {
    console.log(req.body);
    new Vehiculo({ marca: req.body.marca, modelo: req.body.modelo, version: req.body.version, color: req.body.color, anyo: req.body.anyo })
        .save((err, data) => {
            if (err) res.json({ error: err });
            else {
                console.log("bien");
                res.json(data);
            }
        });
}


/*          CLIENTE             */



exports.readClientes = (req, res) => Cliente.find({}, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.readCliente = (req, res) => Cliente.findOne({ _id: req.params.id }, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.deleteCliente = (req, res) => Cliente.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) res.json(error);
    else res.json(data);
});

exports.updateCliente = (req, res) => Cliente.findOneAndUpdate({ _id: req.params.id },
    { $set: { nombre: req.body.nombre, apellidos: req.body.apellidos, direccion: req.body.direccion, categoria: req.body.categoria } },
    (error, data) => {
        if (error) res.json(error);
        else res.json(data);
    });

exports.createCliente = (req, res) => new Cliente({ nombre: req.body.nombre, apellidos: req.body.apellidos, direccion: req.body.direccion, categoria: req.body.categoria })
    .save((err, data) => {
        if (err) res.json({ error: err });
        else res.json(data);
    });
