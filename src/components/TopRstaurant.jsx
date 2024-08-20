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
            <div className='flex justify-between pt-1'>
                <div className='mt-10 mb-4'>
                    <h1 className='text-[27px] font-bold font-sans'>{title?.length > 3 ? title : ""}</h1>
                </div>
                <div className='flex gap-5 items-center pr-5 flex-row'>
                    <div
                        onClick={handleLeft}
                        className={`p-3 cursor-pointer rounded-[50%] flex items-center justify-center ${value >= 0 ? "bg-gray-200/80" : "bg-gray-400/30"}`}
                    >
                        <GoArrowLeft className={`${value >= 0 ? "text-gray-400/70" : "text-black"}`} />
                    </div>
                    <div
                        onClick={handleRight}
                        className={`p-3 cursor-pointer bg-gray-200 rounded-[50%] flex items-center justify-center ${value <= -1400 ? "bg-gray-200/80" : "bg-gray-400/30"}`}
                    >
                        <GoArrowRight className={`${value <= -1400 ? "text-gray-400/70" : "text-black"}`} />
                    </div>
                </div>
            </div>

            <div className='flex w-full gap-8 ' >
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