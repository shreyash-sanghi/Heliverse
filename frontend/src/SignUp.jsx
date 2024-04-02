import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DotSpinner } from '@uiball/loaders';
import { imageDb } from "./Config";
import { ref, uploadBytes ,getStorage} from "firebase/storage";
import {v4} from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = ()=>{
  const navigate = useNavigate();
    const [initial,final] = useState({
        Name:"",
        Email:"",
        Password:"",
        Interest:"",
        CPassword:"",
        Gender:"",
        DOB:"",
    })
    const [initialfile, finalfile] = useState();
  const [loading, setLoading] = useState(false);
    const setdata = (event)=>{
        const {name,value} = event.target;
        final((info)=>{
            return{
            ...info,
            [name] : value
            }
        })
    }

    const savedata = async(event)=>{
        event.preventDefault();
        try {
            setLoading(true);
            const storage = getStorage();
            const image = `${initialfile.name + v4()}`;
           const imgref = ref(storage,`project/${image}`);
        const {Name,Email,Password,Interest,CPassword,Gender,DOB} = initial;
        if(Password !==CPassword){
            toast("Both Password are Diffrent...")
            setLoading(false);
        }else{
            const response = await axios.post("https://heliverse-backend-beige.vercel.app/signup",{
                Name,Email,Password,Interest,Gender,DOB,image
            })
            toast("Successfully Save ...")
            if(response.status = 202){
                uploadBytes(imgref,initialfile)
            }
            setLoading(false);
            setTimeout(()=>{
                navigate('/login')
            },1000)
        }
      
    } catch (error) {
        setLoading(false);
            alert(error);
    }
    }
    
    return(
        <>
        

{/* <div className="main_root">

<div class="main">  	
    <div class="signup">
            <form onSubmit={savedata} method="POST">
                <label className="label" for="chk" aria-hidden="true">Sign Up</label>
                <input  className="sign_input" type="text" onChange={setdata} name="Name" placeholder="Full Name" required/>
                <textarea  className="sign_input" type="text" onChange={setdata} required name="Interest" placeholder="Enter Your Interest, Skills, Hobbies" />
                <input  className="sign_input" type="email" onChange={setdata} required name="Email" placeholder="Email" />
                <input  className="sign_input" type="password" name="Password" required onChange={setdata} placeholder="Password" />
                {loading ? (
                      <div className="flex mt-10 justify-evenly ">
                     <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={40} speed={0.9} color="red" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={40} speed={0.9} color="blue" className="flex items-center  justify-center mx-auto" />
                 </div>
                  ) : (
                    <input type="submit" value={"Sign Up"} className="signup_button bg-purple-600 text-white" ></input> 
                  )}
    </form>   
        </div>
</div>
</div> */}

<section class="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-200 mt-20">
    <h1 class="text-xl font-bold text-black capitalize dark:text-black">Sign Up</h1>
    <form onSubmit={savedata} method="POST">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-black dark:text-gray-900" for="username">Username</label>
                <input onChange={setdata} autoComplete="off" name="Name" id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label class="text-black dark:text-gray-900" for="emailAddress">Email Address</label>
                <input onChange={setdata} name="Email" id="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label class="text-black dark:text-gray-900" for="password">Password</label>
                <input id="password" type="password" name="Password" required onChange={setdata} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label class="text-black dark:text-gray-900" for="passwordConfirmation">Password Confirmation</label>
                <input id="passwordConfirmation" type="password" name="CPassword" required onChange={setdata} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
  
            <div>
                <label class="text-black dark:text-gray-900" for="passwordConfirmation">Gender</label>
                <input id="passwordConfirmation" type="text" name="Gender" required onChange={setdata} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>


            <div>
                <label class="text-black dark:text-gray-900"  for="passwordConfirmation">Date Of Birth</label>
                <input id="date" type="date" required onChange={setdata} name="DOB"  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
            <div>
                <label class="text-black dark:text-gray-900" for="passwordConfirmation">Interest, Skills, Hobbies</label>
                <textarea id="textarea" type="textarea"   onChange={setdata} required name="Interest" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Enter Your Interest, Skills, Hobbies"></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-black">
                Profile
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-900 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="file-upload" class="relative cursor-pointer bg-black rounded-md font-medium text-white hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span class="px-2 py-1">Upload Profile</span>
                      <input onChange={(ev) => {finalfile(ev.target.files[0])}} id="file-upload" name="file-upload" type="file" class="sr-only"/>
                    </label>
                    <p class="pl-1 text-black">or drag and drop</p>
                  </div>
                  <p class="text-xs text-black">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
        </div>
{/* 
        <div class="flex justify-end mt-6">
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
        </div> */}
                {loading ? (
                      <div className="flex mt-10 justify-evenly ">
                     <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                 </div>
                  ) : (
                    <input type="submit" value={"Save"} class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" ></input> 
                  )}
    </form>
</section>
<ToastContainer />
        </>
    )
}
export default SignUp;