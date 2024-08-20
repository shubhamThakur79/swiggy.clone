import React from 'react'
import { GoArrowRight } from 'react-icons/go'
import { RiArrowRightSLine, RiStarSFill } from 'react-icons/ri'

const SearchDishes = ({ data: {

    card: { card: { info: { imageId = "", name, price, isVeg },
        restaurant: { info: { id, name: resName, avgRating, sla: { slaString } } } } } } }) => {
            
    return<div className='bg-white w-[100%] h-[45vh] md:my-4 m-auto rounded-3xl'>
        <div className='border-b cursor-pointer border-dashed text-[#7E808C] border-black/15 flex justify-between  items-center w-full px-4 py-4'>
           
            <div className=''>
                <h1 className='font-bold text-lg text-[#71727c]'>{resName}</h1>
                <div className=''>
                    <p className='flex items-center '>  <RiStarSFill className='text-[#7E808C] text-lg mr-1' /><span>{avgRating}</span><div className="ml-2"> . </div> <span className='ml-2'>{slaString}</span></p>
                </div>
            </div>
            <GoArrowRight className='text-[25px] cursor-pointer' />
        </div>
        <div className='text-[#414142] px-4 py-4 flex items-center justify-between h-[70%] '>
            <div className='w-[65%]'>
               <h1 className='text-[22px] font-bold'>{name}</h1>
               <p className='text-[19px] font-bold mb-3'>₹{price / 100}</p>
               <button className='py-1 border-black/20 text-sm px-2 font-semibold text-[#83858d]  rounded-3xl border flex  items-center'>More Details <RiArrowRightSLine className='inline-block text-lg ' /></button>
            </div>
            <div className='w-[40%] h-[80%] relative'>
               <img className='w-full h-full rounded-2xl object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/" + imageId   } alt={name} />
               <button className='bg-white text-green-600 font-bold text-[18px] sm:text-[20px] rounded-lg drop-shadow px-8 text-center md:px-10 py-[6px] absolute bottom-[-18px] left-1/2 -translate-x-1/2 '>ADD</button>

            </div>
        </div>

    </div>
}

export default SearchDishes