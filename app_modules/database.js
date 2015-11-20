var mongoose = require("mongoose");

var uri = "mongodb://localhost:27017/person";

mongoose.connect(uri,function(bad,good){
    
    if(bad){
        
        console.log("Not Connected " + bad.message);
    }
    else{
        
        console.log("Connected");
    }
});

var Friends = mongoose.model('friend',{
    
    name:String,
    address:String,
    age:{type:Number,max:40}
});

var User = mongoose.model('user',{
    
    username:{type:String,unique:true},
    password:String,
    friend:[{type:mongoose.Schema.Types.ObjectId,ref:'friend'}]
});


exports.Friends = Friends;
exports.User = User;