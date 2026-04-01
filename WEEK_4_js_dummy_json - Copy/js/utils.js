function isLoggedIn() {
  return !!localStorage.getItem("token");
}

function protectDashboard() {
  if (!isLoggedIn()) {
    location.replace("index.html");
  }
}

function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    location.replace("dashboard.html");
  }
}