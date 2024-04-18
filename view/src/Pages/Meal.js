import React, { useEffect, useState } from "react";
import axios from 'axios';
import { set } from "mongoose";
function Pantry() {

  const [recipes, setRecipes] = useState([]);
  const [queryList,setquerytList]=useState([]);
  const [ingSelectList,setIngSelectList] = useState([]);
  const [list,setlist]= useState([]);
  const [selected,setSelected] = useState(false);
 
 

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

      <div className="grid grid-cols-1 sm:grid-cols-l lg:grid-cols-5 gap-4 mb-8">
          {/* Placeholder for recipe cards */}

          {Array.from(recipes, (recipe, index) => (
            <div key={index} className="bg-gray-500 p-3 rounded-lg space-y-2 ">
              <div className="text-start">
                <img src={recipe.image} alt="" className="cursor-pointer" />
                <h3 className="text-md font-semibold  mt-1">
                {recipe.name<20? recipe.name:recipe.name.substring(0,20)+"..."}
                </h3>
               
              </div>
            
              <div className="flex space-x-2">
               
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                {recipe.category.length>7?recipe.category.substring(0,6) +"...":recipe.category}
                </span>
                <button className="bg-black text-xs px-2 text-white rounded-sm font-semibold" >Add to Meal Plan</button>
       
                  </div>
                 
                  </div>
          ))}
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
