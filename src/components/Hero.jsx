import React, { useContext, useEffect, useState } from 'react';
import OnYourMind from "./OnYourMind"
import TopRestaurant from "./TopRstaurant"
import OnlineFoodDelivery from "./OnlineFoodDelivery"
import { coordinates } from '../context/contextApi';
import { useSelector } from 'react-redux';
import { CgPlayListRemove } from 'react-icons/cg';

const Hero = () => {
  const [title, setTitle] = useState()
  const [title2, setTitle2] = useState()
  const [TopRestaurantData, setTopRestaurantData] = useState([]);
  const [onYourMind, setOnYourMind] = useState([]);
  const [data, setData] = useState({});
  const { coord: { lat, lng } } = useContext(coordinates)

  async function fetchData() {
    try {
      const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
      const data = await response.json();
      // console.log(data?.data.cards[1].card?.card?.gridElements?.restaurants.info || []);
      let maindata = data?.data?.cards?.find((data) => data?.card?.card?.id === "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
      let maindata2 = data?.data?.cards?.find((data) => data?.card?.card?.id === "restaurent_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants || []
    
      setTopRestaurantData(maindata || maindata2);
      let onmindData = data?.data.cards?.find((data) => data?.card?.card?.id === "whats_on_your_mind")?.card?.card?.imageGridCards?.info || []
      setOnYourMind(onmindData)
      setTitle(data?.data?.cards[1].card?.card?.header?.title)
      setTitle2(data?.data?.cards[2]?.card?.card?.title)
      setData(data?.data)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData();
    // setHeroData(data.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
    // console.log(heroData)
  }, [lat, lng]);
  // console.log(TopRestaurantData)

  // console.log(onYourMind)
  const filterValue = useSelector((state => state.filterSlice.filterValue))
  console.log(filterValue)
  const filteredData = TopRestaurantData.filter((item) => {
    if (!filterValue) return true;

    switch (filterValue) {
      case "Ratings 4.0+":
        return item?.info?.avgRating >= 4;

      case "Rs. 300-Rs. 600":
        return item?.info?.costForTwo?.slice(1, 4) >= "300" && item?.info?.costForTwo.slice(1, 4) <= "600";

      case "Offers":
        return item?.info?.aggregatedDiscountInfoV3?.header

      case "Less than Rs. 300":
        return item?.info?.costForTwo?.slice(1, 4) <= "300";
      
   }
  })
  console.log(filteredData)

  if (data?.communication) {
    return <div className=' flex justify-center items-center h-screen w-full '>
      <div className='text-center'>
        <img className='w-[270px] mb-5' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="location_unserviceable" />
        <h1 className='font-bold text-2xl '>Location Unserviceable</h1>
        <p className='font-semibold text-black/70 text-lg'>We don’t have any services here till now.<br />Try changing location.</p>
      </div>
    </div>

  }


  return (
    <div className='w-full '>
      <div className='md:w-[100%] lg:w-[78%] w-[95%] h-full mx-auto mt-3 overflow-hidden '>

        <OnYourMind heroDishes={onYourMind} />
        <hr className='mt-16 border' />
        <TopRestaurant data={TopRestaurantData} title={title} />
        <hr className='mt-12 border' />
        <OnlineFoodDelivery data={filterValue ? filteredData : TopRestaurantData} title={title2} />

      </div>
    </div >
  );
};

export default Hero;
