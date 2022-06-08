app.controller('loginController', function ($scope, $rootScope, $http) {   
    $scope.email = 'admin@gmail.com';
    $scope.password = '123';

    $scope.login = () => {
        $http.get('https://60ae432680a61f0017332d65.mockapi.io/api/v1/users')
        .then(function(response) {
            const users = response.data;
            const check = users.filter(item => item.email == $scope.email 
                    && item.password == $scope.password)[0];
            if(check){
                // chuyển sang router sản phẩm
            } else {
                // hiện thông báo lỗi
            }
        });
    }

});