var $ = require('jquery');

// #todo-list jQuery DOM
var $todoList = $('#todo-list');

// TodoItem Component 的建構函數
function TodoItem(data) {
  this.id = data.id;

  // 檢查資料是否存在值，沒有的話給予預設值
  if (data.isCompleted === undefined) {
    this.isCompleted = false;
  } else {
    this.isCompleted = data.isCompleted;
  }
  
  if (data.title === undefined) {
    this.title = '';
  } else {
    this.title = data.title;
  }

  if (data.onToggle === undefined) {
    this.onToggle = function(){};
  } else {
    this.onToggle = data.onToggle;
  }

  // 呼叫建立 DOM
  this.createTodoDom();

  // 呼叫綁定 onToggle 事件
  this.bindOnToggleEvent();
}

// 根據資料產生 UI 初始化的 HTML 字串
TodoItem.prototype.renderHTML = function() {
  var isChecked = (this.isCompleted)? 'checked' : '';
  return '<div class="todo-item">' +
           '<div class="ui toggle checkbox">' +
             '<input type="checkbox" name="public" ' + isChecked + '>' +
             '<label>' + this.title + '</label>' +
           '</div>' +
         '</div>';
}

// 解析 HTML 字串來建立 DOM 物件，並加到畫面中
TodoItem.prototype.createTodoDom = function() {
  var html = this.renderHTML();
  this.dom = $.parseHTML(html)[0];
  this.inputDom = $(this.dom).find('input')[0];
  $todoList.append(this.dom);
}

// 呼叫 toggle 行為，並呼叫 onToggle callback function
TodoItem.prototype.toggleCompleted = function(isCompleted) {
  this.isCompleted = (isCompleted == undefined)? !this.isCompleted : isCompleted;
  $(this.inputDom).prop('checked', this.isCompleted);
  this.onToggle({
    id: this.id,
    isCompleted: this.isCompleted
  });
}

 // 綁定 onToggle 事件到 input DOM 上
TodoItem.prototype.bindOnToggleEvent = function() {
  var todoThis = this;
  $(this.inputDom).change(function() {
    var isCompleted = $(todoThis.inputDom).prop('checked');
    todoThis.toggleCompleted(isCompleted);
  });
}

module.exports = TodoItem;