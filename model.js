function Task(args) {
  args = args || {};
  this.id = args.id;
  this.description = args.description;
  this.dueDate = args.dueDate;
  this.completed = args.completed;
}

Task.create = function(task) {
  var deferred = $.ajax({
    url: 'http://localhost:3000/tasks',
    type: 'POST',
    dataType: 'json',
    data: task
  }).then(function(response){
    // response is the json representation
    // of the saved task from the server
    return new Task(response);
  });
  return deferred;
}

function TodoList(tasks) {
  this.tasks = tasks || [];
}

TodoList.all = function() {
  var deferred = $.ajax({
    url: 'http://localhost:3000/tasks',
    type: 'GET',
    dataType: 'json'
  }).then(function(response){
    return response.map(function(ele){
      return new Task(ele);
    })
  });
  return deferred;
}

TodoList.prototype.getNextId = function() {

  var max = 0;
  for (var i= 0; i < this.tasks.length; i++) {
    var t = this.tasks[i];
    if (t.id && t.id > max) {
      max = t.id;
    }
  }
  return 1 + max;
};

TodoList.prototype.find = function(id) {
  return this.tasks.find(function(ele){
    return ele == id;
  });
}

TodoList.prototype.addTask = function(task) {
  this.tasks.push(task);
  if(!task.id) {
    task.id = this.getNextId();
  }
};

TodoList.prototype.removeTask = function(id) {
   this.tasks = this.tasks.filter(function(element){
    return element.id != id;
   });
}

// Temp driver code

