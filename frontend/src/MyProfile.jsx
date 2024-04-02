import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DotSpinner } from '@uiball/loaders';
import Navbar from "./Navbar";
import {ref,getStorage ,getDownloadURL} from "firebase/storage";

const MyProfile = ()=>{
const navigate = useNavigate();
const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
   const [initial,final] = useState({
    Gender :"",
    Interest :"",
    Name :"",
    id :"",
    Email:"",
    DOB:"",
    image:""
   })
 const [initial2,final2] = useState();
   const verifyuser = async()=>{
    try {
        axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("https://heliverse-backend-beige.vercel.app/myprofile");
      const result = response.data.user;
      const storage = getStorage();
      const imgref = ref(storage,`project/${result.image}`);
      getDownloadURL(imgref).then((url) => {
            final(
              {
               Gender : result.Gender,
               Interest : result.Interest,
               Name : result.Name,
               Email : result.Email,
               DOB : result.DOB,
               id : result._id,
               image:url
              }
            )
          })
      final2(initial)  ;
    } catch (error) {
        alert(error);
        navigate("/");
    }
}
useEffect(()=>{
    verifyuser();
},[])
    return(
        <>
        		<div className="flex flex-col">
       <Navbar/>
       <div class="max-w-xl mx-auto my-10 bg-white rounded-lg shadow-md p-5">
    <img class="w-32 h-32 rounded-full mx-auto" src={initial.image} alt="Profile picture"/>
    <h2 class="text-center text-2xl font-semibold mt-3">{initial.Name}</h2>
    <p class="text-center text-gray-600 mt-1">{initial.Email}</p>
    <div class="flex justify-center mt-5">
      <h1 href="#" class="text-blue-500 hover:text-blue-700 mx-3">{initial.Gender}</h1>
      <h1 href="#" class="text-blue-500 hover:text-blue-700 mx-3">{initial.DOB}</h1>
    </div>
    <div class="mt-5">
      <h3 class="text-xl font-semibold">Interest</h3>
      <p class="text-gray-600 mt-2">{initial.Interest}</p>
    </div>
    <div className="flex justify-between items-center">
    <button onClick={()=>navigate("/edit")} class="inline-flex items-center  mt-10 mb-2 px-4 py-2 bg-green-200 hover:bg-green-300 text-gray-800 text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
	</svg>
Edit
  </button>
    <button onClick={()=>{
      localStorage.removeItem("token")
      navigate("/")
    }} class="inline-flex items-center ml-2  mt-10 mb-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-100 text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
	</svg>
Log Out
  </button>
  </div>
  </div>
	</div>
        </>
    )
}
export default MyProfile;