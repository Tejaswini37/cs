
pages.recipe = function (params) {

  // protect route
  if (!isLoggedIn()) {
    navigate("login");
    return;
  }

  const id = params?.id;

  if (!id) {
    $("#recipeDetails").html(
      "<p class='text-danger'>Invalid recipe</p>"
    );
    return;
  }

  getRecipeDetails(id);
};

function getRecipeDetails(id) {
  $("#recipeDetails").html(
    "<p class='text-light text-center'>Loading...</p>"
  );

  $.ajax({
    url: `https://dummyjson.com/recipes/${id}`,
    method: "GET",

    success: function (data) {
      displayRecipe(data);
    },

    error: function () {
      $("#recipeDetails").html(
        "<p class='text-danger text-center'>Failed to load recipe</p>"
      );
    },
  });
}

function displayRecipe(recipe) {
  let html = `
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10">

        <div class="card p-3 p-md-4 mb-4 shadow-sm"
             style="background-color:rgba(206,196,181,0.75);">

          <div class="row">

            <!-- Image -->
            <div class="col-12 col-md-5 text-center mb-3">
              <img src="${recipe.image}" class="img-fluid rounded w-100" />
            </div>

            <!-- Details -->
            <div class="col-12 col-md-7">

              <h2 class="mb-3">${recipe.name}</h2>

              <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
              <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
              <p><strong>Calories:</strong> ${recipe.caloriesPerServing}</p>
              <p><strong>Rating:</strong> ⭐ ${recipe.rating}</p>
              <p><strong>Reviews:</strong> ${recipe.reviewCount}</p>

              <button class="btn btn-success mt-4 w-100 addcart-btn"
                      data-id="${recipe.id}">
                Add to Cart
              </button>

            </div>
          </div>

          <!-- Ingredients -->
          <div class="mt-3">
            <h4>Ingredients</h4>
            <ul class="list-group">
              ${recipe.ingredients.map(i => `
                <li class="list-group-item"
                    style="background-color:rgba(206,196,181,0.75);">
                  ${i}
                </li>
              `).join("")}
            </ul>
          </div>

          <!-- Instructions -->
          <div class="mt-4">
            <h4>Instructions</h4>
            <ol class="list-group list-group-numbered">
              ${recipe.instructions.map(i => `
                <li class="list-group-item"
                    style="background-color:rgba(206,196,181,0.75);">
                  ${i}
                </li>
              `).join("")}
            </ol>
          </div>

        </div>
      </div>
    </div>
  `;

  $("#recipeDetails").html(html);
}

$(document).on("click", ".addcart-btn", function () {
  const id = $(this).data("id");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire('Added to cart', '', 'success');
  } else {
    Swal.fire('Already in cart', '', 'warning');
  }
});