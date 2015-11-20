var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var database = require("./app_modules/database");
var friend_rest = require("./app_modules/friends_rest");
var user = require("./app_modules/login");

var app = express();

//This middleware creates an session object in client request
//and generates session cookie for user (so you can reference
//req.session)
app.use(session({secret:'yoursecrettokenhere'}));
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
app.use(bodyParser.urlencoded({extended:true}));

app.use("/friend",friend_rest);
app.use('/user',user);
 
//=======================ROUTERS============================
 
app.listen(3000);