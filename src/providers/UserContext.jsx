// providers/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import UserService from '@/services/UserService';

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [openAddRecipeModal, setOpenAddRecipeModal] = useState(false);
  const handleOpenAddRecipeModal = () => setOpenAddRecipeModal((prev) => !prev);

  const [openAddRecipeModalFull, setOpenAddRecipeModalFull] = useState(false);
  const handleOpenAddRecipeModalFull = () =>
    setOpenAddRecipeModalFull((prev) => !prev);

  const [openGenerateMealPlanModal, setOpenGenerateMealPlanModal] =
    useState(false);
  const handleOpenGenerateMealPlanModal = () =>
    setOpenGenerateMealPlanModal((prev) => !prev);

  const [currentRecipe, setCurrentRecipe] = useState({});
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetchCurrentlyLoggedInUser();
  }, [session, status]);

  useEffect(() => {
    console.log('USER FROM PROVIDER');
    console.log(user);
  }, [user]);

  const fetchCurrentlyLoggedInUser = async (_) => {
    setIsLoadingUser(true);
    try {
      if (status === 'authenticated') {
        const response = await UserService.getCurrentlyLoggedInUser();

        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
  };

  const [isCollapsed, setIsCollapsed] = useState(false); // State to handle collapse

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        handleOpenAddRecipeModal,
        openAddRecipeModal,
        openAddRecipeModalFull,
        handleOpenAddRecipeModalFull,
        currentRecipe,
        setCurrentRecipe,
        user,
        fetchCurrentlyLoggedInUser, // Export this function
        handleLogout,
        isLoadingUser,
        handleOpenGenerateMealPlanModal,
        openGenerateMealPlanModal,
        setOpenGenerateMealPlanModal,
        isCollapsed,
        setIsCollapsed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User context
export const useUser = () => useContext(UserContext);
