import React, { createContext, useState ,useContext,useEffect} from 'react';
import { UserContext } from './UserContext';

// Create a context
const PantryContext = createContext();

// Create a provider component
const PantryProvider = ({ children }) => {
  
    const { profile,fridgeID } = useContext(UserContext);
  //  console.log("pantrylist from pantry",pantryList);


  // Define any functions or state you want to share with child components

  return (
    <PantryContext.Provider value={{}}>
      {children}
    </PantryContext.Provider>
  );
};

export { PantryContext, PantryProvider };
