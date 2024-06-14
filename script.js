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
const currentTime = document.getElementById('current-time');

const btnDeleteAll = document.querySelector('#delete-all')
const tblBodyTask = document.querySelector('#body-task');
const tblBodyDone = document.querySelector('#body-done');

const updateTime = () => {
  const now = new Date();
  currentTime.textContent = now.toDateString() + ' ' + now.toLocaleTimeString();
};

setInterval(updateTime, 1000);
updateTime();

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
  let valTask = inpTask.value;
  let valDate = inpDate.value;
  let valPriority = inpPriority.value;

  console.log(valDate);

  if (valTask == "" || valDate == "" || valPriority == ""){
    Swal.fire("Data tidak boleh kosong!");
  } else {
    if (valPriority == 'High') {
      valPriority = '<span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">High</span>';
    } else if (valPriority == 'Medium') {
      valPriority = '<span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Medium</span>';
    } else {
      valPriority = '<span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Low</span>';
    }
    
    todos.push({
      id: todos.length ? todos[todos.length - 1]['id'] + 1 : 0,
      task: valTask,
      date: valDate,
      prior: valPriority,
      done: false
    });
    
    resetForm();
    renderTable();
    Swal.fire({
      title: "Data Tersimpan",
      text: "You clicked the button!",
      icon: "success"
    });
  }
  
});

btnDeleteAll.addEventListener('click', function(e) {
  todos = [];
  renderTable();
});



renderTable();

