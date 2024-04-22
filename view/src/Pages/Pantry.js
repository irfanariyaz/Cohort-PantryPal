import React, { useEffect, useState } from "react";
import MyIngredient from "./PantryComponent/MyIngredient";
import axios from 'axios';
import { set } from "mongoose";
import { FaTrash, FaTrashCan } from "react-icons/fa6";


function Pantry(props) {
  //TEST FRIDGE ID TEMPORARY
  const fridgeID = props.profile.fridgeID._id
 
  //########################
 
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [message,setMessage] = useState("");//show form to create a Pantry list 
  const [myIngredrients, setPantry] = useState([]);
 
  const [formData,setFormData]= useState({
    routeID: fridgeID,
    ingredientID: "",
    measurement: "",
    amount: "",
    // ownerId:props.profile.profile._id
  })
 

  const handleItemClick = async(ingredient) => {
      const [value]=Object.entries(ingredient);
      setIngredients([]);
      setQuery(value[0]);
      
      setFormData({...formData, ingredientID:value[1]}) 
  } 

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
    
    //search the db with recipes with this ingredient
    console.log("formData",formData);
    const url = `/fridge/ingredient`;
    if(query==='' && Object.values(formData)[1]==="" ){
      alert("Ingredient not in the database");

    }else if(Object.values(formData)[1]===""){
      alert("Please fill in  ingredient");
    } else{
      const response = await  axios.post(url, formData);
      const data = await response.data;
      if(data ==="Success"){
        setMessage("Ingredient added to Pantry");
        setFormData({...formData,
          measurement:"",
          amount:"",
          ingredientID:""
        });
      }
      setQuery("");
      console.log(data);
    }
     
    
  
  }
const deletePantry = (id) => {
  console.log("delete pantry",id);
  const url = `/fridge/ingredient/delete`;
  if(!id){
    alert("Ingredient not in the database");
  }else{
    const response = axios.post(url, {ingredientID:id});
    const data = response.data;
  setMessage("Ingredient deleted from Pantry");
  }
}
console.log("myIngredrients",myIngredrients);
  return (
//adding a search bar to get the recipes with the ingredient user searched
    <div className="p-8">
      <div className="w-1/2">
        <form action="" className=" flex space-x-4" onSubmit={handleSubmit}>
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md capitalize "
               value={query}
               onChange={(e)=>setQuery(e.target.value)}
               placeholder="Type to search ingredients..." />
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md "
               value={formData.amount}
               placeholder="Amount" onChange={(e)=>setFormData({...formData, amount:e.target.value})}    />
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meal">
          Select 
        </label> */}
        <select
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="measure"
          value={formData.measurement}
          onChange={(e)=>setFormData({...formData,measurement:e.target.value})}
        >
        
          <option value="ounce">ounce</option>
          <option value="cup">cup</option>
          <option value="pound">pound</option>          
          <option value="tablespoon">tablespoon</option>
          <option value="">Other</option>


        </select>
      <button  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
               Add</button>
        </form>
        {message ? <p className="m-2 text-green-700 text-lg">{message}</p> : null}
        <div>
        {ingredients.map((ingredient, index) => (
          <div key={index} onClick={() => handleItemClick(ingredient)} className="capitalize cursor-pointer" >
            {Object.keys(ingredient)}
          </div>
        )) }
  
        </div>
      
      </div>
      <h2 className="text-2xl font-bold mb-6 mt-4">My Ingredients</h2>
      <div className="mr-2 mb-2 max-w-96 bg-gray-300 p-4 rounded-lg space-y-2">
          
            {myIngredrients.map((ingr,index) =>(
              <div key={index} className="flex  flex-wrap justify-between">
              <h3 className="capitalize">{ingr.name}</h3>
               <button className=" w-6 h-6 flex justify-center items-center" onClick={()=>deletePantry(ingr._id)}>
                <FaTrashCan/>
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