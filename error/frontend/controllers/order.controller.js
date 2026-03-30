app.controller("orderController",
function($scope, orderService){

$scope.orders = [];

// Load orders
$scope.loadOrders = function(){

orderService.getOrders()
.then(function(res){

$scope.orders = res.data;

})
.catch(function(){

console.log("Error loading orders");

});

};


// Place order
$scope.placeOrder = function(){

orderService.placeOrder()
.then(function(){

alert("Order placed successfully");

$scope.loadOrders();

})
.catch(function(){

alert("Order failed");

});

};


// Initial load
$scope.loadOrders();

});