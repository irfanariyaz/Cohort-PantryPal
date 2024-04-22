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
      setMessage("");
    }

    fetchPantry();
  }, [message]);

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
        {message ? <p className="m-2 text-green-700 text-lg">{message}</p> : null}
        <div>
          {ingredients.map((ingredient, index) => (
            <Result key={index} ingredient={ingredient} handleClick={handleItemClick}/>
          ))}
        </div>
      
      </div>

      <button onClick={(e) => {e.preventDefault()}} className="my-5 px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
               <NavLink to="/recipe/search">Search for Recipes</NavLink></button>

      <h2 className="text-2xl font-bold mb-6">My Ingredients</h2>
      
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