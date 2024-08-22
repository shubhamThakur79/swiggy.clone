import React, { useEffect, useState } from 'react'
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import RestaurantCard from './RestaurantCard';

const TopRstaurant = ({ data, title }) => {
    const [value, setValue] = useState(0);


    // data.map((restaurent)=>{
    //     console.log(restaurent)
    // })

    function handleRight() {
        value <= -1400 ? "" : setValue(prev => prev - data.length * 30);

    }

    function handleLeft() {
        value >= 0 ? "" : setValue(prev => prev + data.length * 30);
    }
    // console.log(value)
    return (
        <div className=''>
            <div className='flex justify-between relative md:ml-0  md:mx-0 mx-[-20px] md:mr-0 ml-[-1px]'>
                <div className='mt-10 md:mb-4'>
                    <h1 className='text-[27px] font-bold font-sans w-max'>{title?.length > 3 ? title : ""}</h1>
                </div>
                <div className='flex gap-8 items-center  flex-row justify-between md:justify-end w-[95%] absolute md:static top-[115px] z-30'>
                    <div
                        onClick={handleLeft}
                        className={`md:p-3 p-2 cursor-pointer rounded-[50%] flex items-center justify-center ${value >= 0 ? "md:bg-gray-200/80 bg-green-500/50" : "md:bg-gray-400/30 bg-green-500 "}` }
                    >
                        <GoArrowLeft className={`${value >= 0 ? "md:text-gray-400/70 " : "text-black"}`} />
                    </div>
                    <div
                        onClick={handleRight}
                        className={`md:p-3 p-2 cursor-pointer bg-gray-200 rounded-[50%] flex items-center justify-center ${value <= -1400 ? "md:bg-gray-200/80 " : "md:bg-gray-400/30 bg-green-500 "}`}
                    >
                        <GoArrowRight className={`${value <= -1400 ? "text-gray-400/70" : "text-black"}`} />
                    </div>
                </div>
            </div>

            <div className='flex w-full md:gap-7 gap-10 md:ml-0 ml-[19px] md:mt-0 mt-[-18px]' >
                {data && data.length > 0 ? (
                    data.map((restaurent, i) => (
                        <div

                            key={i}
                            style={{ transform: `translateX(${value}%)` }}
                            className=" duration-300 gap-12  "
                        >
                            <div className='hover:scale-95 duration-300'>

                                <RestaurantCard restaurent={restaurent}  />

                            </div>

                        </div>
                    ))
                ) : (
                    <h1>Loading, please wait...</h1>
                )}
            </div>
        </div>
    );
};



export default TopRstaurant