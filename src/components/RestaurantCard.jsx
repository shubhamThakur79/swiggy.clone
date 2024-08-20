import React from 'react';
import { MdOutlineStar } from 'react-icons/md';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurent, link }) => {
    // console.log(link?.link?.split("/")[4])
    
    return (
        <Link to={`/restaurantMenu/${link != undefined ? link?.link?.split("/")[4] : restaurent?.info?.id}`}>
            <div>
                <div className='restaurant-card  w-[400px] h-[230px] sm:w-[290px] sm:h-[190px] relative rounded-xl overflow-hidden '>
                    <img className='h-full w-full object-cover ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/` + restaurent?.info?.cloudinaryImageId} alt="" />
                    <div className='absolute bottom-0  bg-gradient-to-t from-black/90 from-1% w-full h-full to-black/10 to-70%'></div>
                    <p className='absolute bottom-0 text-white text-2xl font-bold  mx-2 mb-[5px]'>{restaurent?.info.aggregatedDiscountInfoV3?.header} {" "} {restaurent?.info.aggregatedDiscountInfoV3?.subHeader}</p>
                </div>

                <div className='mt-2 ml-2 '>
                    <h1 className='font-bold text-[19px] text-black/90'>{restaurent?.info?.name}</h1>
                    <p className='flex items-center gap-1 text-[19px] font-semibold font-sans'>
                        <MdOutlineStar className='text-white py-[2px] px-[2px] bg-green-700 h-5 w-5 rounded-xl' />
                        {restaurent?.info?.avgRatingString}
                        <span>{restaurent?.info?.sla?.slaString}</span>
                    </p>
                    <div className='font-medium text-lg text-gray-500'>
                        <span className='line-clamp-1'>
                            {restaurent?.info?.cuisines?.join(", ")}
                        </span>
                        <span>{restaurent?.info?.locality}</span>
                    </div>
                </div>

            </div>

        </Link>
    )
};

export default RestaurantCard;
