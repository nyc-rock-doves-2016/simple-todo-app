function Controller(todoList, view) {
  this.todoList = todoList;
  this.view = view;
}

Controller.prototype.index = function() {
  this.view.drawList(this.todoList);
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
  this.todoList.addTask(t);
  this.view.drawList(this.todoList);
};

$(document).ready(function(){

  window.model = new TodoList();
  window.view = new View();
  window.controller = new Controller(model, view);
  view.controller = window.controller;

  /*
     Create some sample data
  */
  model.addTask(new Task({description: 'Buy milk', completed: false, dueDate: new Date('03/29/2016')}));
  model.addTask(new Task({description: 'Buy dog', completed: false, dueDate: new Date('03/26/2016')}));
  model.addTask(new Task({description: 'Get a kitty', completed: true, dueDate: new Date('03/28/2016')}));


  controller.index();
});