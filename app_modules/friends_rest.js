var express = require("express");
var friends = require("./friends");

var router = express.Router();


//************REST API for Friends collection**************//
router.get("/",function(req,res){
    
    friends.getAllFriends(req,res);
});

router.post("/",function(req,res){
    
    friends.addFriend(req,res);
});

router.put("/",function(req,res){
    
    friends.updateFriend(req,res);
});

router.delete("/",function(req,res){
    friends.deleteFriend(req,res);
});













module.exports = router;