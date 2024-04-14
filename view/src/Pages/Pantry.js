

import { set } from "mongoose";
import React, { useEffect, useState } from "react";

function Pantry() {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
 
  const handleItemClick = async(ingredient) => {
  console.log("reached handleclick",ingredient);
  setIngredients([]);
  setIngredient(ingredient);  
}

  useEffect(() => {
    const fetchIngredients = async () => {
      const url = `http://localhost:3001/recipes/getIngredient?ingredient=${query}`
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
      console.log("inside else in useEffect");
    setIngredients([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //search the db with recipes with this ingredient
    const id = Object.values(ingredient);
    console.log(id);
    const url = `http://localhost:3001/recipes/getRecipes/${id}`;
    fetch(url)
      .then(response =>response.json())
      .then((data) => {
       // console.log(data);
        setRecipes(data);
        console.log(recipes);
      setIngredient('');
      setQuery('');
    })
      .catch(error => console.error(error));
  }

  return (
//adding a search bar to get the recipes having the ingresient we searched
    <div className="p-8 relative">
   
      <form action="" className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center" onSubmit={handleSubmit}>
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md flex-grow"
        value={ingredient?Object.keys(ingredient):query}
        onChange={(e)=>setQuery(e.target.value)}
        placeholder="Type to search ingredients..." />
    
        <button  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">Search</button>
      </form>
      {query && (
      <div className="absolute mt-1 bg-white border border-gray-300 rounded-md flex-grow">
        {ingredients
          .filter(ingredient => Object.keys(ingredient)[0].toLowerCase().includes(query.toLowerCase()))
          .map((ingredient, index) => (
            <div 
              key={index} 
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(ingredient)}
            >
              {Object.keys(ingredient)}
            </div>
          ))}
      </div>
    )}
      
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {recipes.length==0 && <p>No recipes found with this ingredient.</p>}
          {/* Placeholder for recipe cards */}
          {recipes?.map((recipe,index)=>(
              <div key={index} className="bg-gray-500 p-4 rounded-lg space-y-2">
              <div className="text-center">
                //<img src={recipe.image} alt="" className="" />
                <span>♥</span>
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
                <h3 className="text-lg font-semibold">{recipe.category}</h3>
              </div>
              <p># Calories</p>
              <button className="text-indigo-600 hover:text-indigo-800">
                View Ingredients
              </button>
              <div className="flex space-x-2">
                {/* Tags */}
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                  TAG 1
                </span>
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                  TAG 2
                </span>
              </div>
            </div>
          ))}
   
        </div>
      <h2 className="text-2xl font-bold mb-6">My Ingredients</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* My Ingredients cards */}
        <div className="bg-gray-300 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Tomatoes</h3>
            <div className="flex items-center">
              <button className="bg-gray-400 w-6 h-6 flex justify-center items-center mr-2">
                +
              </button>
              <button className="bg-gray-400 w-6 h-6 flex justify-center items-center">
                -
              </button>
            </div>
          </div>
          <p>3 in Pantry</p>
          <p>Carbs: #g</p>
          <p>Protein: #g</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Ingredients I Need</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Ingredients I Need cards */}
        <div className="bg-gray-300 p-4 rounded-lg space-y-2">
          <h3 className="text-lg font-semibold">Avocado</h3>
          <p>0 in Pantry</p>
          <p>Carbs: #g</p>
          <p>Protein: #g</p>
          <button className="text-indigo-600 hover:text-indigo-800">
            Add to Pantry
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Other Ingredients</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Other Ingredients cards */}
        {/* Repeat this structure for each ingredient */}
        <div className="bg-gray-300 p-4 rounded-lg space-y-2">
          <h3 className="text-lg font-semibold">Potatoes</h3>
          <p>0 in Cart</p>
          <p>Carbs: #g</p>
          <p>Protein: #g</p>
          <button className="text-indigo-600 hover:text-indigo-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pantry;
