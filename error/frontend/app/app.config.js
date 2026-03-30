app.config(function ($routeProvider) {
  $routeProvider

    .when("/", {
      templateUrl: "views/home.html",
      controller: "productController",
    })

    .when("/product/:id", {
      templateUrl: "views/product-detail.html",
      controller: "productController",
    })

    .when("/login", {
      templateUrl: "views/login.html",
      controller: "authController",
    })

    .when("/register", {
      templateUrl: "views/register.html",
      controller: "authController",
    })

    .when("/cart", {
      templateUrl: "views/cart.html",
      controller: "cartController",
      protected: true,
    })

    .when("/orders", {
      templateUrl: "views/orders.html",
      controller: "orderController",
      protected: true,
    })

    .when("/admin/products", {
      templateUrl: "views/admin/products.html",
      controller: "adminController",
      protected: true,
    })

    .when("/admin/categories", {
      templateUrl: "views/admin/categories.html",
      controller: "adminController",
      protected: true,
    })

    .otherwise({
      redirectTo: "/",
    });
});