pages.login = function () {
  // already logged in → go dashboard
  if (isLoggedIn()) {
    navigate("dashboard");
    return;
  }

  // login click
  $("#loginBtn").on("click", handleLogin);
};

function handleLogin() {
  const username = $("#username").val();
  const password = $("#password").val();

  // validation
  const isValid =
    validate(username, 3, 20, "username") &&
    validate(password, 3, 20, "password");

  if (!isValid) return;

  authenticate(username, password);
}

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
  $("#loginError").text("");

  $.ajax({
    url: "https://dummyjson.com/auth/login",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ username, password }),

    success: function (data) {
      localStorage.setItem("token", data.accessToken);
      loadNavbar();
      // SPA navigation 
      navigate("dashboard");
    },

    error: function (err) {
      const msg = err.responseJSON?.message || "Login failed";
      $("#loginError").text(msg);
    },
  });
}
