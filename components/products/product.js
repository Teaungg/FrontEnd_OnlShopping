
app.controller('productController', function ($scope, $rootScope,
    $routeParams, $http) {
    $scope.products = [];
    $rootScope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.keyword = '';

    $scope.currentPage = 1;
    $scope.totalPerPage = 10;

    $scope.next = () => {
        if ($scope.currentPage < ($scope.products.length / $scope.totalPerPage)) {
            $scope.currentPage++;
        }
    }

    $scope.previous = () => {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
        }
    }

    $scope.getProductsForPage = () => {
        console.log($scope.products);
        return $scope.products.slice(
            ($scope.currentPage - 1) * $scope.totalPerPage, 
            $scope.totalPerPage * $scope.currentPage);
    }

    /**
     * pagination: client <---- hạn chế
     * server: skip take <------ hạn chế
     * database: <---- nhanh nhất
     */

    // dùng http service
    $http.get('https://623ede7ae8fbc4f1627292be.mockapi.io/productASM')
    .then(function (response) {
        $scope.products = response.data;
    });
    

    $scope.deleteProduct = function (id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $http({
                        url: `https://623ede7ae8fbc4f1627292be.mockapi.io/productASM/${id}`,
                        method: "DELETE",
                    })
                        .then(function (response) {
                            // chuyen sang man hinh danh sach                
                            $scope.products = $scope.products.filter(item => item.id != id);
                        },
                            function (response) {
                            });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }
    
    $scope.addToCart = (product, quantity = 1) => {
        const item = $rootScope.cart.filter(item => item.product.id == product.id)[0];
        if (item) {
            $rootScope.cart = $rootScope.cart.map(item => {
                if (item.product.id == product.id) {
                    item.quantity += quantity
                }
                return item;
            })
        } else {
            $rootScope.cart = [...$rootScope.cart, { product, quantity, checked: false }]
        }
        localStorage.setItem('cart', JSON.stringify($rootScope.cart));
    }
});


app.controller('productFormController', function ($scope, $rootScope, $location,
    $routeParams, $http) {
    $scope.productId = $routeParams.productId;
    $scope.product = {
        name: '', price: 0, quantity: 0, description: ''
    };
    if ($scope.productId) {
        $http.get(`https://623ede7ae8fbc4f1627292be.mockapi.io/productASM/${$scope.productId}`)
            .then(function (response) {
                $scope.product = response.data;
            });
    }
    $scope.addToCart = (product, quantity = 1) => {
        const item = $rootScope.cart.filter(item => item.product.id == product.id)[0];
        if (item) {
            $rootScope.cart = $rootScope.cart.map(item => {
                if (item.product.id == product.id) {
                    item.quantity += quantity
                }
                return item;
            })
        } else {
            $rootScope.cart = [...$rootScope.cart, { product, quantity, checked: false }]
        }
        localStorage.setItem('cart', JSON.stringify($rootScope.cart));
    }
    $scope.submitForm = function () {
        const { id, name, price, quantity, description } = $scope.product;
        const image = document.getElementById('image-url').value;
        if ($scope.productId) {
            $http({
                url: `https://623ede7ae8fbc4f1627292be.mockapi.io/productASM/${id}`,
                method: "PUT",
                data: { name, price, quantity, description, image }
            })
                .then(function (response) {
                    // chuyen sang man hinh danh sach
                    window.location.href = '/index.html#!/';

                },
                    function (response) {
                    });
        } else {
            $http({
                url: `https://623ede7ae8fbc4f1627292be.mockapi.io/productASM`,
                method: "POST",
                data: { name, price, quantity, description, image }
            })
                .then(function (response) {
                    // chuyen sang man hinh danh sach
                    window.location.href = '/index.html#!/';

                },
                    function (response) {
                    });
        }

    }
});
// $location


const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

