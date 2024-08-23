import React, { useEffect, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import RestaurantCard from './RestaurantCard';

const TopRestaurant = ({ data, title }) => {
  const [value, setValue] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth * 0.7);
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth * 0.9);
      } else {
        setCardWidth(350);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleRight() {
    if (value > -(cardWidth * (data.length - Math.floor(containerWidth / cardWidth)))) {
      setValue(prev => prev - cardWidth);
    }
  }

  function handleLeft() {
    if (value < 0) {
      setValue(prev => prev + cardWidth);
    }
  }

  useEffect(() => {
    const element = document.getElementById('scrollable-container');
    element.scrollTo({
      left: Math.abs(value),
      behavior: 'smooth'
    });
  }, [value]);

  return (
    <div id="scrollable-container" className="overflow-hidden">
      <div className='flex justify-between relative md:ml-0 md:mx-0 mx-[-20px] md:mr-0 ml-[-1px]'>
        <div className='mt-10 md:mb-4'>
          <h1 className='text-[27px] font-bold font-sans w-max'>
            {title?.length > 3 ? title : ""}
          </h1>
        </div>
        <div className='flex gap-6 items-center flex-row justify-between md:justify-end w-[95%] absolute md:static top-[115px] z-10 md:z-0 left-0 pl-5'>
          <div
            onClick={handleLeft}
            className={`p-3 cursor-pointer rounded-[50%] flex items-center justify-center md:static sticky left-0 ${value >= 0 ? "md:bg-gray-200/80 bg-green-500/50" : "md:bg-gray-400/30 bg-green-500 "}`}
          >
            <GoArrowLeft className={`${value >= 0 ? "md:text-gray-400/70 " : "text-black"}`} />
          </div>
          <div
            onClick={handleRight}
            className={`p-3 sticky left-[100%]  md:static cursor-pointer bg-gray-200 rounded-[50%] flex items-center justify-center ${value <= -(cardWidth * (data.length - Math.floor(containerWidth / cardWidth))) ? "md:bg-gray-200/80 " : "md:bg-gray-400/30 bg-green-500 "}`}
          >
            <GoArrowRight className={`${value <= -(cardWidth * (data?.length - Math.floor(containerWidth / cardWidth))) ? "text-gray-400/70" : "text-black"}`} />
          </div>
        </div>
      </div>

      <div className='flex w-full md:gap-0 gap-0 md:ml-0 ml-[10px] md:mt-0 mt-[-18px] overflow-hidden'>
        {data && data.length > 0 ? (
          data.map((restaurent, i) => (
            <div
              key={i}
              style={{ transform: `translateX(${value}px)` }}
              className="duration-300 md:gap-12"
            >
              <div className='hover:scale-95 duration-300' style={{ width: `${cardWidth}px` }}>
                <RestaurantCard restaurent={restaurent} />
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

export default TopRestaurant;
