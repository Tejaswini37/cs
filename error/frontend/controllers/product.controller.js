app.controller(
  "productController",
  function ($scope, $routeParams, productService, cartService) {
    $scope.products = [];
    $scope.product = {};
    $scope.searchText = "";

    // Load products
    $scope.loadProducts = function () {
      productService.getProducts($scope.searchText)
        .then(function (response) {
          $scope.products = response.data;
        })
        .catch(function (error) {
          console.log("Error loading products");
        });
    };

    // Search products
    $scope.searchProducts = function () {
      $scope.loadProducts();
    };

    // Load single product
    if ($routeParams.id) {
      productService.getProduct($routeParams.id).then(function (response) {
        $scope.product = response.data;
      });
    }

    $scope.addToCart = function (productId) {
      cartService
        .addToCart(productId, 1)
        .then(function () {
          alert("Product added to cart");
        })
        .catch(function () {
          alert("Please login first");
        });
    };

    // Initial load
    $scope.loadProducts();
  },
);
