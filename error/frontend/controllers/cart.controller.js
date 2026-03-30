app.controller("cartController", function ($scope, cartService) {
  $scope.cartItems = [];

  $scope.loadCart = function () {
    cartService.getCart()
      .then(function (res) {
        $scope.cartItems = res.data;
      })
      .catch(function () {
        console.log("Error loading cart");
      });
  };

  $scope.updateQuantity = function (item) {
    cartService.updateCart(item.id, item.quantity).then(function () {
      $scope.loadCart();
    });
  };

  $scope.removeItem = function (id) {
    cartService.removeCart(id).then(function () {
      $scope.loadCart();
    });
  };

  // Initial load
  $scope.loadCart();
});
