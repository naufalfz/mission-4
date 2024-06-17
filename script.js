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
  inpPriority.value = "-Choose a Priority-";
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
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td class="px-6 py-4">
        <input onclick='taskComplete(this)' type='checkbox' data-id='${todo.id}'>
      </td>
      <td class="px-6 py-4">${todo.prior}</td>
      <td class="px-6 py-4 dark:text-white">${todo.task}</td>
      <td class="px-6 py-4 dark:text-white">${todo.date}</td>
      <td>
        <a href='#' onclick='removeTask(this)' data-id='${todo.id}' class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">Hapus</a>
      </td>
    </tr>
  `);
  
  tblBodyTask.innerHTML = renderTasks;
  
  
  const renderDone = todos.filter(todo => todo.done).map(todo => `
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td class="px-6 py-4">
        <input checked ="checked" onclick='taskComplete(this)' type='checkbox' data-id='${todo.id}'>
      </td>
      <td id='done' class="px-6 py-4 line-through">${todo.prior}</td>
      <td id='done' class="px-6 py-4 line-through">${todo.task}</td>
      <td id='done' class="px-6 py-4 line-through">${todo.date}</td>
      <td>
        <a href='#' onclick='removeTask(this)' data-id='${todo.id}' class="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">Hapus</a>
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
    Swal.fire("Data cannot be empty!!");
  } else {
    if (valPriority == 'High') {
      valPriority = '<span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">High</span>';
    } else if (valPriority == 'Medium') {
      valPriority = '<span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Medium</span>';
    } else {
      valPriority = '<span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Low</span>';
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
      position: "top-center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }
  
});

btnDeleteAll.addEventListener('click', function(e) {
  Swal.fire({
  title: "Do you want to Delete All Task?",
  showDenyButton: true,
  confirmButtonText: "Delete",
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    todos = [];
    renderTable();
    Swal.fire("Delete All Task Success!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Delete All Task is canceled", "", "info");
  }
});


  // Swal.fire({
  //   title: "Are you sure?",
  //   text: "You won't be able to revert this!",
  //   icon: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Yes, delete it!"
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire({
  //       title: "Deleted!",
  //       text: "Your file has been deleted.",
  //       icon: "success"
  //     });
  //   }
  // });

});



renderTable();

