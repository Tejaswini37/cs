var app=angular.module("myApp",[]);
app.controller("MainController",function($scope){
    $scope.message="Hello, Tejaswini!";
    $scope.students=[
        {name:"Tejaswini",age:22},
        {name:"Sushmitha",age:21},
        {name:"Anusha",age:23}
    ];
    
});