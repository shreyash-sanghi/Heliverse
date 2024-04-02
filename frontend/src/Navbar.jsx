import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = ()=>{
const navigate = useNavigate();
const token = localStorage.getItem("token");
   const [iniName,finName] =  useState("");


const verifyuser = async()=>{
    try {
        axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:5000/postlist");
      const Name = response.data.Name;
      finName(Name);
    } catch (error) {
        alert(error);
        navigate("/");
    }
}
useEffect(()=>{
    verifyuser();
},[])
// console.log(initial)
    return(
        <>
        <nav class="relative px-4 py-4 flex flex-col sm:flex-row justify-between bg-blue-900 items-center ">
            <div className="flex w-full mb-2 sm:mb-0 sm:w-full justify-between">

       
		<Link to={"/postlist"} class="text-lg sm:text-3xl text-white	  font-bold leading-none" href="#">
			My Post
		</Link>
         <div>  
        {(iniName=="")?(<>
		<Link to={"/login"} class="hidden mr-1 sm:ml-auto sm:mr-3 py-2 px-2 sm:px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="#">{iniName}</Link>
		</>):(<>
		<Link to={"/myprofile"} class="sm:inline-block mr-2  sm:ml-auto sm:mr-3 py-2 px-2 sm:px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="#">{iniName}</Link>
		</>)}
		<button onClick={()=>{
             navigate("/createteam")
		}} class="sm:inline-block py-2 px-2 sm:px-6 sm:mr-3  bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Create a team</button>
         		<button onClick={()=>{
             navigate("/myteam")
		}} class="sm:inline-block py-2 px-2 sm:px-3 bg-green-200 hover:bg-blue-400 text-sm text-black font-bold rounded-xl transition duration-200" href="#">My team</button>
         </div>
     </div>

  

	  </nav>
        </>
    )
}
export default Navbar;