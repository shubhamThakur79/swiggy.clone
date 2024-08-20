import React, { useEffect, useState } from 'react'
import SearchDishes from './SearchDishes'
import SearchRestaurent from './SearchRestaurent'

const Search = () => {

    const filterOptions = ["Restaurants", "Dishes",]
    const [searchQuery, setSearchQuery] = useState()
    const [activeBtn, setActiveBtn] = useState("Dishes")
    const [dishes, setDishes] = useState([])
    const [restaurent, setRestaurent] = useState([])

    // console.log(searchQuery)

    function handlefilters(filterName) {
        // console.log(filterName)
        setActiveBtn(activeBtn === filterName ? activeBtn : filterName)
    }

    async function fetchDishes() {
        let response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str={${searchQuery}trackingId=undefined&submitAction=ENTER&queryUniqueId=fd2adaa9-4c57-c5d7-113a-ac5b1196a841`)
        let data = await response.json();

        setDishes((data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards)?.filter((data) => {
            return data?.card?.card?.info
        }))



        console.log("dishes", dishes)

    }

    async function fetchRestaurentData() {
        let response = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=28.7040592&lng=77.10249019999999&str=roll&trackingId=undefined&submitAction=ENTER&queryUniqueId=fd2adaa9-4c57-c5d7-113a-ac5b1196a841&selectedPLTab=RESTAURANT`)
        let data = await response.json();
        // if (searchQuery === "") {
        //     return alert("adds")
        // }
        setRestaurent((data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)?.filter((data) => {
            return data?.card?.card?.info
        }))
        console.log(restaurent)

    }

   


    useEffect(() => {
        fetchDishes()
        fetchRestaurentData()
    }, [searchQuery])




    return (
        <div className='w-full md:w-[980px] mx-auto overflow-hidden  relative'>
            <div className='w-full h-max fixed top-22 z-10 pt-7  md:pt-14  bg-white mb-20 px-2'>


                <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        setkey(e)
                    }}
                    className='px-5 w-full md:w-[980px] outline-none  py-3 border-2 border-black/30 rounded' type="text" placeholder='Search for restaurants and food' />
                <br />
                {
                    filterOptions.map((option, i) => {
                        return (
                            <button
                                onClick={() => handlefilters(option)}
                                key={i}
                                className={`${activeBtn === option ? " activeBtn" : ""} border text-slate-900 font-semibold border-black/15 drop-shadow-xl rounded-3xl md:mx-2  mx-1 px-2 md:px-3 py-1 md:py-2 my-2 md:my-4`}
                            >
                                <div className='parent flex items-center flex-wrap '>
                                    <p>{option}</p>


                                </div>
                            </button>
                        );
                    })
                }
            </div>

            {/* <h1>{searchQuery}</h1> */}

            <div className='w-full md:w-[980px] bg-[#EFF0F1] mt-[180px]  grid grid-cols-1 md:grid-cols-2 gap-y-[6px] md:gap-3 md:p-3'>
                {
                    activeBtn === "Dishes" ?
                        (dishes?.map((data) => <SearchDishes data={data} />))
                        :
                        (restaurent.map((data) => <SearchRestaurent data={data} />))
                }
            </div>

        </div>
    )
}

export default Search