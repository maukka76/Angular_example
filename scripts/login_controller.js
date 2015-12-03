
//Controller for login.html template
my_module.controller('loginController',function($scope,$resource,$location){
    
    $scope.login = {};
    
    $scope.login.login = function(){
        
        if(!$scope.login.username || !$scope.login.password){
            
            alert('Give user name and password');
            return;
        }
        
        var loginData = {
            
            username:$scope.login.username,
            password:$scope.login.password
        }
        
        var req = $resource('/user',{},{'post':{method:'POST'}});
        req.post(loginData).$promise.then(function(data){
            
            //If login was ok
            if(data.success){
                //Store jwt token in sessionStorage.
                //This token is sent back to server in every request
                sessionStorage['access-token'] = data.token;
                sessionStorage['logged'] = true;
                $location.path('/main');

            }else{
                
                $(".error").text(data.message);
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