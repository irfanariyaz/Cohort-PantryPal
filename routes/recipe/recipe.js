
import express from 'express';
import  {getIngredient, getRecipesById,
        getRecipesByCategory,getRecipesByName, getRecipeById}  
        from '../../controller/RecipeController.js';
//import{data} from './dummydata.js'
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
    const recipes = await getRecipesById(id)
    .then((response)=>{
        res.json(response);
    });
   
})

//endpoint to get recipes based on user category
router.get('/category/:category',async(req, res)=>{
    const category = req.params.category;    
    //get recipes from db based on category
    const recipes = await getRecipesByCategory(category)
        .then((response)=>{
            res.json(response)
        });
});

//endpoint to get recipes based on user searched term
router.get('/:search',async(req, res)=>{
    const search = req.params.search;
    //get recipes from db based on  the search term
    const recipes = await getRecipesByName(search)
        .then((response)=>{
            res.json(response)
        });
});

//will get the recipe properties to show the user the description of the recipe such as: instructions, macros, etc
router.get('/findById/:id', async (req, res) => {
    const { id } = req.params; // Access route parameter ":id" using req.params
    console.log(id);

    try {
        const recipe = await getRecipeById(id);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;