var db = require('./database');


exports.login = function(req,res){
    
    db.User.findOne({username:req.body.username,password:req.body.password},function(err,data){
        
        if(err){
            
            res.send({status:err});
        }
        else{
            
            if(data){
                console.log(data);
                req.session.username = data.username;
                res.send({status:"Ok"});
            }
            else{
                
                res.send({status:"Fail"});
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