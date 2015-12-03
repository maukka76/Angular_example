var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var database = require("./app_modules/database");
var friend_rest = require("./app_modules/friends_rest");
var user = require("./app_modules/login");
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');

//You need this to create an https server with node
var https = require('https');
//You need fs module to read the sertificate (or any other) files within your server
var fs = require('fs');

//Define configuration for https server this will contain the sertificate files
var options = {
    
    key: fs.readFileSync('server.key'),
    cert:fs.readFileSync('server.crt')
}

var app = express();

var secret = uuid.v1();
 // Generate a v1 (time-based) id
exports.secret = secret;

app.use(session({secret:uuid.v4()}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//This middleware creates an session object in client request
//and generates session cookie for user (so you can reference
//req.session)

app.use('/',express.static(path.join(__dirname, 'Views')));


app.use('/lib',express.static(path.join(__dirname, 'lib')));
app.use('/scripts',express.static(path.join(__dirname, 'scripts')));
app.use('/css',express.static(path.join(__dirname, 'css')));


app.use('/user',user);

//This is my middleware. Middlewares are done with use function
//Middlewares must be defined BEFORE any router
app.use(function(req,res,next){
    
    //Check that request (GET or POST PUT DELETE) contains the token
    //In our case the client sets the token in x-access-token header, but for future
    //cases we also cehck the teh body.token and query.token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    //Did we find the secure token from requets
    if(token){
        
        //verity that token is not 'guessed' by the client and it matches
        //the one we craeted in login phase
        jwt.verify(token,secret, function(err, decoded) {
            //There was error verifying the token
            if(err){
                
                return res.send(401);
            }else{
                
                req.decoded = decoded; 
                console.log(req.decoded);
                next();
            }
        });
    }else{
        
        res.send(403);
    }
});



//Handle logout
app.get('/logout',function(req,res){
    
    req.session.destroy();
    res.status(200).send([{authenticate:false}]);
    
});


//Handle authenticate message
app.get('/authenticate',function(req,res){
    
    if(req.session.username){
        res.status(200).send([{authenticate:true}]);
    }
    else{
        
        res.status(401).send([{authenticate:false}]);
    }
});


//This is our rest api
app.use("/friend",friend_rest);

 

//=======================ROUTERS============================

//Create https server
https.createServer(options,app).listen(3000);