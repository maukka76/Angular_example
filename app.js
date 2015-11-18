var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var database = require("./app_modules/database");
var friend_rest = require("./app_modules/friends_rest");

var app = express();

//This is my middleware. Middlewares are done with use function
//Middlewares must be defined BEFORE any router
app.use(function(req,res,next){

    console.log(req.path);
    console.log(req.method);
    next();
});

app.use('/',express.static(path.join(__dirname, 'Views')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/scripts',express.static(path.join(__dirname, 'scripts')));
app.use('/css',express.static(path.join(__dirname, 'css')));

app.use(bodyParser.json());

app.use("/friend",friend_rest);
 
//=======================ROUTERS============================
 
app.listen(3000);