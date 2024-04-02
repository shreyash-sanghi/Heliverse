import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotSpinner } from '@uiball/loaders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sign = ()=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initial,final] = useState({
    Email:"",
    Password:"",
  })
 const updatedata = (e)=>{
    const {name,value} = e.target;
    final((info)=>{
      return{
        ...info,
        [name] :value
      }
    })
 }

  const save =async(event)=>{
    event.preventDefault(); 
    try {
      setLoading(true);
    const {Email,Password} = initial;
   const result  = await axios.post("https://heliverse-backend-beige.vercel.app/login",
   {Email,Password});
   const status = result.status;
   if(status == 202){
   const token = result.data.Token;
   localStorage.setItem('token', token);
   axios.defaults.headers.common["Authorization"] = token;
   setLoading(false);
   toast("Successfull Login...")
   setTimeout(()=>{
     navigate("/postlist")
   },1000)
   }
  } catch (error) {
    setLoading(false);
    console.log(error)
      alert("Invalid Details please Sing In again...")
  }
  }
  
    return(
        <>
      <div className="main_root">

    <div class="main">  	
        <div class="signup">
				<form method="POST">
					<label className="label" for="chk" aria-hidden="true">Sign in</label>
					<input  className="sign_input" onChange={updatedata} name="Email" type="text" placeholder="Email" required/>
					<input  className="sign_input" onChange={updatedata} name="Password" type="password" placeholder="Password" required/>
          {loading ? (
                        <div className="flex mt-10 justify-evenly ">
                      <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                  </div>
                    ) : (
                      <button className="signup_button bg-purple-600 text-white" onClick={save}>Sign In</button> 
                    )}
        </form>

			</div>
	</div>
    </div>
    <ToastContainer />
        </>
    )
}

export default Sign;