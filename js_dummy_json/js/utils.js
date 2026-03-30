// function isLoggedIn() {
//   return !!localStorage.getItem("token");
// }

function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    location.replace("dashboard.html");
  }
}

function protectDashboard() {
  if (!isLoggedIn()) {
    location.replace("index.html");
  }
}


