
let currentPage = null;
const pages = {};

function loadPage(page, params = {}) {
  currentPage = page;

  // loader
  $("#app").html(`
    <div class="text-center mt-5 text-light">
      <h5>Loading...</h5>
    </div>
  `);

  // load HTML
  $("#app").load(`pages/${page}.html`, function (response, status) {

  if (status === "error") {
    $("#app").html("<h4 class='text-danger'>Page not found</h4>");
    return;
  }

  if (pages[page]) {
    pages[page](params);
  }
});
}

function navigate(page, params = {}) {
  // window.location.hash = page;
  loadPage(page, params);
}
function loadNavbar() {
  $("#navbar").load("navbar.html", function () {
    if (typeof initNavbar === "function") {
      initNavbar();
    }
  });
}

$(document).ready(function () {

  if (isLoggedIn()) {
    loadNavbar();
    loadPage("dashboard");
  } else {
    loadPage("login");
  }
});