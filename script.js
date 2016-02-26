var app = angular.module('Todo', []);

app.controller('TodoCtrl', function($scope, $http) {

  var apiURL = "https://turing-birdie.herokuapp.com/api/v1/posts.json";

  function Note(id, description){
    this.id = id
    this.description = description
  }

  $http.get(apiURL).success(function(response) {
    $scope.todos = response.map(function(note) {
      return new Note(note.id, note.description)
    });;
  });
  $scope.done = function(todo) {


    var deleteURL = "https://turing-birdie.herokuapp.com/api/v1/posts/";
    var full_delete_url = deleteURL + todo.id + ".json"
    $http.delete(full_delete_url).then(function(response) {
              var indexOf = $scope.todos.indexOf(todo);
    if (indexOf !== -1) {
      $scope.todos.splice(indexOf, 1);
    }
          },

          function(error) {
            console.log(error)
          })

  };

  $scope.add = function(e) {
    if (e.which && e.which === 13) {
      var description = $scope.newTodo

      var postParams = {
        post: {
          description: description
        }
      }

      $http.post(apiURL, postParams)
        .then(function(response) {

          var newNote = new Note(response.data.id, description)
          $scope.todos.push(newNote);
            console.log(response, $scope.newTodo)
          },

          function(error) {
            console.log(error)
          })


      $scope.newTodo = '';
    }
  };
});
