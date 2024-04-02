import React from "react";
import img1 from "../public/image1.png"
import { Link } from "react-router-dom";

const Home = ()=>{
    return(
        <>
        <div>
        <section className="  dark:text-gray-100">
	<div className="container flex flex-col-reverse justify-center items-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-evenly">
		<div className="flex flex-col justify-center px-2 p-6 text-center rounded-sm lg:max-w-md xl:max-w-[40%] lg:text-left">
			<h1 className="text-5xl font-bold leadi sm:text-6xl">Ac mattis
			</h1>   
				<span className="text-2xl sm:text-6xl py-2 dark:text-violet-400">senectus erat pharetra<span className="sm:text-6xl dark:text-red-400"> senectus </span></span>
				
			<p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
				<br  className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
				<br   className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
				<br   className="hidden md:inline lg:hidden" />turpis pulvinar, est scelerisque ligula sem
			</p>
			<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
				<Link to={"/login"} rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Sign In</Link>
				<Link to={"/signup"} rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100">Sign Up</Link>
			</div>
		</div>
		<div className="flex items-center justify-center p-6  mt-2 lg:mt-10 h-60 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
			<img src={img1} alt="" className="object-contain  h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
		</div>
	</div>
</section>
</div>
        </>
    )
}
export default Home;