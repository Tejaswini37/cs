function isLoggedIn() {
  return !!localStorage.getItem("token");
}

// logout
function logout() {
  localStorage.removeItem("token");
  // localStorage.removeItem("cart");
}

// get cart
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// save cart
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// add item
function addToCart(id) {
  let cart = getCart();

  if (!cart.includes(id)) {
    cart.push(id);
    setCart(cart);
    return { success: true, message: "Added to cart" };
  }

  return { success: false, message: "Already in cart" };
}

// remove item
function removeFromCart(id) {
  let cart = getCart();

  cart = cart.filter((item) => item !== id);
  setCart(cart);
}

// safe param getter
function getParam(params, key, defaultValue = "") {
  return params && params[key] ? params[key] : defaultValue;
}

// simple loader
function showLoader() {
  $("#app").html(`
    <div class="text-center mt-5 text-light">
      <h5>Loading...</h5>
    </div>
  `);
}

// error message
function showError(message = "Something went wrong") {
  $("#app").html(`
    <div class="text-center mt-5 text-danger">
      <h5>${message}</h5>
    </div>
  `);
}
