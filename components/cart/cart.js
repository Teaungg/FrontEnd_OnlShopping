
app.controller('cartController', function ($scope, $rootScope,
    $routeParams, $http) {
    $rootScope.cart = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.numberPattern = /^\d+$/;

    $scope.deleteItem = (id) => {
        let confirmDelete = confirm('Are you sure')
        if (confirmDelete) {
            $rootScope.cart = $rootScope.cart.filter(item => item.product.id != id);
            localStorage.setItem('cart', JSON.stringify($rootScope.cart));
            swal("Delete Successfully");
        } 
    }

    $scope.getTotal = () => {
        let total = 0;
        total = $rootScope.cart.reduce(
            (previous, current) => {
                if (current.checked == true) {
                    previous += current.product.price * current.quantity
                }
                return previous
            },
            total
        )
        return total;
    }

    $scope.updateCart = () => {
        $rootScope.cart = $rootScope.cart.map(item => {
            if (item.quantity > 10) {
                item.quantity = 10;
            }
            if (item.quantity < 0) {
                item.quantity = 0
            }
            return item;
        })
        localStorage.setItem('cart', JSON.stringify($rootScope.cart));
    }

    $scope.getSelectedItems = () => {
        return $rootScope.cart.filter(item => item.checked == true);
    }

    $scope.oneCart = {
        name: '',
        address: '',
        total: $scope.getTotal(),
        products: $scope.getSelectedItems(),
        createdAt: new Date()
    }

    $scope.checkout = () => {
        $scope.oneCart.createdAt = new Date();
        $http({
            url: `https://623ede7ae8fbc4f1627292be.mockapi.io/cart`,
            method: "POST",
            data: $scope.oneCart
        })
        .then(function (response) {
            // chuyen sang man hinh danh sach
            $rootScope.cart = $rootScope.cart.filter(item => item.checked == false);
            localStorage.setItem('cart', JSON.stringify($rootScope.cart));
            window.location.href = '/index.html#!/';
            alert('thanh toán thành công')
        },
        function (response) {
        });
    }
});

app.filter('formatVND', function () {
    return function (value) {
        // tự viết
        return new Intl.NumberFormat().format(value) + ' đ'
    }
})

app.directive('numberOnly', function () {
    return {
        link: function (scope, element, attr) {
            var rex = RegExp(attr.numberOnly);
            var except = /Backspace|Enter/
            element[0].addEventListener('keydown', function (event) {
                if (!except.test(event.key) && !rex.test(event.key)) {
                    event.preventDefault();
                }
            })
        }
    }
})