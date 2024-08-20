import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../context/contextApi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCheckCircle, FaSignOutAlt } from 'react-icons/fa'
import { RiMoonClearLine, RiStarSFill } from "react-icons/ri";
import { IoChatboxOutline } from 'react-icons/io5'
import { GiBoxUnpacking } from 'react-icons/gi'
import { useSelector } from 'react-redux'
import SignIn from './SignIn'

const Cart = () => {
    const { cartData, setCartData } = useContext(cartContext)
    const userData = useSelector((state => state?.authSlice?.userData))
console.log(cartData)
    const notify = (msg, type = "default", icon = <FaCheckCircle />) => {
        toast(msg, {
            type: type, // Type of toast (e.g., success, error, info, etc.)
            position: "top-center", // Center the toast
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

    let totalPrice = 0;
    for (let i = 0; i < cartData?.length; i++) {
        totalPrice += (cartData[i]?.price / 100) || (cartData[i]?.defaultPrice / 100);
    }


    function clearAll() {
        setCartData([])
        // localStorage.setItem("cartData", JSON.stringify([]))
        localStorage.clear()
        notify("Cart cleared!", "error", <GiBoxUnpacking className='text-2xl text-violet-500' />);


    }
    let navigate = useNavigate()

    function handlePlaceOrder() {
        if (userData) {
            toast.success("order Placed")
        }
        else {
            toast.error("crate your account")
        //   <SignIn />
        navigate("/signin")
        }
    }
    function handleDelete(index) {
        if (cartData.length > 1) {

            let newCart = cartData
            newCart.splice(index, 1)
            setCartData([...newCart])
            localStorage.setItem("cartData", JSON.stringify([...newCart]))

            console.log(index)
            notify("item removed!", "Dark", <FaSignOutAlt className='text-red-600 text-2xl' />);


        }
        else {
            clearAll()
        }



    }


    console.log(cartData)
    return (
        <div className='w-full  h-full mt-2 mb-24'>
            <div className='md:w-[85%] w-[97%] h-full m-auto flex flex-col items-center'>

                {cartData?.length === 0 ?
                    <div className='flex flex-col justify-center items-center h-screen'>
                        <img className='w-[400px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="Cart is empty" />
                        <h1 className='font-semibold text-2xl text-gray-800/80 mt-3 mb-1'>Your cart is empty</h1>
                        <p className='text-sm font-semibold text-gray-500/80 mb-4'>You can go to home page to view more restaurants</p>
                        <Link className='hover:drop-shadow-lg' to={"/"}>
                            <button className='bg-[#ff5203] px-5 py-2 text-[16px] text-white font-bold uppercase'>See restaurants near you</button>

                        </Link>
                    </div>
                    :
                  
                    cartData?.map((data, i) => {
                        console.log(data)
                        return <>
                        <div>

                        </div>
                            <div className='md:w-1/2 w-full m-auto border-b-[3px] px-3  mb-3  '>
                                <div className='flex justify-between my-5 w-full items-center' key={i}>

                                    <div className='md:min-w-[50%] w-full leading-[25px]'>
                                        
                                        <h1 className='line-clamp-1 text-xl font-semibold text-gray-700/90'>{data?.name}</h1>
                                        <p className='w-[100%] opacity-80 font-semibold line-clamp-2'>{data?.description}</p>
                                        <span className='text-lg text-green-700  font-bold flex items-center'>
                                                <RiStarSFill className='text-green-600 mr-1' />
                                                {data?.ratings?.aggregatedRating?.rating ||data?.ratings?.aggregatedRating?.ratingCountV2}<span className='text-gray-600/80'>({data?.ratings?.aggregatedRating?.ratingCountV2}) </span>
                                            </span>
                                        <div className='flex w-20 justify-between gap-3'>
                                        <p className='font-bold  opacity-80'>{data?.itemAttribute?.vegClassifier}</p>
                                        <p className='font-bold  opacity-80'>₹{Math.round(data?.price / 100 || data?.defaultPrice / 100)}</p>

                                        </div>

                                    </div>
                                    <div className='relative md:min-w-[26%] ml-4  w-[50%]  h-[150px] '>
                                        <img
                                            className='min-w-[100%] w-full  h-[100%] object-cover rounded-[14px]' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/` + (data?.imageId)}
                                            alt=""
                                        />

                                        <button onClick={handleDelete} className='text-white bg-red-600 font-semibold md:font-bold text-[17px] md:text-[18px] rounded-lg drop-shadow px-4 py-[3px] absolute bottom-[-11px] left-1/2 -translate-x-1/2'>Remove</button>
                                    </div>

                                </div>
                            </div>
                        </>
                    })}
                {cartData?.length !== 0 && <div className='flex fixed bottom-0 justify-between  md:w-1/2 md:px-12 rounded-2xl w-[100%] md:m-auto'>
                    <div className='flex  justify-between items-center w-full  py-6 border-[4px] px-4 rounded  bg-gray-100'>
                        <div className='md:w-[40%]'>

                            <p className='font-bold md:text-xl text-[18px] opacity-80'>TO PAY :
                            ₹{ Math.round(totalPrice)}</p>
                        </div>
                        <div className='w-[60%] flex justify-end gap-3'>
                            <button onClick={clearAll} className='bg-green-600 md:px-4 px-3 py-2 w-max rounded-lg text-[16px] font-medium md::text-xl md:font-semibold text-white'>Clear cart</button>
                            <button onClick={handlePlaceOrder} className='bg-[#FF5203] md:px-4 py-2  px-3  rounded-lg md:text-xl text-[16px]  font-semibold text-white'>Place Order</button>
               

                        </div>

                    </div>
                </div>
                }
            </div>
        </div >
    )
}

export default Cart