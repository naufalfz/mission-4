/**
  {
    task:,
    date:,
    prior:,
    done: true/false, // default = false
  }
*/

let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];


const inpTask = document.querySelector('#activity');
const inpPriority = document.querySelector('#priority');
const inpDate = document.querySelector('#date');
const btnSubmit = document.querySelector('#submit');

const btnDeleteAll = document.querySelector('#delete-all')
const tblBodyTask = document.querySelector('#body-task');
const tblBodyDone = document.querySelector('#body-done');


function resetForm() {
  inpTask.value = "";
  inpDate.value = "";
  inpPriority.value = "Choose a Priority";
}

function taskComplete(e) {
  const idTask = e.dataset.id;
  const selectedTodo = todos.find(todo => todo.id == Number(idTask));
  selectedTodo.done = !selectedTodo.done;
  renderTable();
} 

function removeTask(e) {
  const idTask = e.dataset.id;
  todos = todos.filter(todo => todo.id == Number(idTask) ? false : true);
  renderTable();
}

function renderTable() {
  const renderTasks = todos.filter(todo => !todo.done).map(todo => `
    <tr>
      <td>
        <input onclick='taskComplete(this)' type='checkbox' data-id='${todo.id}'>
      </td>
      <td>${todo.prior}</td>
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>
        <a href='#' onclick='removeTask(this)' data-id='${todo.id}'>Hapus</a>
      </td>
    </tr>
  `);
  
  tblBodyTask.innerHTML = renderTasks;
  
  
  const renderDone = todos.filter(todo => todo.done).map(todo => `
    <tr>
      <td>
        <input onclick='taskComplete(this)' type='checkbox' data-id='${todo.id}'>
      </td>
      <td class='done'>${todo.prior}</td>
      <td class='done'>${todo.task}</td>
      <td class='done'>${todo.date}</td>
      <td>
        <a href='#' onclick='removeTask(this)' data-id='${todo.id}'>Hapus</a>
      </td>
    </tr>
  `);
  
  tblBodyDone.innerHTML = renderDone;
  
  localStorage.setItem('todos', JSON.stringify(todos));
}


btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  const valTask = inpTask.value;
  const valDate = inpDate.value;
  const valPriority = inpPriority.value;
  
  todos.push({
    id: todos.length ? todos[todos.length - 1]['id'] + 1 : 0,
    task: valTask,
    date: valDate,
    prior: valPriority,
    done: false
  });
  
  resetForm();
  renderTable();
});

btnDeleteAll.addEventListener('click', function(e) {
  todos = [];
  renderTable();
});



renderTable();

