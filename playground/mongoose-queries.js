const {ObjectID}= require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// var id = "58ef668ebb55391af03bc9e8";

// if(!ObjectID.isValid(id)) {
//     console.log("ID no valida");
// }

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log("Todos ",todos);

// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log("Todo ",todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log("No se encontro ningun id");
//     }
//     console.log("Todo por id ",todo);
// }).catch((e)=>{
//     cconsole.log(e);
// });

var id = "58ee12ebd3b61722cc9c2c5a";

User.findById(id).then((user)=>{
    if(!user){
        return console.log("No se encontro ningun id");
    }
    console.log("User por id: ",user);
}).catch((e)=>{
    console.log(e);
})