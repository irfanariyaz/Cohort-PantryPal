//Users are able to Meal Prep and returns a list of grocerry items that they need to purchase
import axios from 'axios'
import React, { useEffect,useState } from 'react'

export default function  MealPrep(props) {
  //const fridgeId='6620f09f1e7dc4f70c80e1bc';

  const fridgeId = props.profile.fridgeID._id;
  const [meals, setMeals] = useState([]);
  const [macroData, setMacro] = useState([]);
  const [tableData, setTableData] = useState([]);

  const daysOfWeek = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday",];
  const mealTimes = ["Breakfast", "Lunch", "Dinner","Macros"];

  //function get total macros for a day
  function getmacro (list){
    const macros = list.map(meal => meal.macros);
   const totalMacros = macros.reduce((acc, macro) => {
      acc.calories += macro.calories;
      acc.protein += macro.protein;
      acc.carbohydrates += macro.carbohydrates;
      acc.total_fat += macro.total_fat;
      return acc;
    })
    return totalMacros;
  };
  //function to create mealPrep data
  const createmealPrep = (meals) => {
  const tableData = [];
  const mon_rec= meals.filter(meal=>meal.day ==="monday");
  const tue_rec= meals.filter(meal=>meal.day ==="tuesday");
  const wed_rec= meals.filter(meal=>meal.day ==="wednesday");
  const thu_rec= meals.filter(meal=>meal.day ==="thursday");
  const fri_rec= meals.filter(meal=>meal.day ==="friday");
  const sat_rec= meals.filter(meal=>meal.day ==="saturday");
  const sun_rec= meals.filter(meal=>meal.day ==="sunday");
  console.log("sunday recipes",sun_rec);

  tableData.push(mon_rec);
  tableData.push(tue_rec);
  tableData.push(wed_rec);
  tableData.push(thu_rec);
  tableData.push(fri_rec);
  tableData.push(sat_rec);
  tableData.push(sun_rec);
  setTableData(tableData);
  createMacroData(tableData);
};
const createMacroData = (tableData)=>{
  const macroData = [];
  tableData.map(day=>{
    //get macros for a day
    console.log("day",day);
    if(day.length>0){
      const macros =getmacro(day);
      macroData.push(macros);
    }  else{
      macroData.push(null);
    }
     
  })
  setMacro(macroData);
  console.log("macroData", macroData);

}
  useEffect(() => {
    const fetchData = async () => {
      const url = '/fridge/meal'
      const response = await axios.get(url,{params:{fridgeId:fridgeId}});
      const mealPrep = createmealPrep(response.data);
      setMeals(response.data);
  }
  fetchData();
},[])

 console.log("macroData",macroData); 
 return (
    <div>
        <div class="bg-gray-100 p-4">
  <h1 class="text-2xl font-bold mb-4">Weekly Meal Schedule</h1>

   <table className="border-collapse w-3/4 m-auto border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Day</th>
          {mealTimes.map(mealTime => (
            <th key={mealTime} className="border border-gray-300 p-2">{mealTime}</th>
          ))}
        
        </tr>
       
      </thead>
      <tbody>
        {daysOfWeek.map((day, index) => (
          <tr key={day}>
            <td className="border border-gray-300 p-2">{day}</td>
            {mealTimes.map(mealTime => {if(mealTime === "Macros")
              return (
                <td key={mealTime}
                 className="border border-gray-300 p-2 text-sm">
                  {/* {tableData[index] ? tableData[index].filter(meal => meal.mealtimes === mealTime)[0].macros : null} */}
                 <i>Calories</i>: <span className='ml-1'>{macroData[index] ? macroData[index].calories : null}</span><br/>
                 <i>Carbs</i>:<span className='ml-1'> {macroData[index] ? macroData[index].carbohydrates : null} g</span> <br/>
                 <i>Protein</i>: <span className='ml-1'>{macroData[index] ? macroData[index].protein : null} g</span><br/>
                 <i>Fat</i>:<span className='ml-1'> {macroData[index] ? macroData[index].total_fat : null} g</span>
                </td>
              )
              const meal = tableData[index] ? tableData[index].filter(meal => meal.mealtimes === mealTime) : null;
              let names=[];
              if(meal?.length>1){
                 names = meal ? meal.map(recipe => recipe.recipe_name.length >15 ? recipe.recipe_name.substring(0, 15) + "..." : recipe.recipe_name) : null;
              }else{
                 names = meal ? meal.map(recipe => recipe.recipe_name) : null;
              }
                const res= names ? names.join(", ") : '';
              return (
                <td key={mealTime} className="border border-gray-300 p-2">
                
                 {res}
                </td>
              );
            })}
          
          </tr>
          
        ))}
        
      </tbody>
    </table>
</div>
    </div>
  )
}
