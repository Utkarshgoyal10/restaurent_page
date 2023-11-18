const mongoose = require("mongoose");
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/login');
      console.log("run");
  }
  const SignupSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    cpassword:{
      type:String,
      required:true
    }

  })



  const collection= new mongoose.model("Collection1",SignupSchema);
  
  module.exports={collection};