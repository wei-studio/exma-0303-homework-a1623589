// require styles
require('../styles/index.scss');

// require modules
const $ = require('jquery');
const TodoItem = require('./TodoItem.js');

let todoInstances = [];

// 更新一個 todo 的資料到 API Server
async function updateTodoAPI (data) {
    // 得到回傳值之後再轉text(沒辦法寫在同一個敘述)
    let re = await fetch(`/api/todos/update/ ${data.id}`,{
      method: 'POST',
      body: data
      });
    let result = await re.text();
    console.log(result);
  
};

// 將所有的 todo 都變成 完成 或 未完成 的顯示狀態，並呼叫更新資料到 API Server
function toggleAllTodosCompleted(isCompleted) {
  todoInstances.forEach(function(todo) {
    todo.toggleCompleted(isCompleted);
  });
};

// 建立並初始化一個 Todo Component
function createTodoComponent(todoData) {
  let newTodo = new TodoItem({
    id: todoData.id,
    title: todoData.title,
    isCompleted: todoData.isCompleted,
    onToggle: updateTodoAPI
  });
  todoInstances.push(newTodo);
}

// 讀取 API todo 資料並呼叫 UI 初始化
async function loadAPI() {
  // 抓完資料之後再轉json(沒辦法寫在同一個敘述)
  let re = await fetch('/api/todos');
  let todoList = await re.json();
  todoList.forEach((todoData) => {
    createTodoComponent(todoData);
  });
}

// 程式進入點
$(document).ready(() => {
  loadAPI();

  // 綁定全部完成的事件
  $('#complete-all-btn').click(() => {
    toggleAllTodosCompleted(true);
  });

  // 綁定全部未完成的事件
  $('#uncomplete-all-btn').click(() => {
    toggleAllTodosCompleted(false);
  });
});



