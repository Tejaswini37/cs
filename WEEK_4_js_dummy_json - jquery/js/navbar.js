$(document).ready(function () {
  // protectDashboard();
  loadNavbar();
});
function loadNavbar() {
  $("#navbar").load("navbar.html", function () {
    navbarEvents();
  });
}

function navbarEvents() {
  $("#toggleBtn").on("click", function () {
    $("#navbarContent").toggleClass("show");
  });

  $("#homeBtn").on("click", function () {
    location.href = "dashboard.html";
  });
  $("#cartBtn").on("click", function () {
    location.href = "cart.html";
  });
  $("#logoutBtn").on("click", function () {
    localStorage.removeItem("token");
    location.replace("index.html");
  });
  // search btn
  $("#searchBtn").on("click", searchRecipes);

  // key search
  $(document).on("keypress", "#searchInput", function (e) {
    if (e.key === "Enter") {
      searchRecipes();
    }
  });

  // debounce input
  $("#searchInput").on(
    "input",
    debounce(function () {
      const query = $(this).val();
      if (query.length == 0) return;
      // if (query.length < 2) {
      //   $("#suggestionsBox").html("");
      //   return;
      // }
      fetchSuggestions(query);
    }, 300),
    // debounce(function (e) {
    //   const query = $(e.target).val(); //  no this needed
    //   fetchSuggestions(query);
    // }, 300),
  );

  // outside click-> close suggestions
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

function searchRecipes() {
  const query = $("#searchInput").val();
  if (!query) return alert("Enter something");
  location.href = `dashboard.html?search=${query}`;
}

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

function showSuggestions(recipes) {
  if (!recipes.length) {
    $("#suggestionsBox").html("<div class='list-group-item'>No results</div>");
    return;
  }
  const html = recipes
    .slice(0, 6)
    .map(
      (r) =>
        `
      <div class="list-group-item list-group-item-action suggestion-item d-flex align-items-center"
           data-id="${r.id}" style="cursor:pointer">

        <img src="${r.image}" width="40" height="40" class="me-2 rounded"/>
        <span>${r.name}</span>

      </div>
    `,
    )
    .join("");
  $("#suggestionsBox").html(html);
}

$(document).on("click", ".suggestion-item", function () {
  const id = $(this).data("id");
  location.href = `recipe.html?id=${id}`;
});

function debounce(func, delay) {
  let timer;
  return function (event) {
    clearTimeout(timer); // task id
    timer = setTimeout(() => {
      //func(event);  // this doesn't preserve this
      func.apply(this, arguments);
    }, delay);
  };
}
