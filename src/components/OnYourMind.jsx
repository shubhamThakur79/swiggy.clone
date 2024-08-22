import React, {  useState } from 'react'
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { MenuShimmer } from './Shimmer';


const OnYourMind = ({heroDishes}) => {

    const [value, setValue] = useState(0);


    function handleRight() {
        value <= -1320 ? "" : setValue((prev) => prev - 440);

    }

    function handleLeft() {
        value >= 0 ? "" : setValue(prev => prev + 440);
    }
    // console.log(value)
    return (
        <>
        <h1 className='md:hidden text-[23px] font-bold font-sans text-[#FF5D0D] mb-[-50px] mt-1 ml-1'>What's on your mind?</h1>
        <div className='hidden md:block'>
            <div className='flex justify-between pt-1'>
                <div>
                    <h1 className='text-[26px] font-bold font-sans'>What's on your mind?</h1>
                </div>
                <div className='flex gap-5 items-center pr-5 flex-row'>
                    <div
                        onClick={handleLeft}
                        className={`md:p-3 p-2 cursor-pointer rounded-[50%] flex items-center justify-center ${value >= 0 ? "bg-gray-200/80" : "bg-gray-400/30"}`}
                    >
                        <GoArrowLeft className={`${value >= 0 ? "text-gray-400/70" : "text-black"}`} />
                    </div>
                    <div
                        onClick={handleRight}
                        className={`md:p-3 p-2 cursor-pointer bg-gray-200 rounded-[50%] flex items-center justify-center ${value <= -1320 ? "bg-gray-200/80" : "bg-gray-400/30"}`}
                    >
                        <GoArrowRight className={`${value <= -1320 ? "text-gray-400/70" : "text-black"}`} />
                    </div>
                </div>
            </div>

            <div className='flex'>
                {heroDishes && heroDishes.length > 0 ? (
                   heroDishes.map((item, i) => (
                        <div
                            key={i}
                            style={{ transform: `translateX(${value}%)` }}
                            className="flex-shrink-0 duration-300"
                        >
                            <img
                                className="w-[160px] object-cover"
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.imageId}`}
                                alt=""
                            />

                          
                        </div>
                    ))
                ) : (
                    <MenuShimmer/>
                )}
            </div>
        </div>
        </>
    );
};

export default OnYourMind