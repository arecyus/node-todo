var mongoose = require("mongoose");


var Todo = mongoose.model("Todo",{
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim:true  //elimina varios espacios vacios juntos
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default:null
    }
});


// var newTodo = new Todo({
//     text: "Trabajar"
// });

// newTodo.save().then((doc)=>{
//     console.log("Se guardo Todo ",doc);
// },(err)=>{
//     console.log("No se pudo guardar");
// });

// var newTodo = new Todo({
   
// });

// newTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// }, (err)=>{
//     console.log("No se pudo guardar");
// });

module.exports = {
    Todo
};
