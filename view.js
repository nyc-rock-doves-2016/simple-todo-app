function View() {
 $('#new-task-form').on('submit', this.handleFormSubmission.bind(this));
 console.log('Hello from view', $('#new-task-form').length );
}

View.prototype.handleFormSubmission = function(event) {
  var that = this;
  event.preventDefault();
  console.log(event);
  var params = {
    description: $('#description').val(),
    dueDate: new Date($('#dueDate').val()),
    completed: $('#completed').prop("checked")
  }
  that.controller.create(params);
}

View.prototype.drawList = function(todoList) {
  var $target = $('#list');
  var html='<table>';
  html += '<tr><th>Description</th><th>Completed</th><th>Due</th></tr>';
  todoList.tasks.forEach(function(task){
    html += '<tr>';
    html += '<td>';
    html += task.description;
    html += '</td>';

    html += '<td><input type="checkbox" class="task-done" ';
    html +=  task.completed ? " checked " : " ";
    html += '></td>';

    html += '<td>';
    html += task.dueDate;
    html += '</td>';


    html += '</tr>';
  });
  html += '</table>';
  $target.html(html);
}

window.myView = new View();