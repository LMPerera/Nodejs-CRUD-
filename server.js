var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./schemas/Book.model');

var db = 'mongodb://localhost/Book';

mongoose.connect(db);

var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended:true
}));

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

app.post('/books',function (req,res) {
  var newBook = new Book();
  newBook.title=req.body.title;
  newBook.author=req.body.author;
  newBook.catrgory=req.body.catrgory;
  newBook.save(function (err,books) {
    if (err) {
      res.send('error saving book '+err);
    }else {
     res.json(books);
    }
  });
});


app.put('/books',function (req,res) {
  
});


app.listen(port,function () {
  console.log('app listening on port '+port);
});
