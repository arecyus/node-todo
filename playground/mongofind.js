// const MongoClient = require("mongodb").MongoClient;
const {MongoClient,ObjectID} = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
    if(err){
       return console.log("Hubo algun problema al conectarse con la database");
    }
    console.log("Conectado a la database");
    // db.collection("Todos").find({completed:false}).toArray().then((docs)=>{
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log("Imposible de encontrar ",err)
    // });
    //db.close();
    // db.collection("Todos").find().count().then((count)=>{
    //     console.log("Todos count: "+count);
        
    // },(err)=>{
    //     console.log("Imposible de encontrar ",err)
    // });
    db.collection("Users").find({name:"Matias"}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    }, (err)=>{
        console.log("Error");
    });
});