function View() {
 $('#new-task-form').on('submit', this.handleFormSubmission.bind(this));
 $('#list').on('change', '.task-done', this.handleCompletionClick.bind(this));
}

View.prototype.handleCompletionClick = function(event) {
  var id = Number(event.target.dataset.id);
  var completed = $(event.target).prop("checked")
  controller.updateCompletion(id, completed);
}

View.prototype.handleFormSubmission = function(event) {
  var that = this;
  event.preventDefault();
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
    html += 'data-id="' + task.id + '" ></td>';

    html += '<td>';
    html += moment(task.dueDate).format('MMM Do YY [at] h:mm:ss a');
    html += '</td>';

    html += '</tr>';
  });
  html += '</table>';
  $target.html(html);
}
