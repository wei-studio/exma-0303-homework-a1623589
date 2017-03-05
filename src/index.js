// require styles
require('../styles/index.scss');

// require modules
var $ = require('jquery');
var TodoItem = require('./TodoItem.js');

var todoInstances = [];

// 更新一個 todo 的資料到 API Server
function updateTodoAPI(data) {
  $.ajax({
    type: 'post',
    url: '/api/todos/update/' + data.id,
    dataType: 'text',
    data: data,
    success: function(result) {
      console.log(result);
    }
  });
};

// 將所有的 todo 都變成 完成 或 未完成 的顯示狀態，並呼叫更新資料到 API Server
function toggleAllTodosCompleted(isCompleted) {
  todoInstances.forEach(function(todo) {
    todo.toggleCompleted(isCompleted);
  });
};

// 建立並初始化一個 Todo Component
function createTodoComponent(todoData) {
  var newTodo = new TodoItem({
    id: todoData.id,
    title: todoData.title,
    isCompleted: todoData.isCompleted,
    onToggle: updateTodoAPI
  });
  todoInstances.push(newTodo);
}

// 讀取 API todo 資料並呼叫 UI 初始化
function loadAPI() {
  $.ajax({
    url: '/api/todos',
    dataType: 'json',
    success: function(todoList) {
      todoList.forEach(function(todoData){
        createTodoComponent(todoData);
      });
    }
  });
}

// 程式進入點
$(document).ready(function () {
  loadAPI();

  // 綁定全部完成的事件
  $('#complete-all-btn').click(function(){
    toggleAllTodosCompleted(true);
  });

  // 綁定全部未完成的事件
  $('#uncomplete-all-btn').click(function(){
    toggleAllTodosCompleted(false);
  });
});



