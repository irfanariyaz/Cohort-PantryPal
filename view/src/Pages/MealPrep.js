//Users are able to Meal Prep and returns a list of grocerry items that they need to purchase
import axios from 'axios'
import React, { useEffect,useState } from 'react'

export default function  MealPrep(props) {
  const fridgeId=props.profile.fridgeID._id;
  const [meals, setMeals] = useState([]);
  const [tableData, setTableData] = useState([]);
  const daysOfWeek = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday",];
  const mealTimes = ["Breakfast", "Lunch", "Dinner"];

  const createmealPrep = (meals) => {
  const tableData = [];
  const mon_rec= meals.filter(meal=>meal.day ==="monday");
  const tue_rec= meals.filter(meal=>meal.day ==="tuesday");
  const wed_rec= meals.filter(meal=>meal.day ==="wednesday");
  const thu_rec= meals.filter(meal=>meal.day ==="thursday");
  const fri_rec= meals.filter(meal=>meal.day ==="friday");
  const sat_rec= meals.filter(meal=>meal.day ==="saturday");
  const sun_rec= meals.filter(meal=>meal.day ==="sunday");
  tableData.push(mon_rec);
  tableData.push(tue_rec);
  tableData.push(wed_rec);
  tableData.push(thu_rec);
  tableData.push(fri_rec);
  tableData.push(sat_rec);
  tableData.push(sun_rec);
  console.log(tableData);
  setTableData(tableData);
}
console.log(tableData);
  useEffect(() => {
    const fetchData = async () => {
      const url = '/fridge/meal'
    const response = await axios.get(url,{params:{fridgeId:fridgeId}});
          console.log("response",response.data);
          const mealPrep = createmealPrep(response.data);
          setMeals(response.data);
  }
  fetchData();
},[])

  return (
    <div>
        <div class="bg-gray-100 p-4">
  <h1 class="text-2xl font-bold mb-4">Weekly Meal Schedule</h1>
  {/* <table class="w-full border-collapse border border-gray-200">
    <thead>
      <tr>
        <th class="border border-gray-200 p-2">Day</th>
        <th class="border border-gray-200 p-2">Breakfast</th>
        <th class="border border-gray-200 p-2">Lunch</th>
        <th class="border border-gray-200 p-2">Dinner</th>
      </tr>
    </thead>
    
    
        <tbody>
 <tr>
 <td class="border border-gray-200 p-2">Monday</td>

 <td class="border border-gray-200 p-2">{(meals.monday.filter(meal=>meal.mealtimes =="Breakfast")).
 recipe_name}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Lunch")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Dinner")}</td>
</tr>
<tr>
 <td class="border border-gray-200 p-2">Tuesday</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Breakfast")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Lunch")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Dinner")}</td>

</tr>
<tr>
 <td class="border border-gray-200 p-2">Wednesday</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Breakfast")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Lunch")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Dinner")}</td>

</tr>
<tr>
 <td class="border border-gray-200 p-2">Thursday</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Breakfast")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Lunch")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Dinner")}</td>

</tr>
<tr>
 <td class="border border-gray-200 p-2">Friday</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Breakfast")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Lunch")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Dinner")}</td>

</tr>
<tr>
 <td class="border border-gray-200 p-2">Saturday</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Breakfast")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Lunch")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Dinner")}</td>

</tr>
<tr>
 <td class="border border-gray-200 p-2">Sunday</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Breakfast")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Lunch")}</td>
 <td class="border border-gray-200 p-2">{meals.monday.filter(meal=>meal.mealtimes =="Dinner")}</td>

</tr>
</tbody>
  
     

  </table> */}
   <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-200 p-2">Day</th>
          {mealTimes.map(mealTime => (
            <th key={mealTime} className="border border-gray-200 p-2">{mealTime}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map((day, index) => (
          <tr key={day}>
            <td className="border border-gray-200 p-2">{day}</td>
            {mealTimes.map(mealTime => {
              const meal = tableData[index] ? tableData[index].filter(meal => meal.mealtimes === mealTime) : null;
              let names=[];
              if(meal?.length>1){
                 names = meal ? meal.map(recipe => recipe.recipe_name.length >15 ? recipe.recipe_name.substring(0, 15) + "..." : res) : null;
              }else{
                 names = meal ? meal.map(recipe => recipe.recipe_name) : null;
              }
                const res= names ? names.join(", ") : '';
              console.log(meal,names,res);
              return (
                <td key={mealTime} className="border border-gray-200 p-2">
                
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
