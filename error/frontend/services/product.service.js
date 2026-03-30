app.service("productService", function (apiService) {
  // Get all products
  this.getProducts = function (search) {
    if (search) {
      return apiService.get("/products?search=" + search);
    }

    return apiService.get("/products");
  };

  // Get single product
  this.getProduct = function (id) {
    return apiService.get("/products/" + id);
  };
});
