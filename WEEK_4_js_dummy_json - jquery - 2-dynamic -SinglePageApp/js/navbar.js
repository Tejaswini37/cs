function initNavbar() {

  // =========================
  // 📱 TOGGLE
  // =========================
  $("#toggleBtn").on("click", function () {
    $("#navbarContent").toggleClass("show");
  });

  // =========================
  // 🏠 NAVIGATION
  // =========================
  $("#brandBtn, #homeBtn").on("click", function (e) {
    e.preventDefault();
    navigate("dashboard");
  });

  $("#cartBtn").on("click", function () {
    navigate("cart");
  });

  $("#logoutBtn").on("click", function () {
    logout();
    navigate("login");
  });

  // =========================
  // 🔍 SEARCH
  // =========================
  $("#searchBtn").on("click", searchRecipes);

  $(document).on("keypress", "#searchInput", function (e) {
    if (e.key === "Enter") {
      searchRecipes();
    }
  });

  // =========================
  // ⚡ DEBOUNCE SEARCH
  // =========================
  $("#searchInput").on(
    "input",
    debounce(function () {
      const query = $(this).val().trim();

      if (!query) {
        $("#suggestionsBox").html("");
        return;
      }

      fetchSuggestions(query);
    }, 300)
  );

  // =========================
  // ❌ CLOSE SUGGESTIONS
  // =========================
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest("#searchInput").length &&
      !$(e.target).closest("#suggestionsBox").length &&
      !$(e.target).closest(".navbar-toggler").length
    ) {
      $("#suggestionsBox").html("");
    }
  });
}

// =========================
// 🔍 SEARCH ACTION
// =========================
function searchRecipes() {
  const query = $("#searchInput").val().trim();

  if (!query) return alert("Enter something");

  $("#suggestionsBox").html("");

  navigate("dashboard", { search: query });
}

// =========================
// 📡 FETCH SUGGESTIONS
// =========================
function fetchSuggestions(query) {
  $.ajax({
    url: `https://dummyjson.com/recipes/search?q=${query}`,
    method: "GET",

    success: function (data) {
      showSuggestions(data.recipes);
    },

    error: function () {
      console.log("Suggestion fetch failed");
    },
  });
}

// =========================
// 📋 SHOW SUGGESTIONS
// =========================
function showSuggestions(recipes) {
  if (!recipes.length) {
    $("#suggestionsBox").html(
      "<div class='list-group-item'>No results</div>"
    );
    return;
  }

  const html = recipes
    .slice(0, 6)
    .map(
      (r) => `
        <div class="list-group-item list-group-item-action suggestion-item d-flex align-items-center"
             data-id="${r.id}" style="cursor:pointer">

          <img src="${r.image}" width="40" height="40"
               class="me-2 rounded"/>

          <span>${r.name}</span>

        </div>
      `
    )
    .join("");

  $("#suggestionsBox").html(html);
}

// =========================
// 🖱️ SUGGESTION CLICK
// =========================
$(document).on("click", ".suggestion-item", function () {
  const id = $(this).data("id");

  $("#suggestionsBox").html("");

  navigate("recipe", { id });
});

// =========================
// ⏱️ DEBOUNCE
// =========================
function debounce(func, delay) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}