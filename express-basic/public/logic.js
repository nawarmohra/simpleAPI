window.addEventListener('load', start)

/* function theAddedname(){
    var input = document.getElementById("nameInput").value;
    alert(input);
} */

async function start(){
    const result = await fetch('/users')
    const users = await result.json()
    let contant = document.getElementById("theOutPut")
    users.forEach(user => {

        let div = document.createElement("div")
        let nametext = document.createElement("p")
        nametext.style.color='rgba(219,21,99,0.8)';

        let tasktext = document.createElement("p")
        let timetext = document.createElement("p")

        nametext.innerText=user.name
        tasktext.innerText=user.task
        timetext.innerText=user.time

        div.appendChild(nametext)
        div.appendChild(tasktext)
        div.appendChild(timetext)

        contant.appendChild(div)  

    });
}



async function creatTodo(event){
    event.preventDefuault()
    event.target
}

function getAll(){
    console.log("getall")
    makeRequest("/users", "get")
}

function getOnltOne(id){
    console.log("getOnyOne")
    makeRequest("/users/" + 0, "get")
}

function addNew(){
    var inputname = document.getElementById("nameInput").value;
    var inputtask = document.getElementById("taskInput").value;
    var inputdate = document.getElementById("dateInput").value;

    let body = {
        name:inputname,
        task:inputtask,
        time:inputdate
    }
    makeRequest("/users/", "post", JSON.stringify(body))
}

function update(id){
    let body= {
        id:"_lrq6g0ta6",
        name:inputname,
        task:inputtask,
        time:inputdate
    }
    makeRequest("/users/_lrq6g0ta6", "put", JSON.stringify(body))
}

function remove(id){
    console.log("delete", id)
    makeRequest("/users/_lrq6g0ta6", "delete")
}
async function makeRequest(url , reqmethod, body){
    const response = await fetch(url, {
        headers: {"content-type": "application/json"},
        method: reqmethod,
        body: body
    })
    console.log(response)
    location.reload()
    const data = await response.json()
    console.log(data)
        return data
    
}