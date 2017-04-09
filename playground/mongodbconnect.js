// const MongoClient = require("mongodb").MongoClient;
const {MongoClient,ObjectID} = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
    if(err){
       return console.log("Hubo algun problema al conectarse con la database");
    }
    console.log("Conectado a la database");

    // db.collection("Todos").insertOne({
    //     text:"Algo que agregar",
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log("Hubo algun problema con agregar en la database");
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection("Users").insertOne({
    //     name:"Matias",
    //     age:28,
    //     location:"Argentina"
    // },(err,result)=>{
    //     if(err){
    //         return console.log("Hubo algun problema");
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    // });
    db.close();
});