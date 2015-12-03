my_module.directive('angularNavbar',function(){
    
    var directive = {};
    
    directive.restrict = 'E';
    directive.replace = true;
    directive.transclude = true;
    directive.templateUrl = 'navbar.html';
    directive.controller = 'navController';
    
    return directive;
});