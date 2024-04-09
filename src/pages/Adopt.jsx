import React from "react";
import { useEffect, useState } from "react";
import Adoptcardlist from "../templates/Adoptcardlist"
import Pagination from "../templates/Pagination"
import Navbar from "../templates/Navbar";
import Dropdown from "../templates/Dropdown"
import background from "../images/bg_2.jpg"
import dogfilter from "../images/dog_filter.png"
import dogpeek from "../images/dog_peek.png"
import data from "../lists/dogs";

export default function Shop() {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);


    return (
        <div div className=" h-screen bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />
            <div className="flex w-full h-5/6">
                <div className="flex flex-col w-3/12 justify-between items-center">
                    <div className="flex flex-col items-center">
                        <img className="mt-5 mb-3" src={dogfilter} alt="" />
                        <button className="w-6 h-6 rounded-full bg-orange-600">
                            <svg className=" mx-auto mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                    </div>


                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="font-Roboto font-medium text-base">BREED</h1>
                        <Dropdown />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="font-Roboto font-medium text-base">GENDER</h1>
                        <Dropdown />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="font-Roboto font-medium text-base">AGE</h1>
                        <Dropdown />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="font-Roboto font-medium text-base">COLOR</h1>
                        <Dropdown />
                    </div>
                    <img className="w-6/12 min-h-24 " src={dogpeek} alt="" />

                </div>
                <div className="py-6 flex justify-start flex-wrap gap-y-16 overflow-y-auto max-h-full w-9/12 ">
                    <Adoptcardlist adoptData={currentPosts} />

                    <div className="flex justify-center basis-full ">
                    <Pagination
                            totalPosts={data.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}