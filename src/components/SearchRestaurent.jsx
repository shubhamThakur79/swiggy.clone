import React from 'react'
import { RiStarSFill } from 'react-icons/ri'

const SearchRestaurent = ({ data: {
    card: { card: { info: { id, avgRating, aggregatedDiscountInfoV3 = {},
        promoted = false, costForTwoMessage, cuisines, name: dishName, cloudinaryImageId,
        sla: { slaString } } } } } }) => {
            console.log(aggregatedDiscountInfoV3)
            let arr = cuisines.join(", ")
    return (
        <div className='bg-[#FFFFFF] w-[95%] mt-0 md:mt-4 max-h-[20px] min-h-[200px] m-auto  flex md:p-4 justify-between'>

            <div className='md:w-[25%] w-[27%] h-[135px] relative mt-[10px] mb-[20px]'>
                <img className='w-full min-h-[90%] max-h-[90%] object-cover rounded-2xl' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" + cloudinaryImageId} alt={dishName} />
                <button className='bg-white text-center text-[#FF6913] font-bold  rounded-lg drop-shadow px-6  md:px-4 py-[2px] absolute bottom-[4px] left-1/2 -translate-x-1/2 '>
                <p className='text-[14px line-clamp-1'>{aggregatedDiscountInfoV3?.header}</p>
                <p className='text-[8px] text-center w-max'>{aggregatedDiscountInfoV3?.subHeader}</p>
                </button>

            </div>
            <div className='text-[#414142] ml-3 md:ml-[-8px] flex items-center  justify-between w-[70%] h-full '>
                <div className='w-[100%] h-full pt-[25px] md:pt-[35px]'>
                    <h1 className='text-[18px] font-bold'>{dishName}</h1>
                    <p className='flex items-center text-[14px] font-semibold w-max'>  <RiStarSFill className='text-[#7E808C] text-lg mr-1' /><span>{avgRating}</span><div className="ml-2"> . </div> <span className='ml-2'>{slaString}</span><div className="ml-2"> . </div><span>{costForTwoMessage}</span></p>
                   <p className='text-[14px] font-semibold opacity-80 line-clamp-1'>{arr}</p>
                </div>

            </div>

        </div>
    )
}

export default SearchRestaurent