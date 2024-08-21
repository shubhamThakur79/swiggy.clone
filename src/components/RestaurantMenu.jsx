import { data } from 'autoprefixer';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoIosInformationCircle, IoIosSearch } from "react-icons/io";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { RiMoonClearLine, RiStarSFill } from "react-icons/ri";
import { IoIosWarning } from "react-icons/io";


import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { MdOutlineStar } from 'react-icons/md';
import Discount from './Discount';
import { cartContext, cartInfo } from '../context/contextApi';
import { BsCartCheckFill } from "react-icons/bs";

import Cart from './Cart';
import { toast } from 'react-toastify';
import { MenuShimmer } from './Shimmer';
// import SignIn from './SignIn';



const RestaurantMenu = () => {
    let { id } = useParams();
    let mainId = id.split("-").at(-1)

    const [resInfo, setResInfo] = useState([])
    const [menuData, setMenuData] = useState([])
    const [discountData, setDiscountData] = useState([])
    const [topPicks, setTopPicks] = useState([])
    const [value, setValue] = useState(0);
    const { info, setInfo } = useContext(cartInfo)

    function handleRight() {
        value <= -160 ? "" : setValue((prev) => prev - 40);

    }

    function handleLeft() {
        value >= 0 ? "" : setValue(prev => prev + 40);
    }
    async function fetchMenu() {
        let res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        let data = await res?.json()
        const resInfo = data?.data?.cards?.find((data)=>data?.card?.card?.["@type"].includes(("food.v2.Restaurant")))?.card?.card?.info;
        const discountInfo = data?.data?.cards?.find((data)=>data?.card?.card?.["@type"].includes(("v2.GridWidget")))?.card?.card?.gridElements?.infoWithStyle?.offers || []
        setResInfo(resInfo)
        setDiscountData(discountData)
        
        let actualMenuData = data?.data?.cards?.find((data)=>data?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((data) => {
            return data?.card?.card?.itemCards || data?.card.card?.categories
        })
        setMenuData(actualMenuData || [])
        // console.log(data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((data) => {
        //     return data?.card?.card?.title === "Top Picks"
        // }))
        let topItems = data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((data) => {
            return data?.card?.card?.title === "Top Picks"
        })
        setTopPicks(topItems[0]?.card?.card?.carousel)
        // console.log(topPicks)
    }



    useEffect(() => {
        fetchMenu()
    }, [])



    return (
        <div className='w-full  h-full '>
            {
                menuData.length ? <div className='md:w-[800px] w-[95%] overflow-hidden mx-auto min-h-screen'>
                <span className='text-[12px]   text-gray-600/60 font-semibold mt-7 mb-9   inline-block'><Link className='hover:text-gray-800/80 cursor-pointer' to="/">Home </Link><span> / </span><Link to={"/"} className='hover:text-gray-800/80 cursor-pointer'>{resInfo?.city} <span> / </span>  </Link><span className='text-gray-800/80'>{resInfo.name}</span></span>
                <h1 className='text-[27px] font-[700]'>{resInfo?.name}</h1>
                <div className='w-full h-[210px]  rounded-3xl mt-3  bg-gradient-to-t from-slate-300/70 px-4 pb-4  '>
                    <div className='w-full  h-full p-4 border border-slate-300/50 bg-white rounded-3xl'>
                        <div className='flex items-center text-[20px] font-semibold gap-1 '>
                            <MdOutlineStar className='text-white py-[2px] px-[2px] bg-green-700 h-5 w-5 rounded-xl' />
                            <span>{resInfo?.avgRating} ({resInfo?.totalRatingsString}) {" . "} {resInfo?.costForTwoMessage}</span>
                        </div>
                        <h1 className='font-bold text-[#FF5200] underline cursor-pointer'>{
                            resInfo?.cuisines?.join(", ")
                        }
                        </h1>

                        <div className='flex items-center mt-2'>
                            <div className='flex flex-col w-7 items-center'>
                                <div className='h-[7px] w-[7px] rounded-full bg-gray-400/70'></div>
                                <div className='h-7 w-[1px] bg-gray-400/70'></div>
                                <div className='h-[7px] w-[7px] rounded-full bg-gray-400/70 '></div>
                            </div>
                            <div>
                                <p className='font-bold text-[17px]'>Outlet <span className='font-medium text-[16px] ml-2 text-gray-800/80'>{resInfo?.locality}</span></p>
                                <p className='font-bold text-[17px]'>{resInfo?.sla?.slaString}</p>
                            </div>

                        </div>
                        <hr className='mt-4 w-full px-[0px]' />
                        <div className='w-full flex items-center gap-1 mt-2'>

                            <h1 className='text-[16px] font-medium text-gray-600 flex items-center gap-2'>
                                {resInfo?.expectationNotifiers?.length > 0 ?
                                    (<>


                                        <div className='h-full'>
                                            <img className='w-6' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/${resInfo?.feeDetails?.icon}`} alt="" />

                                        </div>
                                        <span className='  '>{resInfo.expectationNotifiers[0]?.enrichedText.replace(/<[^>]*>/g, " ")}</span> </>) : (<p className='text-lg text-red-500 font-mono'>Currently not availible</p>)}

                            </h1 >
                        </div>
                    </div>
                </div>

                {/* new from on your Mind component */}
                <div className='w-full'>
                    <div className='flex justify-between pt-1  mt-6'>
                        <div>
                            <h1 className='text-[23px] font-bold font-sans'>Deals for you</h1>
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

                    {/* Discount Data */}

                    <div style={{ transform: `translateX(${value}%)` }}

                        className='flex gap-6 w-full mt-[10px] cursor-pointer  duration-500'>
                        {discountData.map((data, i) => {

                            return <div key={i} className=''>
                                <Discount discountData={data} />
                            </div>
                        })}
                    </div>
                </div>

                <h1 className='text-center mt-16 font-semibold text-gray-600/90 tracking-widest'>MENU</h1>

                {/* Link for search btn  items Comming Here  */}

                <div className='w-full mt-6 cursor-pointer'>
                    <div className='w-full relative text-[18px] text-gray-600/90 font-medium  text-center py-[14px] rounded-xl bg-gray-200/90'>Search for dishes <IoIosSearch className='absolute right-3 bottom-4 text-2xl font-semibold' /></div>
                </div>

                {/* Top Picks Here */}
                {

                    topPicks && <div className='w-full'>
                        <div className='flex justify-between pt-1  mt-6'>
                            <div>
                                <h1 className='text-[23px] font-bold font-sans'>{topPicks.length >= 0 && topPicks?.card?.card?.title || "Top Picks"}</h1>
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


                        <div style={{ transform: `translateX(${value}%)` }}

                            className='flex gap-4 w-full mt-[10px] cursor-pointer duration-500'>
                            {topPicks.map(({ creativeId, title, dish: { info: { category, defaultPrice, name, description, price } } }, i) => {
                                // console.log(topPicks)
                                return <div key={i} className='relative '>
                                    <div className='w-[300px] relative rounded-2xl h-[300px] overflow-hidden'>

                                        <img className='w-full h-full bg-center object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" + (creativeId)} alt="" />
                                        <div className='absolute bottom-7 flex justify-between items-center px-5 w-full'>
                                            <p className='text-white font-bold text-xl'>₹{price / 100 || defaultPrice / 100}</p>
                                            <button onClick={() => {

                                            }} className='bg-white text-green-600 font-bold text-[20px] rounded-lg drop-shadow px-10 py-[6px] '>ADD</button>

                                        </div>

                                    </div>

                                </div>
                            })}
                        </div>
                    </div>
                }

                {/* Menu Cards from here */}

                <div>
                    {menuData.map(({ card: { card } }, i) => {
                        return <div key={i}>
                            <MenuData card={card} />


                        </div>
                    })}
                </div>
            </div>  
             :   <MenuShimmer/>
            }
           
        </div>
    )


    function MenuData({ card }) {
        let checkval = false;
        if (card["@type"]) {
            checkval = true
        }

        const [isOpen, setIsOpen] = useState(checkval)

        function togglemenu() {
            setIsOpen((prev) => !prev)
        }

        if (card.itemCards) {
            const { title, itemCards } = card;
            return (
                <>
                    <div>

                    </div>
                    <div className='flex w-full justify-between mt-10'>

                        <h1 className={`${card["@type"] ? "text-[20px]" : "text-[18px]"} 
                        font-[700] font-sans text-gray-800}`}>{title} ({itemCards.length})
                        </h1>
                        <MdOutlineKeyboardArrowUp onClick={() => {
                            // showMenu(i)
                            togglemenu()

                        }} className={`text-3xl  font-thin ${!isOpen ? "rotate-180 duration-500" : " duration-500"} `} />


                    </div>

                    {isOpen && <DetailMenuCard itemCards={itemCards} resInfo={resInfo} />}
                    <hr className={`my-5 ${card["@type"] ? " border-[8px]" : "border-[1px]"}  `} />
                </>
            )
        }
        else {
            const { title, categories } = card;
            return <>

                <div className='pb-5'>

                    <hr className='my-5 border-1' />
                    <h1 className='text-[20px] font-bold font-sans text-gray-800'>{title}</h1>
                    <div>
                        {
                            categories.map((data, i) => {
                                return <div key={i} >
                                    <MenuData card={data} />

                                </div>
                            })
                        }
                    </div>

                </div>

            </>


        }


    }





    function DetailMenuCard({ itemCards, resInfo }) {
        setInfo(resInfo)
        // console.log(resInfo)
        const notify = (msg, type = "default", icon = <FaCheckCircle />) => {
            toast(msg, {
                type: type, // Type of toast (e.g., success, error, info, etc.)
                position: "top-center", // Center the toa   st
                icon: icon, // Custom icon
                style: {
                    backgroundColor: "white",  // Gray background
                    color: "black",           // Black text
                    fontWeight: "600",       // Bold text
                    borderRadius: "10px",     // Rounded corners
                    textAlign: "center",      // Center the text
                    fontFamily: "Arial, sans-serif", // Custom font
                    fontSize: "16px",         // Custom font size
                },
            });
        };

        return (
            <>
                <hr className='my-5 border-[8px]' />
                <div className='w-full pb-10'>
                    {itemCards?.map(({ card: { info } }, i) => {


                        const { name, price, defaultPrice, imageId, description, itemAttribute: { vegClassifier }, ratings: { aggregatedRating: { rating, ratingCountV2 } } } = info;
                        const { cartData, setCartData } = useContext(cartContext)
                        const [isresInfo, setIsresInfo] = useState(false)

                        function handleAddToCart() {

                            // Check if the item is already in the cart
                            const isAdded = cartData?.find((data) => data?.id === info?.id);

                            // Retrieve restaurant info from localStorage
                            let getResInfoFromLocalStorage = JSON.parse(localStorage.getItem("resInfo")) || [];
                            console.log(getResInfoFromLocalStorage);

                            if (!isAdded) {
                                if (getResInfoFromLocalStorage?.name === resInfo?.name || cartData.length === 0) {
                                    // Add the new item to the cart
                                    const updatedCartData = [...cartData, info];
                                    setCartData(updatedCartData);

                                    notify("item added!", "success", <BsCartCheckFill className='text-4xl text-green-700' />);

                                    // Update localStorage with the new cart data
                                    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
                                    localStorage.setItem("resInfo", JSON.stringify(resInfo));
                                } else {
                                    // alert("Different restaurant item...");
                                    setIsresInfo(!isresInfo)
                                    notify("Different restaurant item! you need to order first your existing cart item", "warning", <IoIosWarning className='text-red-700 text-4xl' />);

                                }
                            } else {
                                // alert("Item already added");
                                notify("Item already in cart!", "info", <IoIosInformationCircle className=' text-2xl text-blue-500' />);


                            }

                        }





                        let [isMore, setIsMore] = useState(false)
                        let shortDiscription = description?.substring(0, 120)

                        return (
                            <>
                                <div className='flex w-full justify-between items-center  my-10 h-full' key={i}>
                                    <div className='items-center w-[60%] md:w-[70%]'>
                                        <p className='max-w-7 h-7 mb-5'>{vegClassifier === "VEG" ? <img className='object-cover w-full h-full rounded-2xl' src="https://icon2.cleanpng.com/20180601/ae/avogwvidn.webp" title='Veg' alt="Veg" /> :
                                            <img title='Non-Veg' className="w-full object-cover h-full rounded-5xl" src="https://icon2.cleanpng.com/20180401/xxq/avcmoabx6.webp" alt="Non veg" />}</p>
                                        <p className='text-[20px] font-bold text-gray-800/90 line-clamp-1'>{name}</p>
                                        <p className='font-bold text-[18px]'>
                                            {defaultPrice ? (
                                                <strike className="text-gray-500/80 font-bold mr-2">₹{Math.round(defaultPrice / 80)}</strike>
                                            ) : null}
                                            ₹{(defaultPrice || price) ? (defaultPrice || price) / 100 : "N/A"}
                                        </p>
                                        {rating || ratingCountV2 ? (
                                            <span className='text-lg text-green-700 my-3  font-bold flex items-center'>
                                                <RiStarSFill className='text-green-600 mr-1' />
                                                {rating || ratingCountV2}<span className='text-gray-600/80'>({ratingCountV2}) </span>
                                            </span>
                                        ) : null}
                                        <div>

                                            <p className={`text-gray-700/80 font-medium text-[18px] `}>
                                                <span className='mr-1 line-clamp-2 md:line-clamp-none'>{(isMore ? (description) : (shortDiscription + "..."))}</span>
                                                <button onClick={() => {
                                                    setIsMore(!isMore)
                                                }} className='font-bold hidden md:block text-gray-800 underline line-clamp-1'>{description?.length > 140 ? isMore ? "less" : "more" : ""}</button></p>

                                        </div>

                                    </div>
                                    <div className='relative w-[40%]  md:w-[20%] ml-4   h-[147px] '>
                                        <img
                                            className='w-[100%] aspect-square bg-center h-full object-cover rounded-[14px]' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${imageId}`}
                                            alt=""
                                        />

                                        <button onClick={handleAddToCart} className='bg-white text-green-600 font-bold text-[18px] sm:text-[20px] rounded-lg drop-shadow px-8 text-center md:px-10 py-[6px] absolute bottom-[-18px] left-1/2 -translate-x-1/2 '>ADD</button>

                                    </div>


                                </div>
                                <hr />
                                {
                                    isresInfo &&
                                    <div className='md:w-[540px] md:p-8 p-4 shadow-xl ml-[-10px]  shadow-black/50 flex flex-col gap-1 h-[180px] md:h-[210px] bg-white border fixed md:left-[32%] md:bottom-0  bottom-0 z-30'>
                                        <h1 className='text-[21px] font-semibold text-gray-900/90'>Items already in cart</h1>
                                        <p className='text-[15px] text-black/70 mb-2'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                                        <div className='flex justify-between w-full md:mt-4 mt-2 '>
                                            <button onClick={() => {
                                                setIsresInfo(!isresInfo)
                                            }} className='border-[#60B246] hover:drop-shadow  border-[3px] md:p-3 p-2 w-[47%]'>NO</button>
                                            <button onClick={() => {

                                                setCartData([])
                                                // localStorage.setItem("cartData", JSON.stringify([]))
                                                localStorage.clear()
                                                notify("cart Cleard! now you can add other restaurent food", "error", <IoIosWarning className='text-red-700 text-4xl' />);



                                            }} className='bg-[#60B246]  uppercase text-white font-semibold md:p-3 p-2 w-[47%]'>Yes, start afresh</button>
                                        </div>
                                    </div>
                                }
                            </>
                        )
                    }
                    )}

                </div>
                {/* <Cart resInfo={resInfo}/> */}
            </>
        );
    }



}

export default RestaurantMenu

