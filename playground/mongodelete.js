// const MongoClient = require("mongodb").MongoClient;
const {MongoClient,ObjectID} = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
    if(err){
       return console.log("Hubo algun problema al conectarse con la database");
    }
    console.log("Conectado a la database");
    //deleteMany
    // db.collection("Todos").deleteMany({text:"Comer"}).then((result)=>{
    //     console.log(result);
    // }, (err)=>{
    //     console.log("Hubo un error "+err);
    // });

    //deleteOne
    // db.collection("Todos").deleteOne({text:"Comer"}).then((result)=>{
    //     console.log(result);
    // });

    //findOneAndDelete

    // db.collection("Todos").findOneAndDelete({completed:false}).then((result)=>{
    //     console.log(result);
    // });

    db.collection("Users").findOneAndDelete({_id: new ObjectID("58e8d8213472c722909cc2b0")}).then((result)=>{
        console.log(result);

    });

});