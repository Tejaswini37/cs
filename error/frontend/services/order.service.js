app.service("orderService", function (apiService) {

    this.placeOrder = function () {
        return apiService.post("/orders/place");
    };

    this.getOrders = function () {
        return apiService.get("/orders");
    };

});