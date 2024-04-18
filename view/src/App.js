import "./App.css";
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import Home from "./Home";

import Dashboard from "./Pages/Dashboard";
import Pantry from "./Pages/Pantry";
import Recipes from "./Pages/Recipies";
import Navbar from "./Pages/Components/Navbar";
import Sidebar from "./Pages/Components/Sidebar";
import ShowRecipeItem from "./Pages/Recipes/ShowRecipeItem";
import Meal from "./Pages/Meal.js";
// import ShowRecipeItem from "./Pages/ShowRecipeItem";

function App() {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      const url = "/user/profile";
      await fetch(url).then(async (res) => {
        setProfile(await res.json());
      }).catch((error) => {
        console.error(error);
      });
    }

    fetchUserProfile();
  }, []);

  function Protected() {
    if (profile) {
      return (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="p-4 overflow-auto w-full">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pantry" element={<Pantry />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<ShowRecipeItem />} />
              <Route path="/login" element={<Login />} />
              <Route path="/meal" element={<Meal />} />
            </Routes>
          </main>
        </div>
      );
    } else {
      return (
        <h1 className="text-center text-lg">Please Login</h1>
      );
    }
  }

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar data={profile}/>
        <Protected />
      </div>
    </Router>
  );
}

export default App;
