// protectDashboard();
// getUser();
let currentPage = 1;
let limit = 8; // items per page
let total = 0;
async function getUser() {
  const token = localStorage.getItem("token");
  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  document.getElementById("welcomeText").innerHTML =
    `Welcome ${data.firstName}`;
}
// async function getRecipes() {
//   const res = await fetch("https://dummyjson.com/recipes");
//   const data = await res.json();

//   const container = document.getElementById("recipes");

//   container.innerHTML = displayRecipes(data.recipes);
// }

function getSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search");
}

// async function loadInitialData() {
//     // loadNavbar();
//   const query = getSearchQuery();
//   // console.log(query);
//   const container = document.getElementById("recipes");
//   let data;
//   if (query) {
//     // console.log(query);
//     const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
//     data = await res.json();
//   } else {
//     const res = await fetch("https://dummyjson.com/recipes");
//     data = await res.json();
//   }

//   container.innerHTML = displayRecipes(data.recipes);
// }
// loadNavbar();
loadInitialData(1);

function gotoRecipe(id) {
  location.href = `recipe.html?id=${id}`;
}

function displayRecipes(data) {
  return data
    .map(
      (r) => `
      <div class="col-12 col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm rounded-4" onclick=gotoRecipe(${r.id}) style="cursor:pointer">
          <img src="${r.image}" class="card-img-top rounded-top-4" style="height:180px; object-fit:cover;"/>
          <div class="card-body rounded-bottom-4 d-flex flex-column" style="background-color:rgb(206, 196, 181,0.25)">
        
            <h5 class="card-title fw-bold mb-1">${r.name}</h5>
            <p class="fw-semibold mb-1">${r.cuisine}</p>
            <p class="fw-semibold mb-1">⭐ ${r.rating}</p>
          </div>
        </div>
      </div>
      
    `,
    )
    .join("");
}
async function loadInitialData(page = 1) {
  currentPage = page;

  const query = getSearchQuery();
  const container = document.getElementById("recipes");

  let url;

  if (query) {
    url = `https://dummyjson.com/recipes/search?q=${query}&limit=${limit}&skip=${(page - 1) * limit}`;
  } else {
    url = `https://dummyjson.com/recipes?limit=${limit}&skip=${(page - 1) * limit}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  total = data.total;

  container.innerHTML = displayRecipes(data.recipes);

  renderPagination();
}

function renderPagination() {
  const container = document.getElementById("pagination");

  const totalPages = Math.ceil(total / limit);

  let buttons = "";

  // Previous
  buttons += `
    <button class="btn btn-secondary me-2" 
      ${currentPage === 1 ? "disabled" : ""} 
      onclick="loadInitialData(${currentPage - 1})">
      Prev
    </button>
  `;

  // Page numbers (optional: limit to few pages)
  for (let i = 1; i <= totalPages; i++) {
    buttons += `
      <button class="btn ${i === currentPage ? "btn-primary" : "btn-outline-primary"} me-2"
        onclick="loadInitialData(${i})">
        ${i}
      </button>
    `;
  }

  // Next
  buttons += `
    <button class="btn btn-secondary ms-2" 
      ${currentPage === totalPages ? "disabled" : ""} 
      onclick="loadInitialData(${currentPage + 1})">
      Next
    </button>
  `;

  container.innerHTML = buttons;
}
