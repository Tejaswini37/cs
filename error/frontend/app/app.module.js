
var app = angular.module("productApp", ["ngRoute"]);

// Global functions and route protection
app.run(function($rootScope, $location, authService){

// Check if user logged in
$rootScope.isLoggedIn = function(){
    return authService.isLoggedIn();
};


// Logout function
$rootScope.logout = function(){

    authService.logout()
    .then(function(){

        authService.removeToken();

        $location.path("/login");

    });

};


// Route protection
$rootScope.$on("$routeChangeStart", function(event, next){

    if(next.protected){

        if(!authService.isLoggedIn()){

            event.preventDefault();

            $location.path("/login");

        }

    }

});

});