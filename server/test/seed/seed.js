const {ObjectID} = require("mongodb");
const {Todo}= require("./../../models/todo");
const {User} =require("./../../models/user");
const userOneId = new ObjectID();
const jwt = require("jsonwebtoken");
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: "Matias@gmail.com",
    password: "1234567,",
    tokens: [{
        access: "auth",
        token: jwt.sign({_id:userOneId,access:"auth"}, "abc123").toString()
    }]
},{
    _id: userTwoId,
    email: "hola@gmail.com",
    password: "567891011"
}];



const todos = [{
    _id:new ObjectID(),
    text: "Primer test"
},{
    _id:new ObjectID(),
    text: "Segundo test",
    completed: true,
    completedAt: 333
}];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>{
        done();
    })
};

const populateUsers = (done) =>{
  User.remove({}).then(()=>{
     var userOne = new User(users[0]).save();
     var userTwo = new User(users[1]).save();

     return Promise.all([userOne,userTwo])
  }).then(()=>done());
};

module.exports = {todos,populateTodos,users,populateUsers};