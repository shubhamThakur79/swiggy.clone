import React from 'react'
import { CiLineHeight } from 'react-icons/ci'

const Discount = ({ discountData: { info: { header, couponCode, offerLogo } } }) => {
    // console.log(info)

    return (

        <div className='w-[338px] h-[76px] flex-shrink-0 '>
            <div className=' flex gap-2 h-full w-full items-center p-4 rounded-2xl  border border-gray-500/30'>
            <img className='w-14' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="" />
            <div>
                <h1 className='text-xl font-[700] line-clamp-1'>{header}</h1>
                <h1 className='twxt-lg font-semibold text-gray-600/80 line-clamp-1'>{couponCode}</h1>
            </div>

            </div>
        </div>

    )
}

export default Discount