import {getRecipeByName} from '../../controller/RecipeController.js';
export const addRecipesToDb =async()=>{
    const alp='abcdefghijklmnopqrstuvwxyz';
    for (const c of alp){
        console.log("adding ",c ,"ingredients");
        const data = await getRecipeByName(c).then(
            (response) => {
                console.log(response.length, "elemts to added to database");
                
                })
       
    }
}
addRecipesToDb();