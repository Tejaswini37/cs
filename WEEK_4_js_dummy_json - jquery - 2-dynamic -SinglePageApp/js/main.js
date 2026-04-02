// ==========================
// 🌍 GLOBAL STATE
// ==========================
let currentPage = null;

// ==========================
// 🚀 LOAD PAGE
// ==========================
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

    // load corresponding JS
    loadPageScript(page, params);
  });
}

// ==========================
// 📜 LOAD PAGE SCRIPT
// ==========================
function loadPageScript(page, params) {

  // remove previous page script
  $(".page-script").remove();

  const script = document.createElement("script");
  script.src = `js/pages/${page}.js`;
  script.className = "page-script";

  script.onload = function () {
    if (typeof window.initPage === "function") {
      window.initPage(params);
    }
  };

  script.onerror = function () {
    console.error(`❌ Failed to load script: ${page}.js`);
  };

  document.body.appendChild(script);
}

// ==========================
// 🔁 NAVIGATION
// ==========================
function navigate(page, params = {}) {
  loadPage(page, params);
}
function loadNavbar() {
  $("#navbar").load("navbar.html", function () {
    if (typeof initNavbar === "function") {
      initNavbar();
    }
  });
}
// ==========================
// 🚀 APP START
// ==========================
$(document).ready(function () {

  
  // ✅ initial routing
  if (isLoggedIn()) {
    loadNavbar();
    loadPage("dashboard");
  } else {
    loadPage("login");
  }
});