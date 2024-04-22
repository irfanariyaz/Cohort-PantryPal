import {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { MealPrepModal } from "../Modals/MealPrepModal";

function SearchRecipe({profile}) {
    const [recipes, setRecipes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const openModal = (recipeId, recipe_name) => {
      setIsOpen(true);
      console.log(recipe_name, "RIGHTHERE");
      setModalData({
        recipeId: recipeId,
        recipe_name: recipe_name,
        fridgeID: profile.fridgeID._id,
      });
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };

    useEffect(() => {
        async function search() {
            const url = "fridge/recipe/search/?fridgeID=" + profile.fridgeID._id;
    
            const data = await fetch(url).then(async (res) => {
                return await res.json().catch((error) => {console.error(error)});
            }).catch((error) => {
                console.error(error);
            });
            setRecipes(data.incomplete);
            return data.incomplete;
        }

        search();
    }, []);

    function Missing(props) {
        let missing = props.recipe.ingredients.length - props.recipe.counter;
        return (<span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
            Missing {missing} ingredients</span>);
    }

    return (
        <div className="">
            <h1 className="text-2xl font-bold my-5 mr-5">Recipes based off your ingredients:</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {recipes.map((recipe, index) => (
                    <div key={index} className="bg-gray-500 p-4 rounded-lg space-y-2">
                    <div className="text-center">
                        <NavLink to={`/recipes/${recipe._id}`}>
                        <img src={recipe.image} alt="" className="" />
                        </NavLink>

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
                        <Missing recipe={recipe}/>
                    </div>
                    <button className="bg-black px-3 py-2 text-white rounded-sm font-semibold" onClick={() => {openModal(recipe._id, recipe.name)}}>
                        Add to Meal Plan
                    </button>
                    </div>
                ))}
            </div>
            <MealPrepModal
                     isOpen={isOpen}
                     onClose={closeModal}
                     modalData={modalData}
                    />
        </div>
    );
}

export default SearchRecipe;