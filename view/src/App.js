import "./App.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";

import Dashboard from "./Pages/Dashboard";
import Pantry from "./Pages/Pantry";
import Recipes from "./Pages/Recipes";
import Navbar from "./Pages/Components/Navbar";
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
      <div>
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/pantry"
          element={
            <Layout>
              <Pantry />
            </Layout>
          }
        />
        <Route
          path="/recipes"
          element={
            <Layout>
              <Recipes />
            </Layout>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <Layout>
              <ShowRecipeItem />
            </Layout>
          }
        />
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Protected />
      </Routes>
    </Router>
  );
}

function Layout({ children }) {
  let location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div className="flex">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}

export default App;
