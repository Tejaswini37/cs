app.service("cartService", function(apiService){

this.getCart = function(){
    return apiService.get("/cart");
};


this.addToCart = function(product_id, quantity){

    var data = {
        product_id: product_id,
        quantity: quantity
    };

    return apiService.post("/cart/add", data);
};


this.updateCart = function(id, quantity){

    var data = {
        quantity: quantity
    };

    return apiService.put("/cart/" + id, data);
};

this.removeCart = function(id){
    return apiService.delete("/cart/" + id);
};

});