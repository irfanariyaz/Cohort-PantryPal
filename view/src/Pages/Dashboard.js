import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import { NavLink } from "react-router-dom";
import { MealPrepModal } from "../Modals/MealPrepModal";
import { IngredientModal } from "../Modals/IngredientModal";

function Dashboard(props) {
  const fridgeID = props.profile.fridgeID._id;
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [recipeSelected, setRecipeSelected] = useState("");
  const [IngredientsNeeded, setIngredientneeded] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isOpenIng, setIsOpenIng] = useState(false);
  const [pantryList, setPantryList] = useState([]);

  const openModal = (recipeId, recipe_name) => {
    setIsOpen(true);
    setModalData({
      recipeId: recipeId,
      recipe_name: recipe_name,
      fridgeID: fridgeID,
    });
    console.log(modalData);
  };
  console.log("isOpen", isOpen);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModalIng = (id, name, image) => {
    setRecipeSelected(id);
    setIsOpenIng(true);
    setModalData({
      recipeId: id,
      recipe_name: name,
      image,
      image,
    });
  };
  const closeModalIng = () => {
    setIngredientneeded("");
    setIsOpenIng(false);
  };

  useEffect(() => {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.categories);
        setCategories(data.categories);
      });
  }, []);
  const handleCategory = (category) => {
    setRecipes([]);
    const url = `/recipes/category/${category}`;
    console.log("response reached from category end");
    axios.get(url).then((response) => {
      console.log("response from server", response.data.length, response.data);
      setRecipes(response.data);
      // console.log(recipes);
    });
  };
  useEffect(() => {
    const fetchrecipe = async () => {
      const url = `/recipes/findById/${recipeSelected}`;
      const response = await axios.get(url);
      const data = await response.data.ingredients;
      console.log("from recipe", data);
      //get pantry items
      const iNeed = data.filter((item) => !pantryList.includes(item));
      const iHave = pantryList.filter((item) => data.includes(item));
      setIngredientneeded([iHave, iNeed]);
    };
    if (recipeSelected) {
      fetchrecipe();
    }
  }, [recipeSelected]);
  //PANTRY HOOK FOR "MY INGREDIENTS"
  useEffect(() => {
    const fetchPantry = async () => {
      const endpoint = "/fridge/ingredient?fridgeID=" + fridgeID;

      const res = await fetch(endpoint).catch((error) => {
        console.error(error);
      });
      const data = await res.json();
      const list = data.map((item) => item.name);
      console.log(list);
      setPantryList(list);
    };

    fetchPantry();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search logic here
    console.log("Search term:", searchTerm);
    // Update the recipes state with the search  results using axios
    if (!searchTerm) {
      alert("Please enter a search term");
      return;
    } else {
      const url = `/recipes/search/${searchTerm}`;
      //got to the recipe controller in backend to get the recipes based on user's search
      axios.get(url).then((response) => {
        console.log(
          "response from server",
          response.data.length,
          response.data
        );
        setRecipes(response.data);
        // console.log(recipes);
      });
    }
  };

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="p-8 mx-auto max-w-7xl">
      <section>
        <div className="container animate-fade">
          {/* create a search bar menu with a search button */}
          <div className="flex  items-center mb-8">
            <h2 className="text-2xl font-bold mx-2">Search for recipes </h2>
            <div>
              <form className="flex space-x-4 mb-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
                  Search
                </button>
              </form>
            </div>
          </div>
          {/* create a filter menu with a filter button */}
        </div>
        <h2 className="text-2xl font-bold mb-6 animate-fade">Categories</h2>
        <div className="flex space-x-4 mb-8 ">
          {/* Placeholder for category cards */}
          {Array.from(categories, (category, index) => (
            <div className="">
              <img
                src={category.strCategoryThumb}
                className={`cursor-pointer animate-fade`}
                alt="category image"
                width={"100px"}
                onClick={() => handleCategory(category.strCategory)}
              />
              <p className="w-full" key={index}>
                {category.strCategory}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex justify-between items-center animate-fade">
          <span>My Recipes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Placeholder for recipe cards */}

          {Array.from(recipes, (recipe, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-green-800 dark:border-gray-700 animate-fade-down animate-delay-100"
            >
              <NavLink to={`/recipes/${recipe._id}`}>
                <img src={recipe.image} alt="" className="rounded-t-lg" />
              </NavLink>
              <div className="text-start flex flex-col gap-y-3 items-start p-5">
                <h3 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate">
                  {truncateString(recipe.name, 20)}
                </h3>

                <button
                  className="text-indigo-300 hover:text-indigo-800"
                  onClick={() =>
                    openModalIng(recipe._id, recipe.name, recipe.image)
                  }
                >
                  View Ingredients
                </button>
                <div className="flex space-x-2 justify-start">
                  {/* Tags */}
                  <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                    {recipe.category}
                  </span>
                  {/* <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                  TAG 2
                </span> */}
                </div>
              </div>
              <button
                className="bg-black px-3 py-2 text-white rounded-sm font-semibold w-full"
                onClick={() => openModal(recipe._id, recipe.name)}
              >
                Add to Meal Plan
              </button>
            </div>
          ))}

          <MealPrepModal
            isOpen={isOpen}
            modalData={modalData}
            onClose={closeModal}
          />
          <IngredientModal
            isOpen={isOpenIng}
            onClose={closeModalIng}
            IngredientsNeeded={IngredientsNeeded}
            modalData={modalData}
          />
        </div>
      </section>
    </div>
  );
}
export default Dashboard;
