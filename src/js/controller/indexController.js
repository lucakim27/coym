var app = angular.module('index', [])
    app.controller('indexController', function($scope) {
        // loginStatus, 0: logged in. 1: not logged in.
        $scope.loginStatus = 0
        $scope.firstName = "Heesu"
        $scope.lastName = "Kim"

        $scope.clickRegister = function($id, $pwd, $pwdAgain) {

            console.log($id, $pwd, $pwdAgain)

            if ($id === undefined || $pwd === undefined || $pwdAgain === undefined) {
                alert("Please fill in the blanks.")
            } else if ($id.length < 5 || $pwd.length < 5 || $pwdAgain.length < 5) {
                alert("The length of ID or Password should be at least more than 5 characters.")
            } else if ($pwd !== $pwdAgain) {
                alert("Your passwords aren't matching.")
            } else {
                alert("Your account has just registered.")
                document.location.href = 'http://localhost:3000/login'
            }
        }

        $scope.clickLoginBtn = function() {
            document.location.href = 'http://localhost:3000/login'
        }
        
})
