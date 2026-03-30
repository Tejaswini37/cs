app.controller(
  "adminController",
  function ($scope, adminService, productService) {
    $scope.categories = [];
    $scope.products = [];
    $scope.newCategory = {};
    $scope.newProduct = {};

    
    $scope.loadCategories = function () {
      adminService.getCategories().then(function (res) {
        $scope.categories = res.data;
      });
    };

  
    $scope.createCategory = function () {
      adminService.createCategory($scope.newCategory).then(function () {
        $scope.newCategory = {};

        $scope.loadCategories();
      });
    };

   
    $scope.deleteCategory = function (id) {
      adminService.deleteCategory(id).then(function () {
        $scope.loadCategories();
      });
    };


    $scope.loadProducts = function () {
      productService.getProducts().then(function (res) {
        $scope.products = res.data;
      });
    };


    $scope.createProduct = function () {
      adminService.createProduct($scope.newProduct).then(function () {
        $scope.newProduct = {};

        $scope.loadProducts();
      });
    };

    $scope.deleteProduct = function (id) {
      adminService.deleteProduct(id).then(function () {
        $scope.loadProducts();
      });
    };


    $scope.loadCategories();
    $scope.loadProducts();
  },
);
