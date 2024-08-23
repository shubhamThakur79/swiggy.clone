import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue } from '../Utils/filterslice';

const OnlineFoodDelivery = ({ data, title }) => {
    // console.log(data);
    const filterOptions = [
        {
            filterBtn: "Ratings 4.0+"
        },
        {
            filterBtn: "Rs. 300-Rs. 600"
        },
        {
            filterBtn: "Offers"
        },
        {
            filterBtn: "Less than Rs. 300"
        },
       
    ]
    const [activeBtn, setActiveBtn] = useState(null)
    const dispatch = useDispatch()

    function handlefilters(filterName) {
        // console.log(filterName)
        setActiveBtn(activeBtn === filterName ? null : filterName)
    }
    dispatch(setFilterValue(activeBtn))

    return (
        <>
            <h1 className='sm:text-2xl text-[22px]  font-bold mt-7 mb-3'>{title?.length > 3 ? title : ""} </h1>
            <div>
                {
                    filterOptions.map((option, i) => {
                        return (
                            <button
                                onClick={() => handlefilters(option?.filterBtn)}
                                key={i}
                                className={`${activeBtn === option.filterBtn ? " activeBtn" : ""} border text-slate-900 font-semibold border-black/15 drop-shadow-xl rounded-3xl md:mx-2  mx-1 px-2 md:px-3 py-1 md:py-2 my-2 md:my-4`}
                            >
                                <div className='parent flex items-center flex-wrap '>
                                    <p>{option?.filterBtn}</p>

                                    {activeBtn === option?.filterBtn && (
                                        <IoIosClose className='font-semibold mb-[3px] text-xl ml-2 cursor-pointer' />
                                    )}
                                </div>
                            </button>
                        );
                    })
                }

            </div>

            <div className='gap-3 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4  m-auto w-full'>
                {data && data?.length > 0 ? (
                    data?.map((restaurent, i) => (
                        <div key={i} className="hover:scale-95 duration-300 mb-[-20px] ">
                            <div
                                className='hover:scale-95 duration-300  sm:ml-0 md:w-[80%]'
                                style={{ transform: 'scale(0.9)' }} 
                            >
                                <RestaurantCard restaurent={restaurent} link={restaurent?.cta} />
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Loading, please wait...</h1>
                )}
            </div>
        </>
    );
}

export default OnlineFoodDelivery;
