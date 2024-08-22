import React, { useContext, useEffect, useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { PiBagSimpleLight } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { Link, Outlet } from 'react-router-dom';
import { RiArrowUpSLine } from "react-icons/ri";
import { cartContext, coordinates, visibility } from '../context/contextApi';
import { IoCloseOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { toggleSignUp } from '../Utils/filterslice';// Adjust the path if necessary
import { data } from 'autoprefixer';
import { GiHandGrip } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './SignIn';
// import { useContext } from 'react';
function Home() {
    const userData = useSelector((state => state?.authSlice?.userData))
    console.log(userData)
   

    const { visible, setVisible } = useContext(visibility)
    const [searchResult, setSearchResult] = useState([]);
    const { coord, setCoord } = useContext(coordinates)
    const [address, setAddress] = useState("")
    const { cartData, setCartData } = useContext(cartContext);
    const [signUpVisible, setSignUpVisible] = useState(false)
    // const signUpVisible = useSelector((state => state.toggleSlice.toggleSignUp))
    // console.log(address)
    // const dispatch = useDispatch()
    const navItems = [
     
        {
            name: "Search",
            image: < CiSearch />,
            path: "/search"

        },
       
        

        {
            name: "Cart",
            image:<h1 className='px-[8px] md:px-[10px]   rounded-tr-[6px] rounded-tl-[6px] text-white bg-[#79BE63] font-semibold text-[16px] md:text-[18px] h-max '>{cartData.length}</h1>,
            path: "/cart"

        },
        {
            name: "Sign In",
            image: <IoPersonOutline />,
            path: "/signIn"

        },
    ]
    function handleSignUp() {
        setSignUpVisible(!signUpVisible)
        // dispatch(toggleSignUp())

        // console.log("kjcsaj")
    }
    function handleVisiblity() {
        setVisible(!visible)
    }

    async function searchResultFun(val) {

        let response = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=" + val)
        let data = await response.json();

        console.log(data)
        setSearchResult(data?.data || [])

    }

    async function fetchLatLong(id) {

        let response = await fetch("https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=" + id)
        let data = await response.json();
        setCoord({
            lat: data?.data[0]?.geometry?.location?.lat,
            lng: data?.data[0]?.geometry?.location?.lng
        })

        setAddress(data?.data[0]?.formatted_address)
        // console.log(data?.data[0]?.geometry?.location?.lng)
        // setSearchResult(data?.data || [])

    }
    // console.log(signUpVisible + "kjhfj")
    return (
        <>
            <div className={'w-full '}>
                {

                    visible && <div className={`flex   flex-col bg-card shadow-lg p-6 bg-black/50 bottom-0 z-20 absolute top-0  w-full `}>
                        <div className='md:w-[35%] w-full flex justify-end   h-screen bg-white absolute left-0 z-30 top-0 bottom-0'>
                            <div className='flex w-[70%] flex-col gap-5 mt-8 mr-12 '>

                                <IoCloseOutline onClick={handleVisiblity} className='cursor-pointer  text-black/60 text-[46px]' ></IoCloseOutline>

                                <input

                                    onChange={(e) => {
                                        searchResultFun(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Search for area, street name.."
                                    className='border outline-none px-3 py-3 drop-shadow-md shadow-black'
                                />


                                <div className='border p-5 overflow-y-scroll relative'>
                                    <h2 className="text-xl font-bold mb-3 text-primary text-black/70  bg-white">Searches result</h2>
                                    {
                                        searchResult === "" ? <h1> location not found...</h1> :
                                            searchResult?.map((result, i) => {
                                                return <div key={i} className='my-5 '>
                                                    <div className='flex items-center gap-1'>
                                                        <MdLocationOn className='text-2xl text-gray-700/80' />
                                                        <ul className='py-1 pb-2   w-72 m-auto'>

                                                            <li onClick={() => {
                                                                fetchLatLong(result.place_id)
                                                                handleVisiblity()

                                                            }} className='cursor-pointer'>
                                                                <p className='hover:text-[#ff5100] text-[18px] font-medium'>{result?.structured_formatting?.main_text}</p>
                                                                <p className='text-black/50'>{result?.structured_formatting?.secondary_text}</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <p className='opacity-30'>------------------------------------------------</p>
                                                </div>
                                            })

                                    }

                                </div>
                            </div>

                        </div>
                    </div>

                }

            </div>

            {/* Sign Up Page */}

            {signUpVisible && <div className={'h-screen duration-500 w-full absolute z-50 bg-black/50 flex justify-end right-[-50%]' + (signUpVisible ? "right-[0]" : "right-[-50%]")}>
                <div className={' w-full h-screen overflow-hidden md:w-[35%] bg-white absolute duration-500 right-[-50%] ' + (signUpVisible ? "right-[0]" : "right-[-50%]")}>
                    <div className='ml-8 w-[75%] mt-6      '>
                        <IoCloseOutline onClick={handleSignUp} className='cursor-pointer  text-black/70 text-[36px]' ></IoCloseOutline>
                        <div className='flex w-full justify-between mt-10 mb-14'>
                            <h1 className='text-3xl border-b-[3px]   h-max pb-3  border-black/70  font-semibold text-black/80 '>Sign up</h1>
                            <img className='w-28' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                        </div>
                        <SignIn toggleSignUp={handleSignUp} />
                        <p className='text-sm mt-2 opacity-70 font-semibold'>By clicking on Sign Up, I accept the Terms & Conditions & Privacy Policy</p>

                    </div>

                </div>


            </div>
            }


            <div className={`relative h-full w-full  `}>


                <div className='w-full shadow-md bg-white md:h-[84px] h-[70px] flex justify-center items-center sticky top-0  z-10 ' >
                    <div className='w-[100%] sm:w-[90%]  h-full flex justify-between'>

                        <div className='flex items-center  md:gap-3 gap-[0] w-1/2 ml-[-20px] md:ml-0'>
                            <Link className='flex-shrink-0' to={"/"}>

                                <img title='swiggy' className='hover:scale-y-110 hover:scale-x-110  object-cover duration-200 w-[80px] md:w-[112px] md:h-[90%] h-[60%] cursor-pointer' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />
                            </Link>
                            <div onClick={() => {
                                handleVisiblity()
                            }} className=' flex md:ml-[-10px]  ml-[-10px]  items-center md:w-[300px] w-[200px]  '>

                                <h1 className=' flex items-center md:gap-3 gap-1 max-w-[100px] md:max-w-[350px]'>
                                    <span className='hover:text-[#FF5200]   hover:border-[#FF5200]   duration-100 font-[700] text-[16px] md:text-[17px] text-gray-900/90 cursor-pointer pb-7   border-b-[3px]  h-[26px] border-gray-900/90'>Other</span>
                                    <span className={`cursor-pointer text-gray-600 line-clamp-1 text-[15px] md:text-[16px]  mb-1   ` + (visible ? "w-[350px" : "0px")} >{address}</span>  </h1>
                                <RiArrowUpSLine className='cursor-pointer relative right-3  rotate-180 text-[27px] md:text-[28px] font-medium w-12  md:w-14 text-orange-500  ' />
                            </div>


                        </div>

                        {/* Right Navbar Links Here */}

                        <div className='flex  items-center w-full justify-end gap-6 mr-3 md:gap-11'>
                            {navItems.map((items, i) => {
                                // console.log(cartData)

                                return items?.name == "Sign In" ?
                                <Link to={"/signin"}>
                                <div onClick={handleSignUp}>
                                        <div id='#top' key={i} className='flex w-max hover:text-[#FF5200] items-center justify-between md:gap-2 gap-[2px] cursor-pointer'>
                                            {userData ?
                                                <img
                                                    className="rounded-[50%] md:h-10 md:w-10 h-7 w-7"
                                                    src={(userData?.photo)|| "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5U3qOgU4Vlxn0yUPmaUj8AlMwR7woDUgJzg&s"}
                                                    alt={"👋"}
                                                />
                                
                                    
                                                :

                                               <h1 className='text-xl '>{ items?.image}</h1>
                                            }
                                            <p className='text-lg font-medium text-gray-700 hidden md:block'>
                                                {userData ? userData?.name : items?.name}

                                            </p>
                                        </div>
                                    </div>
                                    </Link>
                                    :
                                    <Link to={items?.path}>
                                        <div key={i} className='flex  w-max hover:text-[#FF5200] items-center md:gap-2 gap-[2px] cursor-pointer'>
                                            <p className=' text-gray-700 md:text-2xl text-xl font-bold'>{items?.image}</p>
                                            <p className='md:text-[18px] text-[17px] font-medium text-gray-700 '>{items?.name}</p>
                                            {/* {items?.name === "Cart" && <p className='border px-4 py-2'>{cartData?.length}</p>} */}
                                        </div>
                                    </Link>
                            })}
                        </div>

                    </div>

                </div>
                <Outlet />
            </div>
        </>

    )
}

export default Home;
