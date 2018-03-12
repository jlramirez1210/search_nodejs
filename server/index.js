var bodyParser  = require('body-parser'),
    http        = require('http'),
    express     = require('express')

var port        = port = process.env.PORT || 3000,
    app         = express(),
    Server      = http.createServer(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

Server.listen(port, ()=>{
  console.log("Server is running on port " + port);
})
