var mongoose = require("mongoose");

var User = mongoose.model("User",{
    email:{
        type: String,
        required:true,
        trim: true,
        minlength:1
    }
});

// var newUser = new User ({
//     email: "   email@gmail.com   "
// });

// newUser.save().then((doc)=>{
//     console.log(doc);
// },(err)=>{
//     console.log("No se pudo guardar");
// });

module.exports= {User};