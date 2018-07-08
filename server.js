"use strict"

var express = require('express');
var app = express();
var path = require('path');

// Middleware to Define Folder Static Files
app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3001, function(){
  console.log('App is listening on port 3001');
})
