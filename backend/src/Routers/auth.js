const express = require("express");
const router = express();
const Register = require("../models/register")
const MyTeam = require("../models/myteam")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Sign Up 
router.post("/signup",async(req,res)=>{
 try {
    const { Name,Email,Password,Interest,Gender,DOB,image} = req.body;
     await Register.create({
      Name,Email,Password,Interest,Gender,DOB,image
    })
    res.sendStatus(202);
 } catch (error) {
  console.log(error)
    res.status(404).send(error);
 }
})
//Edit Profile
router.post("/editprofile/:id",async(req,res)=>{
 try {
  const _id = req.params.id;
  console.log(_id)
    const { Name,Email,Interest,Gender,DOB} = req.body;
   await Register.updateOne({ _id},{ $set:{Name,Email,Interest,Gender,DOB}});
    res.sendStatus(202);
 } catch (error) {
  console.log(error)
    res.status(404).send(error);
 }
})

//Login
router.post("/login",async(req,res)=>{
    try {
        const {Email,Password} = req.body;
        const result = await Register.findOne({Email});
        const alldata = await Register.find({},["-Password","-Email"]);
        // console.log(result)
        if(result!=null){
            const UserPassword = result.Password;
            const id = result._id;
            const Name = result.Name;
          const check = await bcrypt.compare(Password,UserPassword);
          if(check === true){
            const Token = jwt.sign({_id:id},process.env.Sectet_Key1);
            res.status(202).json({Token,Name,alldata})
          }
          else{
            res.status(404).send("Invalid Password...")
          }
        }
        else{
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(404);

    }
})
//My Team
router.post("/myteam/:id",async(req,res)=>{
    try {
        const _id = req.params.id;

        const result = await Register.findById(_id);
        console.log(result)
        const { Name,Email,Gender,Interest,image} = result;
        const response = await MyTeam.create({
          Name,Email,Gender,Interest,image
        })
        res.sendStatus(202);
    } catch (error) {
      console.log(error)
        res.sendStatus(404);

    }
})

//Get My Team
router.get("/myteam",async(req,res)=>{
    try {
      const Token = req.header('Authorization');
       jwt.verify(Token,process.env.Sectet_Key1);
        const alldata = await MyTeam.find({},"-Email");
                res.status(202).json({alldata});
    } catch (error) {
        res.status(404).send(error);
    }
})
//Get My Team
router.delete("/deletemember/:id",async(req,res)=>{
    try {
      const _id = req.params.id;
      console.log(_id)
       await MyTeam.findByIdAndDelete(_id);
                res.sendStatus(202);
    } catch (error) {
      console.log(error)
        res.status(404).send(error);
    }
})
//Post List
router.get("/myprofile",async(req,res)=>{
    try {
      const Token = req.header('Authorization');
      const varifyUser = jwt.verify(Token,process.env.Sectet_Key1);
        const user = await Register.findOne({_id:varifyUser._id});
                res.status(202).json({user});
    } catch (error) {
        res.status(404).send(error);
    }
})
//Post List
router.get("/postlist",async(req,res)=>{
    try {
      const Token = req.header('Authorization');
      const varifyUser = jwt.verify(Token,process.env.Sectet_Key1);
        const user = await Register.findOne({_id:varifyUser._id});
        const alldata = await Register.find({},["-Password","-Email"]);
                res.status(202).json({Name:user.Name,alldata});
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;