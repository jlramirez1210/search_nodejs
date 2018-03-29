//Importo librerias requeridas
var bodyParser  = require('body-parser');
var http        = require('http');
var express     = require('express');
var events      = require('./router');

//declaro variables
var port = 3000;
var app = express();

//creo el servidor
var server = http.createServer(app);

//usa las librerias necsesarias
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/events', events);
server.listen(port, ()=>{
  console.log("Server is running on port " + port);
});
