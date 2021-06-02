import { format, compareAsc, parseISO } from 'date-fns';

const todoInput = document.querySelector('.todo-input');
const dateInput = document.querySelector('.date-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

let sortList = new Array();
let completedArr = new Array();


function addTodo(event){
    event.preventDefault();
    if(todoInput.value == "" || todoInput.value == " "){
        alert("Invalid entry, please try again");
        dateInput.value = "";
        todoInput.value = "";
        return;
    }
    if(!dateInput.value){
        alert("Please enter a valid due date");
        dateInput.value = "";
        return;
    }

    sortList.push({name: todoInput.value, date: parseISO(dateInput.value)});
    sortList.sort(function(a,b){
        const dateA = a.date;
        const dateB = b.date;
        return compareAsc(dateA, dateB);
    });

    var clear = document.getElementsByClassName('todo');


    for(var i = clear.length - 1; i >= 0; i--){
        clear[0].parentNode.removeChild(clear[0]);
    }



    for(var i = 0; i < sortList.length; i++){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newTodo = document.createElement('li');
        newTodo.innerHTML = sortList[i].name + '<span class="tab"></span>';
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const dueDate = document.createElement('div');
        dueDate.innerHTML = '<b>Due Date:</b> ' + format(sortList[i].date,'MM/dd/yyyy')
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
    }

    todoInput.value = "";
    dateInput.value = "";
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todoToRemove = item.parentElement;
        for(var i = sortList.length - 1; i >= 0; i--){
            if(todoToRemove.getElementsByClassName('todo-item')[0].innerText === sortList[i].name){
                sortList.splice(i, 1);
            }
        }
        todoToRemove.remove();
    }

    if(item.classList[0] === 'complete-btn') {
        const todoToCheck = item.parentElement;
        for(var i = sortList.length - 1; i >= 0; i--){
            if(todoToCheck.getElementsByClassName('todo-item')[0].innerText === sortList[i].name){
                sortList.splice(i, 1);
            }
        }
        todoToCheck.classList.toggle("completed");
    }
}
