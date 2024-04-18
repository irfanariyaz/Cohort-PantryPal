import React, { useEffect, useState } from "react";
import MyIngredient from "./PantryComponent/MyIngredient";
import axios from 'axios';
import { set } from "mongoose";
function Pantry() {
  //TEST FRIDGE ID TEMPORARY
  const fridgeID = "661853c65b4692301c252675";
  //########################

  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [queryList,setquerytList]=useState([]);
  const [ingSelectList,setIngSelectList] = useState([]);
  const [list,setlist]= useState([]);
  const [myIngredrients, setPantry] = useState([]); 
  const [selected,setSelected] = useState(false);
 
 
  const handleItemClick = async(ingredient) => {
  console.log("reached handleclick",ingredient);
  setIngredients([]);
  setIngredient(ingredient);  
}
//function to handle when user types the list of ingredients with comma and press the search button
  const handleQueryClick = async(query) => {
   const  url = `http://localhost:3001/recipes/ingredients/${queryList}`;
   console.log("reached handleclick", url);
   const response =await axios.get(url);
   const data = await response.data;
   setIngSelectList(data);
   console.log("results",data);
  }
//function to add list of ingredients selected
  const addIngredientToList = (value)=>{
    console.log("clicked the ingredient");
  const newList = [...list,value];
  setlist(newList);
  console.log("list",list);
  }
  //function to remove ingredients from list 
  const deleteIngredient = (value)=>{
    const newList = list.filter(item => item !== value);
    setlist(newList);
  }
 

  //SEARCH HOOK
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

  //PANTRY HOOK FOR "MY INGREDIENTS"
  useEffect(() => {
    const fetchPantry = async () => {
      const endpoint = "/fridge/ingredient?fridgeID=" + fridgeID;

      const res = await fetch(endpoint).catch((error) => {
        console.error(error);
      });
      const data = await res.json();

      setPantry(data);
      console.log(myIngredrients);
    }

    fetchPantry();
  }, []);

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

   //function to fetch the recipes based on the list of ingredients selected
  const SearchForRecipes =async()=>{
    console.log(list);
    const url = `http://localhost:3001/recipes/recipeList`
    const response = await axios.get(url,{params:{values:list,selected:selected}});
    const data =await  response.data;
    setRecipes(data);
   // setIngSelectList([]);
    
    console.log(data);
    
  }
console.log("selectes",selected);
  return (
//adding a search bar to get the recipes with the ingredient user searched
    <div className="p-8">
      <div>
        <form action="" className=" flex space-x-4" onSubmit={handleSubmit}>
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md "
               value={ingredient?Object.keys(ingredient):query}
               onChange={(e)=>setQuery(e.target.value)}
               placeholder="Type to search ingredients..." />
    
      <button  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
               Search</button>
        </form>
        <div>
        {ingredients.map((ingredient, index) => (
          <div key={index} onClick={() => handleItemClick(ingredient)} className="capitalize" >
            {Object.keys(ingredient)}
          </div>
        ))}
  
        </div>
      
      </div>
      <h4>Write ingredients with comma seperated</h4>
      <form action="" className=" flex space-x-4" onSubmit={handleQueryClick}>
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md "
               value={queryList}
               onChange={(e)=>setquerytList(e.target.value)}
               placeholder="Type to search ingredients..." />
    
      <button  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
               Search</button>
        </form>

   
    {/* show the ingredients to select from */}
    {ingSelectList && 
            <div  className="grid grid-cols-3 gap-2 ">
                {ingSelectList.map((ingredient, index) => (
                    <div key={index} className="bg-gray-300 p-4 rounded-lg space-y-2" >
                      {ingredient.map((name,index) =>(
                        <div  key={index} className="flex justify-between items-center" >
                          {name.length<35 ?(<h4> {name}</h4>):(<h4>{name.substring(0,35)}...</h4>)}
                          <button className="bg-gray-400 w-6 h-6 flex justify-center items-center mr-2" onClick={()=>addIngredientToList(name)}>
                            +
                          </button>
                        </div>
                      ))}
                       
                    </div>
                    ))}
            </div> 
    }
         
      <div className="grid grid-cols-2 gap-4 mb-6 mt-6">
        
        {/* My Ingredients cards */}
        <div className="bg-gray-300 p-4 rounded-lg space-y-2">
        <h2 className="text-2xl font-bold mb-6">My Ingredients</h2>
          <div className="">
            {list.map((name, index) =>(
            <div className="flex justify-between items-center mb-1">              
               <p>{name}</p>
               <button className="bg-gray-400 w-6 h-6 flex justify-center items-center mr-2" onClick={()=>deleteIngredient(name)}>
                 -
                 </button>
            </div>             
            ))}  
            <label for="apple">
          <input type="checkbox" id="selected" name="checkbox" value="selected"className="mr-3" onClick={()=>setSelected(!selected)}/>
            include all ingredient in one recipe
       </label>        
          </div> 
          
        <button  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400" onClick={SearchForRecipes}>
          Search for recipes with these ingredients</button>   
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Placeholder for recipe cards */}

          {Array.from(recipes, (recipe, index) => (
            <div key={index} className="bg-gray-500 p-4 rounded-lg space-y-2">
              <div className="text-center">
                <img src={recipe.image} alt="" className="" />
                <h3 className="text-lg font-semibold">{recipe.name}</h3>
                {/* <span>♥</span> */}
              </div>
              {/* <p># Calories</p>
              <button className="text-indigo-600 hover:text-indigo-800">
                View Ingredients
              </button> */}
              <div className="flex space-x-2">
                {/* Tags */}
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                  {recipe.category}
                </span>
                {/* <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                  TAG 2
                </span> */}
                  </div>
                  <button className="bg-black px-3 py-2 text-white rounded-sm font-semibold" >Add to Meal Plan</button>
       
                  </div>
          ))}
        </div>
      <h2 className="text-2xl font-bold mb-6">My Ingredients</h2>
      
      <div className="flex flex-wrap justify-around">
        {/* My Ingredients cards */}
        {myIngredrients.map((ingr) => {
          return <MyIngredient key={ingr._id} data={ingr}/>
        })}
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
