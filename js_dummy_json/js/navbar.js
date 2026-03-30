async function loadNavbar() {
  const res = await fetch("navbar.html");
  const data = await res.text();

  document.getElementById("navbar").innerHTML = data;
}

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

if (!isLoggedIn()) {
  location.replace("index.html");
}

function goDashboard() {
  location.href = "dashboard.html";
}

let debounceTimer;
// With debounce → wait until user pauses typing (if not too many api calls)
document.addEventListener("input", function (e) {
  if (e.target.id === "searchInput") {
    const query = e.target.value;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      //   if (query.length < 1) {
      //     document.getElementById("suggestionsBox").innerHTML = "";
      //     return;
      //   }

      fetchSuggestions(query);
    }, 300); // debounce
  }
});
async function fetchSuggestions(query) {
  try {
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);

    const data = await res.json();

    showSuggestions(data.recipes);
  } catch (error) {
    console.error(error);
  }
}
function showSuggestions(recipes) {
  const box = document.getElementById("suggestionsBox");

  if (!recipes.length) {
    box.innerHTML = "<div class='list-group-item'>No results</div>";
    return;
  }

  box.innerHTML = recipes
    .slice(0, 5) // limit suggestions
    .map(
      (r) => `
      <div class="list-group-item list-group-item-action d-flex align-items-center"
           style="cursor:pointer"
           onclick="goToRecipe(${r.id})">
           
        <img src="${r.image}" width="40" height="40" class="me-2 rounded"/>
        <span>${r.name}</span>
      </div>
    `,
    )
    .join("");
}
function goToRecipe(id) {
  window.location.href = `recipe.html?id=${id}`;
}
// outside click
document.addEventListener("click", function (e) {
  if (!e.target.closest("#searchInput")) {
    document.getElementById("suggestionsBox").innerHTML = "";
  }
});
document.addEventListener("keypress", function (e) {
  if (e.target.id === "searchInput" && e.key === "Enter") {
    searchRecipes();
  }
});

async function searchRecipes() {
  const query = document.getElementById("searchInput").value;

  if (!query.trim()) {
    alert("Enter something");
    return;
  }

  window.location.href = `dashboard.html?search=${query}`;
  // try {
  //     const res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
  //     const data = await res.json();
  //     const container = document.getElementById("recipes");
  //     container.innerHTML = displayRecipes(data.recipes);
  //     // displayRecipes(data.recipes);
  //   } catch (error) {
  //     console.error(error);
  //     alert("search failed");
  //   }
}
// function displayRecipes(data) {

//   return data
//     .map(
//       (r) => `
//       <div class="col-12 col-md-4 col-lg-3">
//         <div class="card h-100 shadow-sm" onclick=gotoRecipe(${r.id}) style="cursor:pointer">
//           <img src="${r.image}" class="card-img-top" style="height:200px; object-fit:cover;"/>
//           <div class="card-body d-flex flex-column">

//             <h5 class="card-title">${r.name}</h5>
//             <p>${r.cuisine}</p>
//             <p>⭐ ${r.rating}</p>
//           </div>
//         </div>
//       </div>

//     `,
//     )
//     .join("");
// }

function logout() {
  localStorage.removeItem("token");
  window.location.replace("index.html");
}

// cart related
function goToCart() {
  location.href = "cart.html";
}
