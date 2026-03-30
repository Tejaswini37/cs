app.service("adminService", function(apiService){

// ------------------- CATEGORY -------------------

// Get categories
this.getCategories = function(){
return apiService.get("/admin/categories");
}

// Create category
this.createCategory = function(data){
return apiService.post("/admin/categories",data);
}

// Update category
this.updateCategory = function(id,data){
return apiService.put("/admin/categories/"+id,data);
}

// Delete category
this.deleteCategory = function(id){
return apiService.delete("/admin/categories/"+id);
}


// ------------------- PRODUCTS -------------------
this.getProducts = function(){
return apiService.get("/admin/products");
}
// Create product
this.createProduct = function(data){
return apiService.post("/admin/products",data);
}

// Update product
this.updateProduct = function(id,data){
return apiService.put("/admin/products/"+id,data);
}

// Delete product
this.deleteProduct = function(id){
return apiService.delete("/admin/products/"+id);
}

});