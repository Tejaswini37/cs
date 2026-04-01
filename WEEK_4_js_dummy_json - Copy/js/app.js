$(document).ready(function () {
  redirectIfLoggedIn();

  $("#loginBtn").click(function () {
    // $(document).on("click", "#loginBtn", function(){
    const username = $("#username").val();
    const password = $("#password").val();

    if (
      validate(username, 3, 20, "username") &&
      validate(password, 3, 20, "password")
    ) {
      authenticate(username, password);
    }
  });

  function validate(value, min, max, field) {
    const error = $(`#${field}Error`);
    error.text("");

    if (value.length < min) {
      error.text(`${field} must be at least ${min} characters`);
      return false;
    }

    if (value.length > max) {
      error.text(`${field} must be less than ${max} characters`);
      return false;
    }

    return true;
  }

  function authenticate(username, password) {
    $.ajax({
      url: "https://dummyjson.com/auth/login",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ username, password }),
      success: function (data) {
        alert("login successful");
        localStorage.setItem("token", data.accessToken);
        location.replace("dashboard.html");
      },
      error: function (err) {
        alert(err.responseJSON?.message || "Error Occurred");
        console.log(err.responseJSON);
      },
    });
  }
});
