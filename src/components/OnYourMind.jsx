import React, {  useState } from 'react'
import { GoArrowLeft, GoArrowRight } from "react-icons/go";


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
        <div className=''>
            <div className='flex justify-between pt-1'>
                <div>
                    <h1 className='text-[27px] font-bold font-sans'>What's on your mind?</h1>
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
                        className={`p-3 cursor-pointer bg-gray-200 rounded-[50%] flex items-center justify-center ${value <= -1320 ? "bg-gray-200/80" : "bg-gray-400/30"}`}
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
                                className="w-[170px] object-cover"
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                                alt=""
                            />

                          
                        </div>
                    ))
                ) : (
                    <h1>Loading, please wait...</h1>
                )}
            </div>
        </div>
    );
};

export default OnYourMind