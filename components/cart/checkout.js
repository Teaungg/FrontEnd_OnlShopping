app.controller('cartController', function ($scope, $rootScope,
    $routeParams, $http){
        $scope.payment = () => {
            let confirmPayment = confirm('Are you sure')
            if (confirmPayment) {
                $rootScope.cart = $rootScope.cart.filter(item => item.product.id != id);
                localStorage.setItem('cart', JSON.stringify($rootScope.cart));
                swal("Payment Successfully");
            } 
        }
    });

    $scope.checkout = () => {
        $scope.oneCart.createdAt = new Date();
        $http({
            url: `https://60ae432680a61f0017332d65.mockapi.io/api/v1/carts`,
            method: "POST",
            data: $scope.oneCart
        })
        .then(function (response) {
            // chuyen sang man hinh danh sach
            $rootScope.cart = $rootScope.cart.filter(item => item.checked == false);
            localStorage.setItem('cart', JSON.stringify($rootScope.cart));
            window.location.href = '/index.html#!/';
            alert('Thanh toán thành công!!')
        },
        function (response) {
        });
    }


