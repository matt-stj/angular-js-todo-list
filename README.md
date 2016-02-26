# angular-js-todo-list

This is an example app that links an Angular.js ToDo list to a JSON API.  

The first portion of this app was coded from a tutorial [here](http://medialoot.com/blog/angularjs-for-absolute-beginners/).  And then we took the tutorial one step further so users could post and delete items to a database.

We'll be using Turing's [Birdie API Endpoints](https://turing-birdie.herokuapp.com/) to access a remote database so our todo items will persist beyond Angular's temporary, client-side data storage.


## Next Steps Beyond the [MediaLoot Tutorial](http://medialoot.com/blog/angularjs-for-absolute-beginners/)

Use a JavaScript constructor to build JS objects that will store note's properties.

```  
function Note(id, description){
    this.id = id
    this.description = description
  } 
  ```
  
  
Fetch notes/todo items from the birdie app endpoints so we don't have to use hardcoded examples.
([Docs for Angular http functions](https://docs.angularjs.org/api/ng/service/$http))

```
var apiURL = "https://turing-birdie.herokuapp.com/api/v1/posts.json";
  
$http.get(apiURL).success(function(response) {
    $scope.todos = response.map(function(note) {
      return new Note(note.id, note.description)
    });;
  });
  ```
  
Adding new notes to the todo list & posting to the birdie api.

```
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
```

Notice: If the `$http.post` is successful, then we will also update the `$scope.todos` array to display that new note on the page without refreshing.  That's where this code comes into play:

```
.then(function(response) {
   var newNote = new Note(response.data.id, description)
   $scope.todos.push(newNote);
  }
```

If you've got that down, feel free to try deleting a note from the list.  You can always check your code with the example here.

Feel free to try it locally in your browser:
- `git clone` this repo.
- open the `index.html`.
