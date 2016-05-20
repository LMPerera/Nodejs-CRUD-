var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var db = 'mongodb://localhost/Book';

mongoose.connect(db);

var port = 3000;

app

app.get('/',function(req,res){
      res.send('Hello :)');
});

app.get('/books',function (req,res) {
  Book.find({}).exec(function (err,books) {
      if(err){
         res.send('Erorr '+err);
      }else {
         res.json(books);
      }
  });
});

app.get('/books/:id',function (req,res) {
  Book.findOne({
    _id:req.params.id
  }).exec(function (err,books) {
      if(err){
         res.send('Erorr '+err);
      }else {
         res.json(books);
      }
  });
});

app.listen(port,function () {
  console.log('app listening on port '+port);
});
