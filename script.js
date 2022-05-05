const taskContext = document.getElementById('taskctx');
const add = document.getElementById('add');
const taskBoard = document.querySelector('.tasks');
const noTasks = document.getElementById('notasks');
const ctxRequest = document.getElementById('contextrequest');
const modal = document.querySelector('.modal');
const cancel = document.getElementById('cancel');
const confirm = document.getElementById('confirm');
const newCtx = document.getElementById('newctx');
const modalAlert = document.querySelector('.modalalert');

var id = 0;

function createTask(){
    var context = taskContext.value;
    var newTask = document.createElement('div');
    newTask.innerHTML = `<span class="taskctx">${context}</span>
                        <span>
                            <button class="done"><i class="fa-solid fa-check"></i></button>
                            <button class="edit">EDIT</button>
                            <button class="delete"><i class="fa-solid fa-xmark"></i></button>
                        </span>`
    newTask.classList.add('task');
    newTask.setAttribute('id', id);
    id++;
    taskBoard.appendChild(newTask);
    taskContext.value = '';
}

function checkIfBoardIsEmpty(){
    var board = taskBoard.children.length;
    if(id > 0)
        noTasks.classList.add('invisible');
     
    if(board == 3)
        noTasks.classList.remove('invisible');   
}

function validateTaskAdder(e){
    if(taskContext.value == ''){
        e.preventDefault();
        ctxRequest.classList.remove('invisible');
    } else {
        createTask();
        checkIfBoardIsEmpty();
        deleteTask();
        editTask();
        markFinishedTask();
        ctxRequest.classList.add('invisible');
    }
}

function deleteTask(){
    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(button => {
        button.addEventListener('click', () => {
            var specifiedTask = button.parentElement.parentElement.id;
            var tempID = document.getElementById(`${specifiedTask}`);
            taskBoard.removeChild(tempID);
            checkIfBoardIsEmpty();
        })
    })
}

function markFinishedTask(){
    const doneBtns = document.querySelectorAll('.done');
    doneBtns.forEach(button => {
        button.addEventListener('click', () => {
            var specifiedTask = button.parentElement.previousElementSibling;
            specifiedTask.classList.toggle('donetask');
        })
    })
}

var tempTask;

function editTask(){
    modalAlert.style.display = 'none';
    const editBtns = document.querySelectorAll('.edit');
    editBtns.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'flex';
            var specifiedTask = button.parentElement.previousElementSibling;
            tempTask = specifiedTask;
        })
    })
}

function validateModal(e){
    if(newCtx.value == ''){
        e.preventDefault();
        modalAlert.style.display = 'block';
    } else {
        changeTaskValue();
    }
}

function changeTaskValue(){
    tempTask.textContent = newCtx.value;
    clearModal();
}

function clearModal(){
    modal.style.display = 'none';
    modalAlert.style.display = 'none';
    newCtx.value = '';
}

add.addEventListener('click', validateTaskAdder);
cancel.addEventListener('click', clearModal);
confirm.addEventListener('click', validateModal);