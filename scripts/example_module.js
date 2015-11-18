


//This is our first module
var my_module = angular.module("root_module",['ngRoute','ngResource']);

//Configure routes
my_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        controller:'personController',
        templateUrl:'view1.html'
    
    }).when('/friends',{
    
        controller:'personController',
        templateUrl:'view2.html'
        
    }).when('/update',{
        
        controller:'updateController',
        templateUrl:'view3.html'
        
    }).otherwise({
        redirectTo:'/'
    });
    
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
my_module.factory('personFactory',function($resource){
    
    var my_factory = {};
    my_factory.data = [];
    my_factory.dataUpdate = {};
    
    my_factory.addData = function(person){
        
        var req = $resource('/friend',{},{'post':{method:'POST'}});
        return req.post(person).$promise;
    }
    
    my_factory.getData = function(){
        
        var req = $resource('/friend',{},{});
        
        return req.query().$promise;
    }
    
    my_factory.deleteData = function(id){
        
        var req = $resource('/friend',{_id:id},{'delete':{method:'DELETE'}});
        
        return req.delete().$promise;
    }
    
    my_factory.updateData = function(person){
        
        var req = $resource('/friend',{},{'put':{method:'PUT'}});
        return req.put(person).$promise;
    }
    
    
    return my_factory;
    
});