var app = angular.module('index', [])
    app.controller('indexController', function($scope) {
        // loginStatus, 0: logged in. 1: not logged in.
        $scope.loginStatus = 0
        $scope.firstName = "Heesu"
        $scope.lastName = "Kim"

        $scope.clickLoginBtn = function() {
            document.location.href = 'http://localhost:3000/login'
        }
})
