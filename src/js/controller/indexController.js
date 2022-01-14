var app = angular.module('indexHeader', [])
    app.controller('indexHeaderController', function($scope) {
        $scope.login = 0
        $scope.firstName = "Heesu"
        $scope.lastName = "Kim"

        $scope.registerEmailInput = ""
        $scope.registerPasswordInput = ""
        $scope.registerPasswordAgainInput = ""

        $scope.clickRegister = function($email, $pwd, $pwdAgain) {
            if ($email === undefined) {
                alert("Your email is invalid, please follow the email format.")
                return 0;
            } else if ($pwd !== $pwdAgain) {
                alert("Your passwords aren't matching.")
                return 0;
            } else {
                // use Angular Modal popup
            }

            

        }
})
