import "./App.css";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./Pages/Home";

import Dashboard from "./Pages/Dashboard";
import Pantry from "./Pages/Pantry";
import Recipes from "./Pages/Recipes";
import Navbar from "./Pages/Components/Navbar";
<<<<<<< HEAD
import Sidebar from "./Pages/Components/Sidebar";
import ShowRecipeItem from "./Pages/Recipes/ShowRecipeItem";
=======
import ShowRecipeItem from "./Pages/ShowRecipeItem";
>>>>>>> bray

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="p-4 overflow-auto w-full">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pantry" element={<Pantry />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<ShowRecipeItem />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </div>
=======
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
          path="/recipe/:id"
          element={
            <Layout>
              <ShowRecipeItem />
            </Layout>
          }
        />
      </Routes>
>>>>>>> bray
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
