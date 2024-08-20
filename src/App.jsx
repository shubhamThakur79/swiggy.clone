import React, { useEffect, useState } from 'react'

import Home from './components/Home'; // 
import Hero from './components/Hero'
import { Route, Routes } from 'react-router-dom'
import RestaurantMenu from "./components/RestaurantMenu"
import { cartContext, cartInfo, coordinates, visibility } from './context/contextApi'
import Cart from './components/Cart';
import SignIn from './components/SignIn';
import { useSelector } from 'react-redux';
import Search from './components/Search';

const App = () => {
  const [visible, setVisible] = useState(false)
  const [coord, setCoord] = useState({ lat: 28.7040592, lng: 77.10249019999999 })
  const [cartData, setCartData] = useState([]);
  const [info,setInfo] =useState([])
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cartData")) || []
    setCartData(data)
  }, [])

   const toggleSignUp = useSelector((state => state.toggleSlice.signUpToggle))
  return (

    <>
      <cartInfo.Provider value={{info,setInfo}}>


        <cartContext.Provider value={{ cartData, setCartData }}>
          <coordinates.Provider value={{ coord, setCoord }}>

            <visibility.Provider value={{ visible, setVisible }}>
              <div className={visible  && "overflow-y-hidden max-h-[90vh] " }>


                <Routes>
                  <Route path="/" element={<Home />}>

                    <Route path="/" element={<Hero />} />
                    <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/signIn" element={<Hero/>} />
                    <Route path="/search" element={<Search/>} />
                    <Route path="*" element={<h1>Comming soon...</h1>} />
                  </Route>


                </Routes>
              </div>
            </visibility.Provider>

          </coordinates.Provider>
        </cartContext.Provider>
      </cartInfo.Provider>



    </>

  )
}

export default App

//https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=roll&trackingId=undefined&submitAction=ENTER&queryUniqueId=fd2adaa9-4c57-c5d7-113a-ac5b1196a841 

// https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=roll&trackingId=undefined&submitAction=ENTER&queryUniqueId=fd2adaa9-4c57-c5d7-113a-ac5b1196a841&selectedPLTab=RESTAURANT