var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {Todo}=require("./models/todo");
var {User}=require("./models/user");

var app = express();

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



app.listen(3000, ()=>{
    console.log("Arrancando");
});