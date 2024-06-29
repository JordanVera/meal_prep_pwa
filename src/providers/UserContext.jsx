// providers/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openAddRecipeModal, setOpenAddRecipeModal] = useState(false);
  const handleOpenAddRecipeModal = () => setOpenAddRecipeModal((prev) => !prev);

  const [openAddRecipeModalFull, setOpenAddRecipeModalFull] = useState(false);
  const handleOpenAddRecipeModalFull = () =>
    setOpenAddRecipeModalFull((prev) => !prev);

  const [currentRecipe, setCurrentRecipe] = useState({});
  const [user, setUser] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
    if (status === 'authenticated') {
      console.log('USER FROM PROVIDER');
      console.log({ user: session.user });
      setUser(session.user);
    } else {
      setUser(null);
    }
  }, [session, status]);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
  };

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
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the User context
export const useUser = () => useContext(UserContext);
