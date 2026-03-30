app.service("apiService", function ($http) {

    var API_BASE = "http://localhost:8000/api";

    function getHeaders() {
        var token = localStorage.getItem("token");

        if (token) {
            return {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            };
        }

        return {
            "Content-Type": "application/json"
        };
    }

    this.get = function (url) {
        return $http({
            method: "GET",
            url: API_BASE + url,
            headers: getHeaders()
        });
    };

    // POST request
    this.post = function (url, data) {
        return $http({
            method: "POST",
            url: API_BASE + url,
            data: data,
            headers: getHeaders()
        });
    };

    // PUT request
    this.put = function (url, data) {
        return $http({
            method: "PUT",
            url: API_BASE + url,
            data: data,
            headers: getHeaders()
        });
    };

    // DELETE request
    this.delete = function (url) {
        return $http({
            method: "DELETE",
            url: API_BASE + url,
            headers: getHeaders()
        });
    };

});