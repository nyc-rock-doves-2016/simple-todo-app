function Task(args) {
  args = args || {};
  this.id = args.id;
  this.description = args.description;
  this.dueDate = args.dueDate;
  this.completed = args.completed;
}

function TodoList(tasks) {
  this.tasks = tasks || [];
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

