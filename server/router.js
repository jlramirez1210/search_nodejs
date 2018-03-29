let express = require('express')
let fs = require('fs')
let Router = express.Router()

Router.get('/all', function(req, res){
  fs.readFile('server/data.json', 'utf8', (err, readData) => {
    if (err) throw erro
    res.send(readData)
  })
})

Router.get('/allCiudad', function(req, res){
  fs.readFile('server/ciudad.json', 'utf8', (err, readData) => {
    if(err) throw erro
    res.send(readData)
  })
})

Router.get('/allTipo', function(req, res){
  fs.readFile('server/tipo.json', 'utf8', (err, readData) => {
    if(err) throw erro
    res.send(readData)
  })
})

module.exports = Router
