import React, { useEffect, useState } from "react";
import axios from 'axios';
import { IngredientModal } from "../Modals/IngredientModal";

import { MealPrepModal } from "../Modals/MealPrepModal";
function Pantry(props) {
  const fridgeID = props.profile.fridgeID._id;
  const [recipes, setRecipes] = useState([]);
  const [queryList,setquerytList]=useState([]);
  const [ingSelectList,setIngSelectList] = useState([]);
  const [list,setlist]= useState([]);
  const [selected,setSelected] = useState(false);

  const [showIngredientNeeded,setShowIngreedientNeeded] = useState(false);
  const [IngredientSelected,setIngredientSelected] = useState('');
  const[IngredientsNeeded,setIngredientneeded]=  useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenIng, setIsOpenIng] = useState(false);
  const [modalData,setModalData]= useState({});
  

  const openModal = (recipeId,recipe_name) => {
    setIsOpen(true);
    setModalData({
      recipeId:recipeId,
      recipe_name:recipe_name,
      fridgeID:fridgeID
    })
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModalIng=(id,name,image)=>{
    setIngredientSelected(id);
    setIsOpenIng(true);
    setModalData({
      recipeId:id,
      recipe_name:name,
      image,image
    })

  }
  const closeModalIng = () => {
    setIngredientneeded('');
    setIsOpenIng(false);
  }

  useEffect(()=>{
   const   fetchrecipe = async () => {
        const url = `/recipes/findById/${IngredientSelected}`;
        const response = await axios.get(url);
        const data = await response.data.ingredients;
          const iNeed = data.filter((item) => !list.includes(item));
        const iHave = list.filter((item) => data.includes(item));       
        setIngredientneeded([iHave,iNeed]);       
    }
    if(IngredientSelected){
        fetchrecipe();
        setShowIngreedientNeeded(true);
    }    
  },[IngredientSelected]);

 

//function to handle when user types the list of ingredients with comma and press the search button
  const handleQueryClick = async() => {
    if(queryList===""){
      alert("Please enter ingredients");
    }else{
      const  url = `/recipes/ingredients/${queryList}`;
      const response =await axios.get(url);
      const data = await response.data;
    setIngSelectList(data);
      
    }

  }
//function to add list of ingredients selected
  const addIngredientToList = (value)=>{
  const newList = [...list,value];
  setlist(newList);
  }
  //function to remove ingredients from list 
  const deleteIngredient = (value)=>{
  const newList = list.filter(item => item !== value);
  setlist(newList);
  }
   //function to fetch the recipes based on the list of ingredients selected
  const SearchForRecipes =async()=>{
    const url = `/recipes/recipeList`
    const response = await axios.get(url,{params:{values:list,selected:selected}});
    const data =await  response.data;
    setRecipes(data);  
  }

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
            <div  className="grid grid-cols-5 gap-2 ">
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
            <label htmlFor="apple">
          <input type="checkbox" id="selected" name="checkbox" value="selected"className="mr-3" onClick={()=>setSelected(!selected)}/>
            include all ingredient in one recipe
       </label>        
          </div> 
          
        <button  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400" onClick={SearchForRecipes}>
          Search for recipes with these ingredients</button>   
        </div>
      </div>
      {recipes && <p className="text-2xl font-bold mb-6"> {recipes.length ==20? recipes.length +"+": recipes.length} Recipes</p> }

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {/* Placeholder for recipe cards */}

          {Array.from(recipes, (recipe, index) => (

            <div key={index} className="bg-gray-500 p-3 rounded-lg space-y-2 ">
              <div className="text-start">
                <img src={recipe.image} alt="" className="cursor-pointer"  onClick={()=>openModalIng(recipe._id,recipe.name,recipe.image)}/>
               <h3 className="text-md font-semibold  mt-1">
                {recipe.name<20? recipe.name:recipe.name.substring(0,20)+"..."}
                </h3>
               
              </div>
            
              <div className="flex space-x-2">
               
                <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                {recipe.category.length>7?recipe.category.substring(0,6) +"...":recipe.category}
                </span>
                <button className="bg-black text-xs px-2 text-white rounded-sm font-semibold" onClick={()=>openModal(recipe._id,recipe.name)}>Add to Meal Plan</button>
               
                  </div>
                 
                  </div>
          ))}
        </div>
        <MealPrepModal isOpen={isOpen} modalData={modalData} onClose={closeModal} />
       
        <IngredientModal isOpen = {isOpenIng} onClose = {closeModalIng} IngredientsNeeded={IngredientsNeeded}  modalData={modalData}/>
        

      {showIngredientNeeded && ""
      // <div className="">
      // <h2 className="text-2xl font-bold mb-6">Ingredients I Need to make this recipe</h2>
      // <div className="grid grid-cols-2 gap-4 mb-6">
      //   {/* Ingredients I Need cards */}
      //   <div className="bg-gray-300 p-4 rounded-lg space-y-2">
      
      //     <div className="flex justify-around">
      //         <div>
      //           <h3 className="text-lg font-semibold">I have</h3>
      //             {IngredientsNeeded[0]?.map((name, index) =>(
      //               <div key={index} className="flex justify-between items-center mb-1">
      //                   <p>{name}</p>
      //               </div>
      //               ))}
      //         </div>
      //         <div>
      //           <h3 className="text-lg font-semibold">I need</h3>
      //             {IngredientsNeeded[1]?.map((name, index) =>(
      //               <div key={index} className="flex justify-between items-center mb-1">
      //                   <p>{name}</p>
                  
      //               </div>))}
      //         </div>
      //     </div>
          
      //   </div>
      // </div>
      // </div>    
       }

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
            Add
             to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pantry;
