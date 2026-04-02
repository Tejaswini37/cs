// ==========================
// 🚀 PAGE INIT
// ==========================
window.initPage = function () {

  // protect route
  if (!isLoggedIn()) {
    navigate("login");
    return;
  }

  loadCart();
};

// ==========================
// 🛒 LOAD CART
// ==========================
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    $("#cartItems").html(
      "<h5 class='text-center text-light'>Cart is empty</h5>"
    );
    return;
  }

  // create array of API calls
  const requests = cart.map((id) => {
    return $.ajax({
      url: `https://dummyjson.com/recipes/${id}`,
      method: "GET",
    });
  });

  // wait for all
  Promise.all(requests)
    .then((results) => {
      let html = "";

      results.forEach((r) => {
        html += `
          <div class="col-12 col-md-4 col-lg-3 mb-4">

            <div class="recipe-card card h-100 shadow-sm rounded-4"
                 data-id="${r.id}" style="cursor:pointer">

              <img src="${r.image}" class="card-img-top rounded-top-4"
                   style="height:200px; object-fit:cover;" />

              <div class="card-body d-flex flex-column"
                   style="background-color:rgba(206,196,181,0.25)">

                <h5 class="fw-bold mb-1">${r.name}</h5>
                <p class="mb-1">${r.cuisine}</p>
                <p class="mb-1">⭐ ${r.rating}</p>

                <button class="btn btn-danger mt-auto removeBtn"
                        data-id="${r.id}">
                  Remove
                </button>

              </div>
            </div>

          </div>
        `;
      });

      $("#cartItems").html(html);
    })
    .catch((err) => {
      console.log("Error loading cart", err);

      $("#cartItems").html(
        "<p class='text-danger text-center'>Failed to load cart</p>"
      );
    });
}

// ==========================
// 🖱️ EVENTS
// ==========================

// open recipe
$(document).on("click", ".recipe-card", function () {
  const id = $(this).data("id");
  navigate("recipe", { id });
});

// remove item
$(document).on("click", ".removeBtn", function (e) {
  e.stopPropagation();

  const id = $(this).data("id");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((i) => i !== id);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
});