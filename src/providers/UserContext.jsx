import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContent = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openAddRecipeModal, setOpenAddRecipeModal] = useState(false);
  const handleOpenAddRecipeModal = () => setOpenAddRecipeModal((prev) => !prev);

  return (
    <UserContent.Provider
      value={{
        isLoading,
        setIsLoading,
        handleOpenAddRecipeModal,
        openAddRecipeModal,
      }}
    >
      {children}
    </UserContent.Provider>
  );
};

// Custom hook to use the Loading context
export const useUser = () => useContext(UserContent);
