import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DotSpinner } from '@uiball/loaders';
import {ref,getStorage ,getDownloadURL} from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar";
const UserPage = ()=>{
const navigate = useNavigate();
const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [iniName,finName] =  useState("");
   const [initial,final] = useState([{
    Gender :"",
    Interest :"",
    Name :"",
    id :"",
    image:""
   }])
   const [initial2,final2] = useState([{   
    Gender :"",
    Interest :"",
    Name :"",
    id :"",
    image:""
  }])
   const  searchdata = (e)=>{
    const value = e.target.value;
    console.log(value)
    initial.map((info)=>{
      // console.log(info)
     if(info.Name === value ){
      if(info.id === ""){
        final2((data)=>[
            {     Gender :"",
            Interest :"",
            Name :"",
            id :"",
            image:""}
        ])
      }
      else{
      final2((data)=>[
        ...data,{
          Gender :info.Gender,
          Interest :info.Interest,
          Name :info.Name,
          id :info.id ,
          image:info.image
        }
      ])
    }
     }
    })
  }

const verifyuser = async()=>{
    try {
        axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("http://localhost:5000/postlist");
      const result = response.data.alldata;
      const Name = response.data.Name;
      finName(Name);
      result.map((info)=>{
        const storage = getStorage();
        const imgref = ref(storage,`project/${info.image}`);
        getDownloadURL(imgref).then((url) => {
        
            final((data)=>[
              ...data,{
               Gender : info.Gender,
               Interest : info.Interest,
               Name : info.Name,
               id : info._id,
               image : url,
              }
            ])
          })
          })
    } catch (error) {
      toast(error);
        // navigate("/");
    }
}

const addTeam = async(id)=>{
  try {
    const response = await axios.post(`http://localhost:5000/myteam/${id}`)
    toast("Successfully add...")
  } catch (error) {
    toast(error)
    console.log(error);
  }
}

useEffect(()=>{
    verifyuser();
    // getdata()
},[])
    return(
        <>
		<div className="flex flex-col">
    <nav class="relative px-4 py-4 flex flex-col sm:flex-row justify-between bg-blue-900 items-center ">
            <div className="flex w-full mb-2 sm:mb-0 sm:w-[70%] lg:w-[90%] justify-between">

       
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

        <div class="flex items-center mt-1 sm:mt-0 justify-center w-full sm:w-[30%] ">
    <div class="relative  text-gray-600 focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
      <input  onChange={searchdata} type="search" name="q" class="py-2 text-sm w-[80vw] sm:w-[25vw] lg:w-[20vw]  text-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search By Name..." />
    </div>
       </div>

	  </nav>
	<div>
	<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex text-black justify-evenly flex-wrap -m-4">
      {(initial2.length>1)?(<>
      {console.log(initial2)}
        {initial2.map((info)=>{
          console.log(info)
       if(!info.id) return null;
       return(
        <>
          <div class="container w-[80%] sm:w-[45%]  lg:w-[25%] m-2  md:w-[45%]    bg-white  shadow-lg    transform   duration-200 easy-in-out">   
              <div class="flex justify-center px-5 ">
                  <img class="h-32 w-32 bg-white p-2 rounded-full   " src={info.image} alt="" />

              </div>
              <div class=" ">
                  <div class="text-center px-14">
                      <h2 class="text-gray-800 text-3xl font-bold">{info.Name}</h2>
                      <a class="text-gray-400 mt-2 hover:text-blue-500" href="https://www.instagram.com/immohitdhiman/" target="BLANK()">@immohitdhiman</a>
                      <p class="mt-2 text-gray-500 text-sm">{info.Interest} </p>
                  </div>
                  <hr class="mt-6" />
              </div>
          </div>
        </>
      )
      })}
      </>):(<>
        {(initial.length==1)?(<>
        <div className="flex flex-col justify-evenly m-auto">
                     <div className="hidden mt-32 md:flex justify-evenly mx-auto">
        <DotSpinner size={100} speed={0.9} color="pink" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={100} speed={0.9} color="green" className="flex items-center  justify-center mx-auto" />
                     <DotSpinner size={100} speed={0.9} color="black" className="flex items-center  justify-center mx-auto" />
                     </div>
                     </div>           
      </>):(<>
        {initial.map((info)=>{
        
        if(!info.id) return null;
        return(
          <>
            <div class="container w-[80%] sm:w-[45%]  lg:w-[25%] m-2  md:w-[45%]    bg-white  shadow-lg    transform   duration-200 easy-in-out">   
                <div class="flex justify-center px-5 ">
                    <img class="h-32 w-32 bg-white p-2 rounded-full   " src={info.image} alt="" />

                </div>
                <div class=" ">
                    <div class="text-center px-14">
                        <h2 class="text-gray-800 text-3xl font-bold">{info.Name}</h2>
                        <a class="text-gray-400 mt-2 hover:text-blue-500" href="https://www.instagram.com/immohitdhiman/" target="BLANK()">@immohitdhiman</a>
                        <p class="mt-2 text-gray-500 text-sm">{info.Interest} </p>
                    </div>
                    <hr class="mt-6" />
                </div>
                <button onClick={()=>addTeam(info.id)} class="inline-flex items-center mx-2 mb-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
	</svg>
Join
  </button>
            </div>
          </>
        )
      })}
      </>)}
      </>)}

   

    </div>
  </div>
</section>
	</div>
	</div>
  <ToastContainer />
        </>
    )
}
export default UserPage;