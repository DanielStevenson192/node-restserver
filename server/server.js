require('./config/config');
const colors = require('colors');
const express = require('express');
const mongoose = require('mongoose');
// Inicio de express
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas
app.use(require('./routes/index'));


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, resp) => {
        if (err) throw err;
        console.log('Base de datos online'.cyan);
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto:'.cyan, process.env.PORT);
});