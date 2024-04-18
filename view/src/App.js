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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
