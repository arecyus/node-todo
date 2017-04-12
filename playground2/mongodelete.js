const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/mongotodo",(err,db)=>{
    if(err){
        return console.log("Hubo algun problema al conecarse a la database");
    }
    console.log("Conectado");

    db.collection("Todo").deleteMany({text:"Algo que completar"},(err,result)=>{
        if(err){
            console.log("Hubo algun error");
        }
        console.log(JSON.stringify(result,undefined,2));
    });

});