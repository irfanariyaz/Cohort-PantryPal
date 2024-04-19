import React, { useEffect, useState } from "react";
import MyIngredient from "./PantryComponent/MyIngredient";
import axios from 'axios';


function Pantry(props) {
  //TEST FRIDGE ID TEMPORARY
  const fridgeID1 = props.profile.fridgeID._id;
  const fridgeID = "6620f09f1e7dc4f70c80e1bc";
  //########################

  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showForm,setShowForm] = useState(false);//show form to create a Pantry list 
  const [myIngredrients, setPantry] = useState([]); 

 
 
  const handleItemClick = async(ingredient) => {
  console.log("reached handleclick",ingredient);
 
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

  // PANTRY HOOK FOR "MY INGREDIENTS"
  // useEffect(() => {
  //   const fetchPantry = async () => {
  //     const endpoint = "/fridge/ingredient?fridgeID=" + fridgeID;

  //     const res = await fetch(endpoint).catch((error) => {
  //       console.error(error);
  //     });
  //     const data = await res.json();

  //     setPantry(data);
  //     console.log(myIngredrients);
  //   }

  //   fetchPantry();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    //search the db with recipes with this ingredient
    //const id = Object.keys(ingredient);
    //console.log(id);
    const name = ingredient? Object.keys(ingredient) :query;
    const url = `http://localhost:3001/recipes/getRecipes/${name}`;
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
const createPantry = () => {
  console.log("create pantry");
}
  return (
//adding a search bar to get the recipes with the ingredient user searched
    <div className="p-8">
    
      <div>
        <h2>create a Pantry list</h2>
        <button className="bg-green-900 p-2 rounded-md text-white mb-4" onClick={()=>setShowForm(true)}> Create</button>
      </div>
      {showForm && (
       <div className="p-4 border-2">
         
         <form className="flex flex-col space-y-4 " onSubmit={createPantry}>
         <div>
        <form action="" className=" flex space-x-4" onSubmit={handleSubmit}>
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md "
               value={ingredient?Object.keys(ingredient):query}
               onChange={(e)=>setQuery(e.target.value)}
               placeholder="Type to search ingredients..." />
    
      <button  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
               Add</button>
        </form>
        <div>
        {ingredients.map((ingredient, index) => (
          <div key={index} onClick={() => handleItemClick(ingredient)} className="capitalize" >
            {Object.keys(ingredient)}
          </div>
        ))}
  
        </div>
      
      </div>

       
           <button className="bg-green-900 p-2 rounded-md text-white"> Create</button>
         </form>
       </div>
        )}
      <h2 className="text-2xl font-bold mb-6">My Ingredients</h2>
      
      <div className="flex flex-wrap justify-around">
        {/* My Ingredients cards */}
        {myIngredrients.map((ingr) => {
          return <MyIngredient key={ingr._id} data={ingr}/>
        })}
      </div>
      </div>
    
      
  
  );
}

export default Pantry;
