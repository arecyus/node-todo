const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc!";
// bcrypt.genSalt(10,(err,salt)=>{
//    bcrypt.hash(password,salt,(err,hash)=>{
//        console.log(hash);
//    })
// });


var hashedPassword="$2a$10$MBFBnzxJuiCNoSy2B0tf2uGfrEijPAVjWn8DMJT2kC/lzNjzNE3T2";

bcrypt.compare(password,hashedPassword,(err,res)=>{
   console.log(res);
});


//
// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, "123abc");
// console.log(token);
//
// var decoded = jwt.verify(token,"123abc");
// console.log(decoded);


// var message = "Soy un user numero 4";
//
// var hash = SHA256(message).toString();
//
// console.log(hash);
// console.log(message);
//
// var data ={
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ "asdlaksdlaks").toString()
// };
//
// //
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + "asdlaksdlaks").toString();
//
// if(resultHash === token.hash){
//     console.log("No se cambio");
// }else {
//     console.log("Se cambio");
// }