angular.module('todoController', [])
   
    .controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) { // ładuje todos servis
        $scope.formData = {}; // czyści input
        $scope.loading = true; // wyświetla ikonkę ładowania
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
                $scope.loading = false;
            });


        $scope.createTodo = function() {
            $scope.loading = true;
            if ($scope.formData.text != undefined) {
                Todos.create($scope.formData)
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; 
                        $scope.todos = data; 
                    });
            }
        };

        $scope.deleteTodo = function(id) {
            $scope.loading = true;
            Todos.delete(id)
                .success(function(data) {
                    $scope.loading = false;
                    $scope.todos = data; 
                });
        };
    }]);