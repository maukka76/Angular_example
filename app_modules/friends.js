
var friends = require("./database");

//This function add new friend to database
exports.addFriend = function(req,res){
    
    var temp = new friends.Friends(req.body);
    temp.save(function(err){
        
        if(err){
            res.send(err.message);
        }
        else{
            
            res.send("New friend added");
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
    
    friends.Friends.find(function(err,data){
        
        if(err){
            
            res.send("Something went wrong");
        }
        else{
            
            res.send(data);
        }
        
    });
}

exports.updateFriend = function(req,res){
    
    console.log(req.body);
    friends.Friends.update({_id:req.body._id},{name:req.body.name,address:req.body.address,age:req.body.age},function(err,data){
        console.log(err);
        console.log(data);
        res.send("ok");
    });
}

