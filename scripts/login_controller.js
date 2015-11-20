
//Controller for login.html template
my_module.controller('loginController',function($scope,$resource,$location){
    
    $scope.login = {};
    
    $scope.login.login = function(){
        
        var loginData = {
            
            username:$scope.login.username,
            password:$scope.login.password
        }
        
        var req = $resource('/user',{},{'post':{method:'POST'}});
        req.post(loginData).$promise.then(function(data){
            
            //If login was ok
            if(data.status === "Ok"){
                
                $location.path('/main');
            }else{
                
                $(".error").text(data.status);
            }
        });
    }
    
    $scope.login.register = function(){
        
        var loginData = {
            
            username:$scope.login.username,
            password:$scope.login.password
        }
        
        var req = $resource('/user/register',{},{'post':{method:'POST'}});
        req.post(loginData).$promise.then(function(data){
            
            //If login was ok
            if(data.status === "Ok"){
                
                $(".error").text("Register succesfull. You can now login.");
            }else{
                
                $(".error").text(data.status);
            }
        });
    }
    
});