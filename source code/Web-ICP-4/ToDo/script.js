
var app = angular.module('toDoApp', ['ngSanitize']);
app.controller('toDoController', function($scope) {
    // Default ToDo List
    $scope.todoList = [{todoText:'Jquery', status:'Pending'},{todoText:'Javascript', status:'Pending'},
        {todoText:'AngularJs', status:'Pending'}];

    updateAddTotal();

    $scope.addItem = function() {
        $scope.todoList.push({todoText:$scope.newitem, status:'Pending'});
        $scope.newitem = "";
        $("#item").focus();
        updateAddTotal();
    };

    // Modifying Pending to Done
    $scope.changeToDone = function (event) {
      angular.element(event.target).parent().append("<span class='label success'>Done!</span>");
        angular.element(event.target).parent().attr("class", 'completed');
        angular.element(event.target).remove();
        updateRemoveTotal();
    };

    function updateAddTotal() {
        var completed = 0;
        var pending = 0;
        $scope.todoList.forEach(function (value) {
          if(value.status == 'Pending'){
              pending = pending+1;
          }else{
              completed = completed+1;
          }3
        });
        if (completed > 0 || pending > 0) {
            $scope.totalText = " Pending: " + pending + " Completed: " + completed;
        }else{
            $scope.totalText = " Pending: " + $scope.todoList.length + " Completed: " + completed;
        }
    };

    function updateRemoveTotal() {
        completed = $('.success').length;
        pending = $('.pending').length;
        if (completed > 0 || pending > 0) {
            $scope.totalText = " Pending: " + pending + " Completed: " + completed;
        }else{
            $scope.totalText = " Pending: " + $scope.todoList.length + " Completed: " + completed;
        }
    };

});
