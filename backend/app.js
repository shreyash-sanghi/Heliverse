require('dotenv').config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = process.env.PORT|| 5000;
const auth = require("./src/Routers/auth");
const cors = require('cors');


//Set Cors Policy
app.use(cors(
    {
      origin:"https://heliverse-drab.vercel.app",
       methods: ["POST", "GET","OPTIONS", "PATCH", "PUT", "DELETE"],
      credentials: true,
    }
  ));
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "https://heliverse-drab.vercel.app",);
    res.header('Access-Control-Allow-Credentials', "true");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  //Set Use State
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth);



app.get("",(req,res)=>{
    res.send("My Name is shreyash jain.....")
})

//Connect Data Base
try { 
    mongoose.connect(process.env.DatabaseConnect)
    console.log("Data bas connect successfully...")
} catch (error) {
    console.log(error);
}

//Lisning Data Base
app.listen(port,()=>{
    console.log("Connection successfully...")
})
