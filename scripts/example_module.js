


//This is our first module
var my_module = angular.module("root_module",['ngRoute','ngResource','ui.bootstrap']);


/*
function loginRequired($q,$location){
    
    var deferred = $q.defer();
        
        
    if(sessionStorage['logged']){

        deferred.resolve();
    }
    else{

        deferred.reject();
        $location.path('/');
    }
    
    
    return deferred.promise;
}*/


function loginRequired($q,$location,$resource,$http){
    
    var deferred = $q.defer();
    $http.defaults.headers.common['x-access-token'] = sessionStorage['access-token'];    
    $resource('/authenticate').query().$promise.then(function(auth){

        deferred.resolve();
        return deferred.promise;
    },function(error){

        deferred.reject();
        $location.path('/');
        return deferred.promise;
        
    });
    
}


//Configure routes
my_module.config(function($routeProvider){
    
    
    $routeProvider.when('/',{
        controller:'loginController',
        templateUrl:'login.html',
    
    }).when('/main',{
        
        controller:'personController',
        templateUrl:'view1.html',
        resolve:{loginRequired:loginRequired}
        
    }).when('/friends',{
    
        controller:'personController',
        templateUrl:'view2.html',
        resolve:{loginRequired:loginRequired}
        
    }).when('/update',{
        
        controller:'updateController',
        templateUrl:'view3.html',
        resolve:{loginRequired:loginRequired}
        
    }).otherwise({
        redirectTo:'/'
    });
    
});

my_module.controller('navController',function($scope,$http,$resource,$location){
    
    $scope.logout = function(){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['access-token'];
        $resource('/logout').query().$promise.then(function(){
            console.log('user logged out');
            //Go back to login page
            $location.path('/');
        });
    }
});

my_module.controller('updateController',function($scope,personFactory,$location){
    
    $scope.update = personFactory.dataUpdate;
    
    $scope.update.updatePerson = function(){
        
        var temp = {
            
            _id:$scope.update._id,
            name:$scope.update.name,
            address:$scope.update.address,
            age:$scope.update.age
        }

        personFactory.updateData(temp).then(function(){
            
            $location.path('/friends');
        });
    }
});

//After creating module you can add controllers
//factories etc for it....
my_module.controller('personController',function($scope,personFactory,$location){
    
    $scope.person = {};

    personFactory.getData().then(function(data){
        
        $scope.person.data = data;
    });
    
    $scope.person.deletePerson = function(id){
        
        for(var i = 0; i < $scope.person.data.length; i++)
        {
            if($scope.person.data[i]._id === id){
                
                $scope.person.data.splice(i,1);
                break;
            }
        }
        
        personFactory.deleteData(id).then(function(result){
            
            console.log(result);
        });
    }
    
    $scope.person.updatePerson = function(id){
        
        //First set the scope variables to hold the selected
        //person data
        for(var i = 0; i < $scope.person.data.length; i++)
        {
            if($scope.person.data[i]._id === id){
                
                //personFactory.updateData($scope.person.data[i]);
                personFactory.dataUpdate = $scope.person.data[i];
                break;
            }
        }
        //Go to path /update (open view3.html)
        $location.path('/update');
    }
    
    $scope.person.addPerson = function(){
        
        var tempData = {
            name:$scope.person.name,
            address:$scope.person.address,
            age:$scope.person.age
        };
        
        personFactory.addData(tempData).then(function(data){
            console.log(data);
        });
    }
});

//Create a factory. Factory is sigleton, meaning there is 
//only one instance of it
my_module.factory('personFactory',function($resource,$http){
    
    var my_factory = {};
    my_factory.data = [];
    my_factory.dataUpdate = {};
    
    my_factory.addData = function(person){
        //Set the x-access-token header for our request
        $http.defaults.headers.common['x-access-token'] = sessionStorage['access-token'];
        var req = $resource('/friend',{},{'post':{method:'POST'}});
        return req.post(person).$promise;
    }
    
    my_factory.getData = function(){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['access-token'];
        var req = $resource('/friend',{},{});
        
        return req.query().$promise;
    }
    
    my_factory.deleteData = function(id){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['access-token'];
        var req = $resource('/friend',{_id:id},{'delete':{method:'DELETE'}});
        
        return req.delete().$promise;
    }
    
    my_factory.updateData = function(person){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['access-token'];
        var req = $resource('/friend',{},{'put':{method:'PUT'}});
        return req.put(person).$promise;
    }
    
    
    return my_factory;
    
});