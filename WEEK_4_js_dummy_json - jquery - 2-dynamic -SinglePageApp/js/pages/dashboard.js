window.initPage = function (params) {

  // ==========================
  // 🔒 LOCAL STATE
  // ==========================
  let currentPage = 1;
  let limit = 8;
  let total = 0;
  let currentSearch = params?.search || "";

  // ==========================
  // 🚀 INIT
  // ==========================
  if (!isLoggedIn()) {
    navigate("login");
    return;
  }

  getUser();
  loadData(1);

  // ==========================
  // 👤 USER
  // ==========================
  function getUser() {
    const token = localStorage.getItem("token");

    $.ajax({
      url: "https://dummyjson.com/auth/me",
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      success: function (data) {
        $("#welcomeText").html(
          `<h2 class="text-light">Welcome ${data.firstName}</h2>`
        );
      }
    });
  }

  // ==========================
  // 📦 LOAD DATA
  // ==========================
  function loadData(page) {
    currentPage = page;

    let url = currentSearch
      ? `https://dummyjson.com/recipes/search?q=${currentSearch}&limit=${limit}&skip=${(page - 1) * limit}`
      : `https://dummyjson.com/recipes?limit=${limit}&skip=${(page - 1) * limit}`;

    $.get(url, function (data) {
      total = data.total;
      displayRecipes(data.recipes);
      renderPagination();
    });
  }

  // ==========================
  // 🍽️ DISPLAY
  // ==========================
  function displayRecipes(recipes) {
    if (!recipes.length) {
      $("#recipes").html("<h5 class='text-light'>No recipes found</h5>");
      return;
    }

    let html = "";

    recipes.forEach((r) => {
      html += `
        <div class="col-12 col-md-4 col-lg-3">
          <div class="recipe-card card h-100 shadow-sm"
               data-id="${r.id}" style="cursor:pointer">

            <img src="${r.image}" class="card-img-top"
                 style="height:200px; object-fit:cover"/>

            <div class="card-body">
              <h6>${r.name}</h6>
              <p>${r.cuisine}</p>
              <p>⭐ ${r.rating}</p>
            </div>
          </div>
        </div>
      `;
    });

    $("#recipes").html(html);
  }

  // ==========================
  // 📄 PAGINATION
  // ==========================
  function renderPagination() {
    const totalPages = Math.ceil(total / limit);

    let html = "";

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <button class="page-btn btn btn-light m-1"
                data-page="${i}">
          ${i}
        </button>
      `;
    }

    $("#pagination").html(html);
  }

  // ==========================
  // 🖱️ EVENTS (SAFE)
  // ==========================
  $(document)
    .off("click", ".recipe-card")
    .on("click", ".recipe-card", function () {
      navigate("recipe", { id: $(this).data("id") });
    });

  $(document)
    .off("click", ".page-btn")
    .on("click", ".page-btn", function () {
      loadData($(this).data("page"));
    });
};