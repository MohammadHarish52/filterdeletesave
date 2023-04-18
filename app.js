// DEFINE UI VARS

const form=document.querySelector('#task-form');
const tasklist=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#tasks');
//loAD ALL EVENT LISTENER

loadEventListener();

function loadEventListener(){
    //DOM load event
document.addEventListener('DOMContentLoaded', getTasks);   

//ADD TASK EVENT
    form.addEventListener('submit',addTask );
//Remove task event
tasklist.addEventListener('click',removeTask);
//clear task event 
clearBtn.addEventListener('click',clearTasks);
//filter tasks
filter.addEventListener('keyup', filterTasks);
}
// get tasks from ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(function(task){
         //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link 
    const link = document.createElement('a');
    //add class 
    link.className = 'delete-item secondary content';
    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //append child to link 
    li.appendChild(link);
    //append li to ul 
    tasklist.appendChild(li);

    });
    
}

//ADD TASKS
function addTask(e){

    if(taskInput.value === '') {
        alert('Add a task');
    }
    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link 
    const link = document.createElement('a');
    //add class 
    link.className = 'delete-item secondary content';
    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //append child to link 
    li.appendChild(link);
    //append li to ul 
    tasklist.appendChild(li);
    // store in ls
    storeTaskInLocalStorage( taskInput.value);

    //clear input 
    taskInput.value='';

     e.preventDefault();
}
// store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks) );
}
//remove task 
function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure')){
    e.target.parentElement.parentElement.remove();
    
   }
  }
}
// remove from ls
function removeTaskFromLocalStorage(taskItem){
    
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(function(task , index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
            
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
 }
//clear tasks 
function clearTasks(){
    // tasklist.innerHTML = '';

    //faster 
    while(tasklist.firstChild){
        tasklist.removeChild(tasklist.firstChild);
    }
    // clear from ls
    clearTasksFromLocalStorage();

}
function  clearTasksFromLocalStorage(){
    localStorage.clear();
}
//filter tasks 
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item =  task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display= 'block';
        }
        else{
            task.style.display= 'none';


        }
    });
}