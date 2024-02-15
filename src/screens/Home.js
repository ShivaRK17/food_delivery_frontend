import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import FoodCard from '../components/FoodCard'
import Carousal from '../components/Carousal'

const Home = () => {
  const [foodData, setFoodData] = useState([])
  const [foodCat, setFoodCat] = useState([])
  const [search, setSearch] = useState("")

  const getFoodData = async () => {
    const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getFood`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })
    const data = await resp.json();
    // console.log(data);
    setFoodData(data);
  }
  
  const getFoodCategory = async ()=>{
    const resp = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getFoodCat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    })
    const data = await resp.json();
    // console.log(data);
    setFoodCat(data);

  }
  useEffect(() => {
    getFoodData();
    getFoodCategory();
  }, [])


  return (
    <>
      <Carousal />
      <div className="container m-3 d-flex justify-content-center">
      <form class="d-flex" role="search" style={{width:'500px'}} onSubmit={(e)=>{e.preventDefault();setSearch("")}}>
        <input value={search} onChange={(e)=>{setSearch(e.target.value)}} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-dark" type='submit'>Clear</button>
      </form>
      </div>
      {foodCat.map((cat)=>{
        return <div className="container">
        <h2 className='m-2'>{cat.CategoryName}</h2><hr />
        <div className="d-flex w-100 flex-wrap justify-content-center p-2">
          {
            foodData.filter((e) => {
              return e.CategoryName === cat.CategoryName && e.name.toLowerCase().includes(search.toLowerCase())
            }).map((e) => {
              return <FoodCard jsondata={e}/>
            })
          }
        </div>
      </div>
      })}
      <Footer />
    </>
  )
}

export default Home