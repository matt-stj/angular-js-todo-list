# angular-js-todo-list

This is an example app that links an Angular.js ToDo list to a JSON API.  

The first portion of this app was coded from a tutorial [here](http://medialoot.com/blog/angularjs-for-absolute-beginners/).  And then we took the tutorial one step further so users could post and delete items to a database.

We'll be using Turing's [Birdie API Endpoints](https://turing-birdie.herokuapp.com/) to access a remote database so our todo items will persist beyond Angular's temporary, client-side data storage.


## Next Steps Beyond the [MediaLoot Tutorial](http://medialoot.com/blog/angularjs-for-absolute-beginners/)

Use a JavaScript constructor to build JS objects that will store a note's properties.

```  
function Note(id, description){
    this.id = id
    this.description = description
  } 
  ```
  
  
Fetch notes/todo items from the birdie app endpoints so we don't have to use hardcoded examples.  Let's go ahead and replace the $scopes.todo array with the code below.
([Docs for Angular http functions](https://docs.angularjs.org/api/ng/service/$http))

```
var apiURL = "https://turing-birdie.herokuapp.com/api/v1/posts.json";
  
$http.get(apiURL).success(function(response) {
    $scope.todos = response.map(function(note) {
      return new Note(note.id, note.description)
    });;
  });
  ```
  
Post to the Birdie API endpoint when adding new notes.

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

Notice: We want to make sure that we're only updating the template if the `$http.post` is successful. In the code, you'll see that If the API returns a successful request, then we will also update `$scope.todos` by pushing the newly created note into  the array.  When the new note enters the array, the page without update without refreshing.  

(This is the code we're talking about):

```
.then(function(response) {
   var newNote = new Note(response.data.id, description)
   $scope.todos.push(newNote);
  }
```

If you're feeling good about posting notes to the API, try updating the `$scope.done` function with `$http.delete()`.

Feel free to try it locally in your browser or use the working example as a cheat sheet.
- `git clone` this repo.
- open the `index.html`.
