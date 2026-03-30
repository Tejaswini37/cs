app.controller("authController", function ($scope, $location, authService) {
  $scope.user = {};

  // $scope.register = function () {
  //   authService
  //     .register($scope.user)
  //     .then(function (res) {
  //       $location.path("/login");
  //     })
  //     .catch(function (err) {
  //       $scope.error = "Registration failed";
  //     });
  // };
  $scope.register = function () {
    console.log("Register clicked");
};

  $scope.login = function () {
    authService
      .login($scope.user)
      .then(function (res) {
        authService.setToken(res.data.token);

        $location.path("/home");
      })
      .catch(function () {
        $scope.error = "Invalid credentials";
      });
  };

  // $scope.logout = function () {
  //   authService.logout().then(function () {
  //     authService.removeToken();

  //     $location.path("/home");
  //   });
  // };
});
