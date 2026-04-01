let currentPage = 1;
let limit = 8;
let total = 0;
function getUser() {
  const token = localStorage.getItem("token");

  $.ajax({
    url: "https://dummyjson.com/auth/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (data) {
      $("#welcomeText").html(
        `<h2 class="text-light">Welcome ${data.firstName}</h2>`,
      );
    },
    error: function () {
      console.log("User fetch failed");
    },
  });
}

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search");
}

function loadData(page) {
  const search = getParams();

  currentPage = page;

  let url;

  if (search) {
    url = `https://dummyjson.com/recipes/search?q=${search}&limit=${limit}&skip=${(page - 1) * limit}`;
  } else {
    url = `https://dummyjson.com/recipes?limit=${limit}&skip=${(page - 1) * limit}`;
  }

  $.ajax({
    url: url,
    method: "GET",
    success: function (data) {
      total = data.total;
      displayRecipes(data.recipes);
      renderPagination();
      // window.scrollTo({ top: 0, behavior: "smooth" });
    },
    error: function () {
      console.log("Error loading recipes");
    },
  });
}

function displayRecipes(recipes) {
  if (!recipes.length) {
    $("#recipes").html(`<h5 class="text-center">No recipes found</h5>`);
    return;
  }

  let html = "";

  recipes.forEach((r) => {
    html += `
      <div class="col-12 col-md-4 col-lg-3 mb-4">
        <div class="recipe-card card h-100 shadow-sm rounded-4" data-id="${r.id}" style="cursor:pointer">
          <img src="${r.image}" class="card-img-top rounded-top-4" style="height:200px; object-fit:cover;" />
          <div class="card-body rounded-bottom-4 d-flex flex-column" style="background-color:rgb(206, 196, 181,0.25)">
            <h5 class="card-title fw-bold mb-1">${r.name}</h5>
            <p class="fw-semibold mb-1">${r.cuisine}</p>
            <p class="fw-semibold mb-1">⭐ ${r.rating}</p>
          </div>
        </div>
      </div>
    `;
  });

  $("#recipes").html(html);
}

function renderPagination() {
  const totalPages = Math.ceil(total / limit);

  let html = "";

  html += `
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center align-items-center">

      <!-- Prev -->
      <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
        <button class="page-link page-btn" data-page="${currentPage - 1}">
          &laquo;
        </button>
      </li>
`;

  // Page Numbers
  for (let i = 1; i <= totalPages; i++) {
    html += `
    <li class="page-item ${i === currentPage ? "active" : ""}">
      <button class="page-link page-btn" data-page="${i}">
        ${i}
      </button>
    </li>
  `;
  }

  // Next
  html += `
      <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
        <button class="page-link page-btn" data-page="${currentPage + 1}">
          &raquo;
        </button>
      </li>

    </ul>
  </nav>
`;

  $("#pagination").html(html);
}

$(document).ready(function () {
  protectDashboard();
  getUser();
  loadData(1);
  loadNavbar();

  $(document).on("click", ".recipe-card", function () {
    const id = $(this).data("id");
    location.href = `recipe.html?id=${id}`;
  });

  $(document).on("click", ".page-btn", function () {
    const page = $(this).data("page");
    loadData(page);
  });
});
