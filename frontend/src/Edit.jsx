import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { DotSpinner } from '@uiball/loaders';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = ()=>{
const navigate = useNavigate();
const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
   const [initial,final] = useState({
    Gender :"",
    Interest :"",
    Name :"",
    id :"",
    Email:"",
    DOB:""
   })
   const verifyuser = async()=>{
    try {
        axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:5000/myprofile");
      const result = response.data.user;
      console.log(result)
            final(
              {
               Gender : result.Gender,
               Interest : result.Interest,
               Name : result.Name,
               Email : result.Email,
               DOB : result.DOB,
               id : result._id,
              }
            )
    } catch (error) {
        toast(error);
    }
}

const savedata = async(event)=>{
    event.preventDefault();
    try {
        setLoading(true);
    const {Name,Email,Interest,Gender,DOB,id} = initial;
        const response = await axios.post(`http://localhost:5000/editprofile/${id}`,{
            Name,Email,Interest,Gender,DOB
        })
        toast("Successfully Update ...")
        setLoading(false);
        setTimeout(()=>{
         navigate("/postlist")
        },1000)
} catch (error) {
    setLoading(false);
        toast(error);
}
}

const setdata = (event)=>{
    const {name,value} = event.target;
    final((info)=>{
        return{
        ...info,
        [name] : value
        }
    })
}


useEffect(()=>{
    verifyuser();
},[])
console.log(initial)
    return(
        <>
        		<div className="flex flex-col">
       <Navbar/>
       <section class="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-200 mt-10">
    <h1 class="text-xl font-bold text-black capitalize dark:text-black">Sign Up</h1>
    <form onSubmit={savedata} method="POST">
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="text-black dark:text-gray-900" for="username">Username</label>
                <input onChange={setdata} autoComplete="off" value={initial.Name} name="Name" id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>

            <div>
                <label class="text-black dark:text-gray-900"  for="emailAddress">Email Address</label>
                <input onChange={setdata} name="Email" id="emailAddress" value={initial.Email} type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
            <div>
                <label class="text-black dark:text-gray-900" for="passwordConfirmation">Gender</label>
                <input id="passwordConfirmation" type="text" name="Gender" value={initial.Gender} required onChange={setdata} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>


            <div>
                <label class="text-black dark:text-gray-900"  for="passwordConfirmation">Date Of Birth</label>
                <input id="date" type="date" required onChange={setdata} name="DOB" value={initial.DOB}  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"/>
            </div>
            <div>
                <label class="text-black dark:text-gray-900" for="passwordConfirmation">Interest, Skills, Hobbies</label>
                <textarea id="textarea" type="textarea"   onChange={setdata} required name="Interest" value={initial.Interest} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-100 dark:text-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Enter Your Interest, Skills, Hobbies"></textarea>
            </div>
        </div>

                {loading ? (
                      <div className="flex mt-10 justify-evenly ">
                     <DotSpinner size={40} speed={0.9} color="white" className="flex items-center  justify-center mx-auto" />
                 </div>
                  ) : (
                    <input type="submit" value={"Save"} class="px-6 mt-2 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600" ></input> 
                  )}
    </form>
</section>
	</div>
    <ToastContainer />
        </>
    )
}
export default Edit;