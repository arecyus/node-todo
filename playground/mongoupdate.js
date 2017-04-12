// const MongoClient = require("mongodb").MongoClient;
const {MongoClient,ObjectID} = require("mongodb");

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,db)=>{
    if(err){
       return console.log("Hubo algun problema al conectarse con la database");
    }
    console.log("Conectado a la database");
    
    db.collection("Todos").findOneAndUpdate({_id: new ObjectID("58ea97698c7775e6e01b2bbb")},{
        $set: {
            completed: true
        }
    }, {
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
    });

    db.collection("Users").findOneAndUpdate({_id: new ObjectID("58e8da424e1ade149048f1d8")},{
        $set: {
            name: "Ramiro"
        },
        $inc: {
            age: +1
        }}, {
            returnOriginal:false
        }).then((result)=>{
            console.log(result);
        
    });
});