import React, { useContext, useEffect, useState } from 'react';
import OnYourMind from "./OnYourMind";
import TopRestaurant from "./TopRstaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { coordinates } from '../context/contextApi';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';

const Hero = () => {
  const [title, setTitle] = useState('');
  const [title2, setTitle2] = useState('');
  const [TopRestaurantData, setTopRestaurantData] = useState([]);
  const [onYourMind, setOnYourMind] = useState([]);
  const [data, setData] = useState({});
  const [fetchError, setFetchError] = useState(false); // New state for error handling
  const { coord: { lat, lng } } = useContext(coordinates);

  // Fetch data based on location
  async function fetchData() {
    try {
      const response = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response?.statusText}`);
      }

      const result = await response.json();

      // Log the result to debug
      console.log(result);

      // Parse data
      const topBrandsData = result?.data?.cards?.find(card => card?.card?.card?.id === "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      const restaurantGridData = result?.data?.cards?.find(card => card?.card?.card?.id === "restaurent_grid_listing" || card?.card?.card?.["@type"]?.includes("v2.GridWidget") || card?.card?.card === "popular_restaurants_title")?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      const onMindData = result?.data?.cards?.find(card => card?.card?.card?.id === "whats_on_your_mind" || card?.card?.card?.["@type"]?.includes("v2.GridWidget") || card?.card?.card?.title?.includes("What's on your mind?"))?.card?.card?.imageGridCards?.info || [];

      // Update state with fetched data
      setTopRestaurantData(topBrandsData.length ? topBrandsData : restaurantGridData);
      setOnYourMind(onMindData);
      setTitle(result?.data?.cards[1]?.card?.card?.header?.title || '');
      setTitle2(result?.data?.cards[2]?.card?.card?.title || '');
      setData(result?.data);
      setFetchError(false); // Reset error state on successful fetch
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setFetchError(true); // Set error state to true
      setTitle('Data Fetch Error');
    }
  }

  // Fetch data when coordinates change
  useEffect(() => {
    if (lat && lng) {
      fetchData();
    }
  }, [lat, lng]);

  // Filter logic
  const filterValue = useSelector((state => state.filterSlice.filterValue));
  const filteredData = TopRestaurantData.filter(item => {
    if (!filterValue) return true;
    switch (filterValue) {
      case "Ratings 4.0+":
        return item?.info?.avgRating >= 4;
      case "Rs. 300-Rs. 600":
        const cost = parseInt(item?.info?.costForTwo?.slice(1).replace(',', ''));
        return cost >= 300 && cost <= 600;
      case "Offers":
        return !!item?.info?.aggregatedDiscountInfoV3?.header;
      case "Less than Rs. 300":
        return parseInt(item?.info?.costForTwo?.slice(1).replace(',', '')) <= 300;
      default:
        return true;
    }
  });

  // Handle unserviceable location
  if (data?.communication) {
    return (
      <Unserviceable />
    );
  }

  // Show error message if data fetching failed
  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="text-center">
          <h1 className="font-bold text-2xl text-red-500">Failed to load data</h1>
          <p className="font-semibold text-black/70 text-lg">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Main content
  return (
    <div className="w-full" id="top">
      {
        TopRestaurantData.length ? (
          <div className="md:w-[100%] lg:w-[78%] w-[95%] h-full mx-auto mt-3 overflow-hidden">
            <OnYourMind heroDishes={onYourMind} />
            <hr className="mt-16 border" />
            <TopRestaurant data={TopRestaurantData} title={title} />
            <hr className="mt-12 border" />
            <OnlineFoodDelivery data={filterValue ? filteredData : TopRestaurantData} title={title2} />
          </div>
        ) : (
          <div>

            <Shimmer />
            {/* <Unserviceable/> */}
          </div>
        )
      }
    </div>
  );
};

export default Hero;

function Unserviceable() {

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="text-center">
        <img
          className="w-[270px] mb-5"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt="Location Unserviceable"
        />
        <h1 className="font-bold text-2xl">Location Unserviceable</h1>
        <p className="font-semibold text-black/70 text-lg">
          We don’t have any services here till now.<br />Try changing location.
        </p>
      </div>
    </div>
  )
}
export {Unserviceable}