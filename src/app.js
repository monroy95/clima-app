// Script que ejecuta la aplicacion
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);
// Estableciendo el motor de vistas, plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares, codigo que se ejecuta cada vez que se mandan peticiones al servidor
// Utilizando Morgan
app.use(morgan('dev'));

// Rutas
app.use(require('./routes/index.js'));

// Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Sino existe la ruta que se ingreso que muestre un mensaje de no encontrado
app.use((req, res) => {
    res.status(404).end('404 NO ENCONTRADO');
});

app.listen(app.get('port'), () => {
    // Muestra el puerto en el que se esta corriendo el servidor
    console.log('Servidor Corriendo En El Puerto ', app.get('port'));
});