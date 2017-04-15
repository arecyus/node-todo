var express = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");
var {mongoose} = require("./db/mongoose.js");
var {Todo}=require("./models/todo");
var {User}=require("./models/user");

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt

    });

    todo.save().then((success)=>{
        res.send(success);
    },(err)=>{
        res.status(400).send(err);
    });
});


app.get("/todos",(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.get("/todos/:id",(req,res)=>{
   var id= req.params.id;
   if(!ObjectID.isValid(id)) {
    return res.status(404).send();
}
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }). catch((e)=>{
        res.status(400).send();
    });
});

app.listen(port, ()=>{
    console.log("Arrancando en port: "+port);
});


module.exports = {app};