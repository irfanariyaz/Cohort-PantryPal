import Ingredient from "../../model/ingredient.js";

///function to create a new ingredient 

const createnewIngredient = async(ingredientName)=>{
    const apikey = "v8DwpSZG6jMH6cVdL33k3lqvVEbp4KYMMf4KssSA";
    let result = {};
  const url =  `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apikey}&query=${ingredientName}`;
  console.log('url',url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.foods && data.foods.length > 0) {
        const foodItem = data.foods[0]; // Assuming we use the first matched food item
        console.log("found the item from USDA",foodItem.fdcId);
        //check if the ingredient already exists in the database
        const existingIngredient = await Ingredient.findOne({ fdc_id: foodItem.fdcId })
        if (existingIngredient) {
            console.log("ingredient already in db");
            result= existingIngredient;
        }else{
            //save to db
            await getNutrientValues(foodItem.foodNutrients)
            .then(async(res)=>{
               const ingredient = await Ingredient.create({
                    name: foodItem.description,
                    fdc_id: foodItem.fdcId,
                   nutrients: res,
                })
               console.log("created an ingredient and saved");
             result =ingredient;
            }
            );

        }
       // console.log(foodItem);
      
        
    } else {
        throw new Error('Food item not found');
    }
} catch (error) {
    console.error('Error searching for food item:', error);
    throw error;
}
return  result;
}
const getNutrientValues = async(nutrients)=>{
    //console.log(nutrients);
    const nutrientValues = {
        calories:0,
        cholesterol: 0,
        protein: 0,
        total_fat: 0,
        carbohydrates: 0,
        total_saturated_fats:0,
        total_trans_fats:0,
        total_monosaturated_fats:0
        };
    nutrients.forEach(nutrient => {
        switch(nutrient.nutrientName) {
            case "Protein":
                nutrientValues.protein =  Math.floor(nutrient.value);
                console.log("",typeof nutrient.value);
                break;
            case 'Total lipid (fat)':
                nutrientValues.total_fat = Math.floor(nutrient.value);
                break;
            case 'Carbohydrate, by difference':
                nutrientValues.carbohydrates = Math.floor(nutrient.value);
                break;
            case 'Energy':
                nutrientValues.calories = Math.floor(nutrient.value);
                break;
            case 'Cholesterol':
                nutrientValues.cholesterol = Math.floor(nutrient.value);
                break;
            case 'Fatty acids, total saturated':
                nutrientValues.total_saturated_fats = Math.floor(nutrient.value);
                break;
            case 'Fatty acids, total trans':
                nutrientValues.total_trans_fats = Math.floor(nutrient.value);
                break;
            case 'Fatty acids, total monounsaturated':
                nutrientValues.total_monosaturated_fats = Math.floor(nutrient.value);
                break;

            default:
                break;
        }
        
    })
    return nutrientValues;

}
export default createnewIngredient;
// const res = await createnewIngredient(ingredientName);
// console.log("res",res);