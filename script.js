let sub = document.getElementById('sub');
let task = document.getElementById('task');
let form = document.getElementById('form');
let warn = document.getElementById('warn');
let submit = document.getElementById('submit');
let tdate = document.getElementById('tdate');
let description = document.getElementById('description');
let cardsContainer = document.getElementById('cardsContainer');


form.addEventListener('submit',function(e){
    e.preventDefault();
    validateForm();
});

let validateForm = () => {
    if(task.value ==''){
        warn.innerHTML = "task field can't be empty"
    }
    else{
        acceptData();
        submit.setAttribute('data-dismiss','modal');
        submit.click();
        submit.setAttribute('data-dismiss',"");
    }
}

let data = [];


function acceptData(){
    let taskObj = {
        sub: sub.value,
        task: task.value,
        tdate: tdate.value,
        description: description.value,
    }
   data.push(taskObj);
   localStorage.setItem('data',JSON.stringify(data));
   createTask();
   
}

function createTask() {
   cardsContainer.innerHTML = "";
   data.map(function(item,x){
    return (cardsContainer.innerHTML += 
     ` <div class="cards" id=${x}>
                <div class="c-top">
                    <span>${item.sub}</span>
                    <div class="c-icons">
                        <i class="fa-solid fa-pen" onclick="editTask(this)" data-toggle="modal" data-target="form"></i>
                        <i  id="dell"class="fa-solid fa-trash-can" onclick='delTask(this)'></i>
                    </div>
                </div>
                <div class="c-mid">
                   <h3>${item.task}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="date">
                   <p>${item.tdate}</p>
                </div>
                </div>
   `)
})

   sub.value = '';
   task.value = '';
   tdate.value = '';
   description.value = ''; 
}

function editTask(m){
    console.log("edit is working");
    let selectedTask = m.parentElement.parentElement.parentElement;
    sub.value = selectedTask.children[0].children[0].innerHTML;
    task.value = selectedTask.children[1].children[0].innerHTML; 
    description.value = selectedTask.children[1].children[1].innerHTML;
    tdate.value = selectedTask.children[2].children[0].innerHTML;
    delTask(m);
}

function delTask(e){
    e.parentElement.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.parentElement.id,1);
    localStorage.setItem('data',JSON.stringify(data));
}


(() => {
  data = JSON.parse((localStorage.getItem('data'))) || [];
  console.log(data);
  createTask();
})()
