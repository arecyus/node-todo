const {ObjectID}= require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });


Todo.findOneAndRemove({_id: "58f211580df29c321853d742"}).then((todo)=>{
    console.log(todo);
});

Todo.findNyIDAndRemove("58f211580df29c321853d742").then((todo)=>{
    console.log(todo);
});