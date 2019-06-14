'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();
var dns = require('dns');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});
  
// your first API endpoint... 

const list = [];

app.post("/api/shorturl/new", express.urlencoded(), function (req, res) {
  const url = req.body.url;
  dns.lookup(url, function(err, data){
    if(err) res.json({ "error": "invalid URL" });
    else
    {
      list.push(url);
      res.json({"original_url": url, "short_url": list.length });
    }
  });
  
});

app.get("/api/shorturl/:id", function(req, res){
  const id = req.params.id;
  res.redirect(list[id - 1]);
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});