import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../templates/Navbar";
import background from "../images/bg_1.jpg"
import leftarrow from "../icons/left-arrow.svg"
import cat from "../images/cat_peek.png"
import dog from "../images/dog_1.png"


export default function Home() {
    return (
        <div className="relative bg-fixed bg-no-repeat bg-center bg-cover h-screen" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />

            
            <div className=" flex flex-col h-full">

                <div className=" flex flex-col justify-center items-center h-full">
                    <div className= "w-10/12 mt-24 text-center">
                    
                        <h1 className=" text-4xl sm:text-6xl font-semibold text-black">Get your family a new member.</h1>
                        <h2 className=" text-lg sm:text-2xl mt-2 text-black">Open your doors and hearts to pets in need of a home and it will be thankful to you for the rest of their lives.</h2>

                    </div>

                    <NavLink to="/adopt" className="mt-5 self-center flex justify-center items-center w-40 h-12 bg-white rounded-full shadow-md shadow-zinc-950/50 hover:bg-red-200/50 active:bg-red-200">
                        <h2 className="font-semibold text-base sm:text-xl text-black">ADOPT</h2>
                        <img className="w-6 sm:w-8 ml-2" src={leftarrow} alt="" />
                    </NavLink>

                    <img className="w-48 sm:w-96 h-24 sm:h-36 self-start" src={cat} alt="" />

                </div>

                <div className=" flex justify-center items-center h-full">
                    <img className="absolute mb-10 sm:mb-20 w-1/3 sm:w-1/2 h-1/3 sm:h-1/2" src={dog} alt="" />
                    <div className=" flex flex-col justify-around items-center w-11/12 sm:w-11/12 h-44 bg-white bg-opacity-70 z-10 mt-10 sm:mt-44 rounded-l-3xl shadow-md shadow-zinc-950/50">
                        <div className="text-center">
                            <h1 className="mb-2 sm:mb-4 font-bold text-xl sm:text-3xl text-black">544</h1>
                            <h2 className="text-sm sm:text-base text-zinc-600 text-black">Waiting for home</h2>
                        </div>
                        <div className="text-center">
                            <h1 className="mb-2 sm:mb-4 font-bold text-xl sm:text-3xl text-black">756</h1>
                            <h2 className="text-sm sm:text-base text-zinc-600 text-black">Adopted last year</h2>
                        </div>
                        <div className="text-center">
                            <h1 className="mb-2 sm:mb-4 font-bold text-xl sm:text-3xl text-black">422</h1>
                            <h2 className="text-sm sm:text-base text-zinc-600 text-black">Rescued</h2>
                        </div>
                    </div>
                </div>

            </div>


        </div>


    )

}
