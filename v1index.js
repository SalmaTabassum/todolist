import { addDays, formatDistanceToNow, format, compareAsc,
    getDate, getMonth, getYear, parseISO } from 'date-fns';

const todoInput = document.querySelector('.todo-input');
const dateInput = document.querySelector('.date-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

let sortList = new Array();
let popList = new Array();

function sortTodos(){
    sortList.push({name: todoInput.value, date: parseISO(dateInput.value)});
    sortList.sort(function(a,b){
        const dateA = a.date;
        const dateB = b.date;
        return compareAsc(dateA, dateB);
    });
}


function addTodo(event){
    event.preventDefault();
    if(todoInput.value == "" || todoInput.value == " "){
        alert("Invalid entry, please try again");
        todoInput.value = "";
        return;
    }

    for(i = 0; i < sortList.length; i++){
        sortList[i].name //todoInput.value
        sortList[i].date //dateInput.value
    }

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value + '<span class="tab"></span>';
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const dueDate = document.createElement('div');
    dueDate.innerHTML = '<b>Due Date:</b> ' + format(parseISO(dateInput.value),'MM/dd/yyyy')
    + '<span class="tab"></span>';
    dueDate.classList.add("due-date");
    todoDiv.appendChild(dueDate);

    const completedButton = document.createElement('button');
    completedButton.innerText = 'Check';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerText = 'Delete';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
    dateInput.value = "";
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todoToRemove = item.parentElement;
        todoToRemove.remove();
    }

    if(item.classList[0] === 'complete-btn') {
        const todoToCheck = item.parentElement;
        todoToCheck.classList.toggle("completed");
    }
}
