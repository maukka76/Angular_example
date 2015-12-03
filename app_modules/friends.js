
var friends = require("./database");

//This function add new friend to database
exports.addFriend = function(req,res){
    
    var temp = new friends.Friends(req.body);
    temp.save(function(err){
        
        if(err){
            res.send(err.message);
        }
        else{
            
            friends.User.update({username:req.session.username},
                                {$push:{'friend':temp._id}},function(err,data){
                                    res.send('Ok');
                                    req.session.listofFriends = [];
                                });
        }
    });
}


exports.deleteFriend = function(req,res){
    
    console.log(req.query._id);
    friends.Friends.remove({_id:req.query._id},function(err){
        
        if(err){
            
            res.send("delete error");
        }
        else{
            
            res.send("Delete success");
        }
    });
}

exports.getAllFriends = function(req,res){
    
    friends.User.findOne({username:req.session.username}).populate('friend').exec(function(err,data){
        
        if(err){
            
            res.send("Something went wrong");
        }
        else{
            
            //req.session.listofFriends = data.friend;
            if(data){
                res.send(data.friend);
            }
            else{
                res.send('Something went wrong');
            }
        }
        
    });
    /*
    friends.Friends.find(function(err,data){
        
        if(err){
            
            res.send("Something went wrong");
        }
        else{
            
            res.send(data);
        }
        
    });*/
}

exports.updateFriend = function(req,res){
    
    friends.Friends.update({_id:req.body._id},{name:req.body.name,address:req.body.address,age:req.body.age},function(err,data){
        console.log(err);
        console.log(data);
        res.send("ok");
    });
}

