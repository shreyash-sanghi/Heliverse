const mongoose = require("mongoose");
const validator = require('validator');

const Team = new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("Email is invalid")
            }
           }
    },
    Gender:{
        type:String,
        required:true
    },
    Interest:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    TeamEmail:{
        type:String,
        required:true
    },
   

})

const myteam = new mongoose.model("MyTeam",Team);
module.exports =  myteam;