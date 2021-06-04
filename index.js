import { format, compareAsc, parseISO } from 'date-fns';

const todoInput = document.querySelector('.todo-input');    //grab todo item
const dateInput = document.querySelector('.date-input');    //grab date input
const todoButton = document.querySelector('.todo-button');  //generates add todo event
const todoList = document.querySelector('.todo-list');      //used for delete/check events

todoButton.addEventListener('click', addTodo);      //triggers addTodo when todo is added
todoList.addEventListener('click', deleteCheck);    //triggers deleteCheck when todo is checked/deleted

let sortList = new Array();         //stores todo names and dates to be sorted in array of structs
let completedArr = new Array();     //stores completed todos to be displayed at bottom of list


function addTodo(event){
    event.preventDefault();         //prevent browser refresh
    if(todoInput.value == "" || todoInput.value == " "){    //error handling for blank todo inputs
        alert("Invalid entry, please try again");
        dateInput.value = "";
        todoInput.value = "";
        return;
    }
    if(!dateInput.value){       //error handling for blank date input
        alert("Please enter a valid due date");
        dateInput.value = "";
        return;
    }

    if((!(parseISO(dateInput.value)).getTime() > 0)){   //error handling for out of range date input
        alert("Please enter a valid due date");
        dateInput.value = "";
        return;
    }

    sortList.push({name: todoInput.value, date: parseISO(dateInput.value),
    dateOriginal: dateInput.value});
    //push dates (properly formatted) into an array of structs
    sortList.sort(function(a,b){    //sort the array of structs by date ascending
        const dateA = a.date;
        const dateB = b.date;
        return compareAsc(dateA, dateB);
    });

    var clear = document.getElementsByClassName('todo');    //to help clear todo list


    for(var i = clear.length - 1; i >= 0; i--){
        clear[0].parentNode.removeChild(clear[0]);
    }       //clears todo list so the list can be reconstructed in sorted order



    for(var i = 0; i < sortList.length; i++){       //goes through sorted list in order and displays the todos
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");      //overarching div that holds the todo object
        const newTodo = document.createElement('li');
        newTodo.innerHTML = sortList[i].name + '<span class="tab"></span>';
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);       //adds todo task name into todo object

        const dateHold = document.createElement("input");
        dateHold.setAttribute("type", "hidden");
        dateHold.setAttribute("class", "date-hold");
        dateHold.setAttribute("name", "date-hold");
        dateHold.setAttribute("value", sortList[i].dateOriginal);
        todoDiv.appendChild(dateHold);

        const dueDate = document.createElement('div');
        dueDate.innerHTML = '<b>Due Date:</b> ' + format(sortList[i].date,'MM/dd/yyyy')
        + '<span class="tab"></span>';
        dueDate.classList.add("due-date");
        todoDiv.appendChild(dueDate);       //adds due date into todo object

        const completedButton = document.createElement('button');
        completedButton.innerText = 'Check';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);   //adds check button into todo object

        const trashButton = document.createElement('button');
        trashButton.innerText = 'Delete';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);       //adds delete button into todo object

        todoList.appendChild(todoDiv);          //adds the todo object as a whole to the todo list
    }

    for(var i = 0; i < completedArr.length; i++){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");      //overarching div that holds the todo object
        todoDiv.classList.toggle("completed");
        const newTodo = document.createElement('li');
        newTodo.innerHTML = completedArr[i].name + '<span class="tab"></span>';
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);       //adds todo task name into todo object

        const dateHold = document.createElement("input");
        dateHold.setAttribute("type", "hidden");
        dateHold.setAttribute("class", "date-hold");
        dateHold.setAttribute("name", "date-hold");
        dateHold.setAttribute("value", completedArr[i].dateOriginal);
        todoDiv.appendChild(dateHold);

        const dueDate = document.createElement('div');
        dueDate.innerHTML = '<b>Due Date:</b> ' + format(parseISO(completedArr[i].dateOriginal),'MM/dd/yyyy')
        + '<span class="tab"></span>';
        dueDate.classList.add("due-date");
        todoDiv.appendChild(dueDate);       //adds due date into todo object

        const completedButton = document.createElement('button');
        completedButton.innerText = 'Check';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);   //adds check button into todo object

        const trashButton = document.createElement('button');
        trashButton.innerText = 'Delete';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);       //adds delete button into todo object

        todoList.appendChild(todoDiv);          //adds the todo object as a whole to the todo list

    }

    todoInput.value = "";       //reset todo inputs (date and task name)
    dateInput.value = "";
}

function deleteCheck(event){
    const item = event.target;

    if(item.classList[0] === 'trash-btn'){
        const todoToRemove = item.parentElement;
        if(todoToRemove.classList[1] === "completed"){
            for(var i = completedArr.length - 1; i >= 0; i--){
                if(todoToRemove.getElementsByClassName('todo-item')[0].innerText === completedArr[i].name){
                    completedArr.splice(i, 1);
                }
            }
        }
        else{
            for(var i = sortList.length - 1; i >= 0; i--){
                if(todoToRemove.getElementsByClassName('todo-item')[0].innerText === sortList[i].name){
                    sortList.splice(i, 1);
                }
            }       //remove the deleted todo from the sorted list (so it doesn't get re-inputted again)
        }
        todoToRemove.remove();      //remove the todo item from the todo list itself
        console.log("after deletion");
        console.log(completedArr);
    }

    if(item.classList[0] === 'complete-btn') {
        const todoToCheck = item.parentElement;
        for(var i = sortList.length - 1; i >= 0; i--){
            if(todoToCheck.getElementsByClassName('todo-item')[0].innerText === sortList[i].name){
                sortList.splice(i, 1);
            }
        }       //remove the checked todo from the sorted list (so it doesn't get re-inputted again
                //as a normal todo)
        todoToCheck.classList.toggle("completed");  //change the class name so the todo can be displayed
                                                    // as crossed out and grayed out using CSS

        var iterArr = todoToCheck.parentElement.getElementsByClassName('todo');
        completedArr = [];
        console.log("iterArr");
        for(var i = 0; i < iterArr.length; i++){
            console.log(iterArr[i].getElementsByClassName('date-hold')[0].value);
        }
        console.log("completedArr");
        for(var i = 0; i < iterArr.length; i++){
            if(iterArr[i].classList[1] === "completed"){
                console.log(iterArr[i].getElementsByClassName('date-hold')[0].value);
                completedArr.push({name: iterArr[i].getElementsByClassName('todo-item')[0].innerText,
                date: parseISO(iterArr[i].getElementsByClassName('date-hold')[0].value),
                dateOriginal: iterArr[i].getElementsByClassName('date-hold')[0].value});
            }
        }
        console.log(completedArr);
    }
}
