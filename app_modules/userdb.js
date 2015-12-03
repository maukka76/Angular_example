var db = require('./database');
var app = require('../app');
var jwt = require('jsonwebtoken');
exports.login = function(req,res){
    
    db.User.findOne({username:req.body.username,password:req.body.password},function(err,data){
        
        if(err){
            
            res.send({status:err});
        }
        else{
            //Succesfull login
            if(data){
                
                req.session.username = data.username;
                var token = jwt.sign(data,app.secret,{expiresIn:'2h'});
                console.log(token);
                res.json({success:true,token:token});
            }
            else{
                
                res.send(401,'Wrong username or password');
            }
        }
    });
}

exports.register = function(req,res){
    
    var user = new db.User(req.body);
    user.save(function(err){
        
        if(err){
            
            res.send({status:'Fail'});
        }
        else{
            
            res.send({status:'Ok'});
        }
    });
}