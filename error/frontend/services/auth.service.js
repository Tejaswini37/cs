app.service("authService", function (apiService) {
  this.register = function (data) {
    return apiService.post("/register", data);
  };

  this.login = function (data) {
    return apiService.post("/login", data);
  };

  this.logout = function () {
    return apiService.post("/logout");
  };

  this.getToken = function () {
    return localStorage.getItem("token");
  };

  this.setToken = function (token) {
    localStorage.setItem("token", token);
  };

  this.removeToken = function () {
    localStorage.removeItem("token");
  };

  this.isLoggedIn = function () {
    return localStorage.getItem("token") != null;
  };
});
