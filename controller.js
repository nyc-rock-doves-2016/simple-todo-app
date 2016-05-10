function Controller(todoList, view) {
  this.todoList = todoList;
  this.view = view;
}

Controller.prototype.index = function() {
  TodoList.all().then(function(arrayOfTasks) {
    this.todoList = new TodoList(arrayOfTasks);
    this.view.drawList(this.todoList);
  }.bind(this));
};

Controller.prototype.updateCompletion = function(id, complete) {
  var target = this.todoList.find(id);
  if(target) {
    target.completed = complete;
    this.view.drawList(this.todoList);
  }
}

Controller.prototype.create = function(params) {
  var t = new Task(params);
  Task.create(t).then(function(task){
    this.todoList.addTask(task);  
    this.view.drawList(this.todoList);
  }.bind(this));
};

$(document).ready(function(){

  window.model = new TodoList();
  window.view = new View();
  window.controller = new Controller(model, view);
  view.controller = window.controller;

  controller.index();
});