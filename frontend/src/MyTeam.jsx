import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DotSpinner } from '@uiball/loaders';
import Navbar from "./Navbar";
import {ref,getStorage ,getDownloadURL} from "firebase/storage";

const UserPage = ()=>{
const navigate = useNavigate();
const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
   const [initial,final] = useState([{
    Gender :"",
    Interest :"",
    Name :"",
    id :"",
    image :"",
   }])
   const [initial2,final2] = useState([{   
    Gender :"",
    Interest :"",
    Name :"",
    id :"",
    image :"",
  }])
   const  searchdata = (e)=>{
    const value = e.target.value;
    console.log(value)
    initial.map((info)=>{
      // console.log(info)
     if(info.Name === value ){
      if(info.id === ""){
        final2((data)=>[
            {   Gender :"",
            Interest :"",
            Name :"",
            id :"",
            image :"",}
        ])
      }
      else{
      final2((data)=>[
        ...data,{
          Gender :info.Gender,
          Interest :info.Interest,
          Name :info.Name,
          id :info.id ,
          image :info.image ,
        }
      ])
    }
     }
    })
  }

const verifyuser = async()=>{
    try {
        axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.get("https://heliverse-backend-beige.vercel.app/myteam");
      const result = response.data.alldata;
        console.log(result)
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
               image:url
              }
            ])
          })
        })   
    } catch (error) {
        alert(error);
    }
}
useEffect(()=>{
    verifyuser();
    // getdata()
},[])


    return(
        <>
		<div className="flex flex-col">
  <Navbar/>
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
                    <button onClick={async()=>{
                        try {
                          const response = await axios.delete(`https://heliverse-backend-beige.vercel.app/deletemember/${info.id}`)
                          final((initial)=>
                          initial.filter(e=>e.id!=info.id)
                          )
                        } catch (error) {
                            alert(error)
                        }
                    }} class="inline-flex m-2 items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>

	Delete
  </button>
                </div>
            </div>
          </>
        )
      })}
    
      </>)}

   

    </div>
  </div>
</section>
	</div>
	</div>
        </>
    )
}
export default UserPage;