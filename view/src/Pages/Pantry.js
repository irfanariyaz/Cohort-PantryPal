import React, { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import MyIngredient from "./PantryComponent/MyIngredient";
import Result from "./PantryComponent/ResultIngredient";

function Pantry(props) {
  const fridgeID = props.profile.fridgeID._id;

  //Search input form.
  const [query, setQuery] = useState('');

  //Ingredient search
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [myIngredrients, setPantry] = useState([]);

  const handleItemClick = async(ingredient) => {
    setIngredients([]);
    setIngredient(ingredient);  
  }
 
  //SEARCH HOOK
  useEffect(() => {
    const fetchIngredients = async () => {
      const url = `/recipes/getIngredient?ingredient=${query}`
      console.log("rendering useEffect");
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
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const name = ingredient? Object.keys(ingredient) :query;
    const url = `/recipes/getRecipes/${name}`;
    fetch(url)
      .then(response =>response.json())
      .then((data) => {
        setRecipes(data);
        console.log(recipes);
        setIngredient('');
        setQuery('');
      })
      .catch(error => console.error(error));
  }

return (
//adding a search bar to get the recipes with the ingredient user searched
    <div className="p-8">
      <div className="w-1/2">
        <form action="" className=" flex space-x-4" onSubmit={handleSubmit}>
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md"
               onChange={(e)=>setQuery(e.target.value)}
               placeholder="Type to search ingredients..." />
    
      <button onClick={(e) => {e.preventDefault()}} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
               <NavLink to="/ingredient/search" state={query}>Search</NavLink></button>
        </form>
        <div>
          {/* {meals.map((ingredient, index) => (
            <Result key={index} ingredient={ingredient} handleClick={handleItemClick}/>
          ))} */}
        </div>
      
      </div>
      <h2 className="text-2xl font-bold mb-6 mt-4">My Ingredients</h2>
      <div className="mr-2 mb-2 max-w-96  bg-white p-4 rounded-lg space-y-2 shadow-lg">
          
            {myIngredrients.map((ingr,index) =>(
              <div key={index} className="flex  flex-wrap justify-between border-b-2 border-b-blue-300">
              <h3 className="capitalize">{ingr.name}</h3>
               <button className=" w-6 h-6 flex justify-center items-center" onClick={()=>deletePantry(ingr._id)}>
                <FaTrashCan className="text-sm"/>
              </button>
              </div>
            ))}
             
     
          
      </div>
      
      <div className="flex flex-wrap justify-around">
        {/* My Ingredients cards */}
        {/* {myIngredrients.map((ingr) => {
          return <MyIngredient key={ingr._id} data={ingr}/>
        })} */}
      </div>

    </div>

    
      
  
  );
}

export default Pantry;