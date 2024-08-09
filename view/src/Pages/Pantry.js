import React, { useEffect, useState } from "react";
import {NavLink, useNavigate} from "react-router-dom";

import axios from "axios";

function Pantry(props) {
  const fridgeID = props.profile.fridgeID._id;

  //Search input form.
  const [query, setQuery] = useState('');

  //Ingredient search
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
 // const [recipes, setRecipes] = useState([]);
  const [myIngredrients, setPantry] = useState([]);
 // const navigate = useNavigate();
  // const handleItemClick = async(ingredient) => {
  //   setIngredients([]);
  //   setIngredient(ingredient);  
  // }
 
  //SEARCH HOOK
  useEffect(() => {
    const fetchIngredients = async () => {
      const url = `/recipes/getIngredient?ingredient=${query}`
      // console.log("rendering useEffect");
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (ingredients !== data) {
          setIngredients(data);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setIngredients([]);
      }
    };

    if (query !== '') {
      fetchIngredients();  
    } else {
    
    setIngredients([]);
    }
  }, [query]);


  const deleteIngredient = async(ingre)=>{
    setQuery('');
   // console.log("id",ingre);
    const endpoint = "/fridge/ingredient/delete";
    const response = await axios.post(endpoint,{ingredientID:ingre})
    const data = response.data;
   // console.log("deleter ingredient",data,"query",query);
    setQuery("delete");
   
    
      }
  //PANTRY HOOK FOR "MY INGREDIENTS"
  useEffect(() => {
    const fetchPantry = async () => {
      const endpoint = "/fridge/ingredient?fridgeID=" + fridgeID;

      const res = await fetch(endpoint).catch((error) => {
        console.error(error);
      });
      const data = await res.json();

      setPantry(data);
    }

    fetchPantry();
  }, [query]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = ingredient? Object.keys(ingredient) :query;
    const url = `/recipes/getRecipes/${name}`;
    fetch(url)
      .then(response =>response.json())
      .then((data) => {
        setRecipes(data);
     //   console.log(recipes);
        setIngredient('');
        setQuery('');
      })
      .catch(error => console.error(error));
  }

 

return (
//adding a search bar to get the recipes with the ingredient user searched
    <div className="p-8">
      <div className="relative w-1/2">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
        <form action="" className=" flex space-x-4" onSubmit={handleSubmit}>
          
        <input type="text" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               onChange={(e)=>setQuery(e.target.value)}
               placeholder="Type to search ingredients..." />
    
        <button onClick={(e) => {e.preventDefault()}} className="text-white absolute end-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               <NavLink to="/ingredient/search" state={query}>Search</NavLink></button>
        </form>
        <div>
          {/* {ingredients.map((ingredient, index) => (
            <Result key={index} ingredient={ingredient} handleClick={handleItemClick}/>
          ))} */}
        </div>
      
      </div>

      <h2 className="text-2xl font-bold mb-6">My Ingredients</h2>
      
      <div className="flex ">
        {/* My Ingredients cards */}
        <div className="mr-2 mb-2 basis-1/4 bg-gray-300 p-4 rounded-lg space-y-2 animate-fade-down animate-delay-100">
        <div className="flex justify-between  flex-col ">
         {myIngredrients.length===0?
         <p>Pantry is empty</p>
        :
         <>
          {myIngredrients.map((ingr)=> (
          <div className="flex items-center justify-between ">
          <h3 className="text-lg font-semibold lowercase  ">{ingr.name}</h3>
             <button className="bg-gray-400 w-5 h-5 flex justify-center items-center" onClick={()=>deleteIngredient(ingr._id)}>
                x
              </button>
          </div>         
        ))}
         <button onClick={(e) => {e.preventDefault()}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm my-4 px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <NavLink to="/recipe/search">Search for Recipes using above ingredients</NavLink></button>

        </>
        }
      
        
         </div>
        
     
         </div>
         {/* {myIngredrients.map((ingr) => {
          return <h4>{ingr.name}</h4>
          // return <MyIngredient key={ingr._id} data={ingr}/>
        })}  */}
        
  
     

      </div>
    </div>

    
      
  
  );
}

export default Pantry;