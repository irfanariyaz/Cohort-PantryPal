
import express from 'express';
import  {getRecipeByName, getIngredient, getRecipesById}  from '../../controller/RecipeController.js';
import{data} from './dummydata.js'
import Recipe from '../../model/recipe.js';
import mongoose from "mongoose";
const router = express.Router();
// routes for recipes
// -route for getting 10 recipes based on name(Eg:/chicken,/pasta)
// -this returns 10 cicken/pasta recipes with a id,title,
// - response example - 
/* {
        "id": 637876,
        "title": "Chicken 65",
        "image": "https://img.spoonacular.com/recipes/637876-312x231.jpg",
        "imageType": "jpg"
    },
*/

// router.get('/findByName', async(req, res) =>{
//     //destructure the query parameters for name of the recipe
//     const {name}=req.query;    
//     console.log(name);
//     //const data = await getRecipeByName(name);
//     console.log(data);
//     res.json(data);
// });
router.get('/findByName', async(req, res) =>{
    const {name}=req.query;
    console.log(name);

    const data = await getRecipeByName(name).then(
        (response) => {
            console.log(response.length, "elemts to add");
            res.json(response);
            })
     
    
});
//recipe based on ingredient/ingredients
router.get('/getIngredient', async(req, res) =>{
    const { ingredient}=req.query;
    console.log(ingredient);
    const response = await getIngredient(ingredient);
    res.json(response);
});
router.get('/getRecipes/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const recipes = await getRecipesById(id)
    .then((response)=>{
        res.json(response);
    });
   
})



export default router;