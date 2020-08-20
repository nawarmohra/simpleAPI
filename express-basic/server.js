const express = require('express')
function getId(){
    return '_' + Math.random().toString(36).substr(2, 9);
};
const app = express()

app.use(express.json())
app.use(express.static('public'))
for (var i = 0; i < 3; i++) {
console.log(getId())
}

const users = [ 
    {
        id :"_lrq6g0ta6",
        name : "Laila",
        task : "Start project",
        time : "2 days"
    },
    {
        id: "_xml9e885i",
        name: "Ali",
        task : "Web desgin",
        time : "3 days"
    },
    {
        id: "_7borhp436",
        name: "Sara",
        task : "Create a Flyer",
        time : "8 days"
    },
]


app.get("/users", (req , res) =>{
    res.json(users)
})

app.get("/users/:id", (req, res) => {
    const paramId = req.params.id
    const foundUser = users.find((user) => user.id == paramId )

    if (foundUser) {
        res.json(foundUser)
    } else {
        res.status(404).json({status: "User not found...."})
    }
})



app.put("/users/:id" , (req , res) => {
    const paramId = req.params.id 
    let foundUserIndex = users.findIndex((user) => user.id == paramId)

    if (foundUserIndex == -1){
        res.status(404).json({status: "User to update not found...."})
    }
    
    users[foundUserIndex] = req.body
    res.json({status: " User updated"})
})
    

app.post('/users', (req , res) => {
    if(!req.body.name || !req.body.task || !req.body.time){
       res.status(400).json({status: "New is not alo created"})
    } else {
       let todo = req.body 
       todo.id = getId()
       users.push(todo)
       res.json({status: "New user created"})
       res.status(201).json(todo)   
    }
}) 

app.delete ("/users/:id", [checkIfUserExists], (req,res) => {
    users.splice(req.foundUserIndex, 1)
    res.json({status: "User deleted"})
})
 
    

function checkIfUserExists (req, res, next){
const paramId = req.params.id
 
let foundUserIndex = users.findIndex((user) =>user.id == paramId)

 
if(foundUserIndex == -1){
res.status(404).json({status:"User not found..."})
 }else {
req.foundUserIndex = foundUserIndex
next()
 }
 
}
 

app.use((req, res)=>{
res.status(404).json(

 {
message:'Could not find the resource you are looking for..'
 })
})



app.listen(3000, 'localhost', () => {
    console.log('Server is up and running');
})

  