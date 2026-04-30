function initNavbar() {
  $("#toggleBtn").on("click", function () {
    $("#navbarContent").toggleClass("show");
  });

  $("#brandBtn, #homeBtn").on("click", function (e) {
    // <a href="#">Home</a> generally this reloads(defualt behaviour) , breaks SPA , ->so prevent
    e.preventDefault();
    navigate("dashboard");
  });

  $("#cartBtn").on("click", function () {
    navigate("cart");
  });

  $("#logoutBtn").on("click", function () {
    logout();
    $("#navbar").html("");
    navigate("login");
  });

  $("#searchBtn").on("click", searchRecipes);

  $(document).on("keypress", "#searchInput", function (e) {
    if (e.key === "Enter") {
      searchRecipes();
    }
  });

  $("#searchInput").on(
    "input",
    debounce(function () {
      const query = $(this).val();

      if (!query) {
        $("#suggestionsBox").html("");
        return;
      }

      fetchSuggestions(query);
    }, 300),
  );

  // outside click
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

  $("#suggestionsBox").html("");

  navigate("dashboard", { search: query });
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
      (r) => `
        <div class="list-group-item list-group-item-action suggestion-item d-flex align-items-center"
             data-id="${r.id}" style="cursor:pointer">

          <img src="${r.image}" width="40" height="40"
               class="me-2 rounded"/>

          <span>${r.name}</span>

        </div>
      `,
    )
    .join("");

  $("#suggestionsBox").html(html);
}

$(document).on("click", ".suggestion-item", function () {
  const id = $(this).data("id");

  $("#suggestionsBox").html("");

  navigate("recipe", { id });
});

function debounce(func, delay) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
