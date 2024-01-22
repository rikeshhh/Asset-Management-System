import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [Data, setData] = useState([]);

  return (
    <CategoryContext.Provider value={{ Data, setData }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};