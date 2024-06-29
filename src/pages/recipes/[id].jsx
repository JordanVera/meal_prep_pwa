import { useState, useEffect } from 'react';
import AddRecipeButton from '@/components/buttons/AddRecipeButton';
import { useUser } from '@/providers/UserContext';
import { useParams } from 'next/navigation';
import UserService from '@/services/UserService';

const RecipeProfile = () => {
  const { user } = useUser();
  const { id } = useParams();

  useEffect(() => {
    console.log('id:');
    console.log(id);
  }, [user]);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await UserService.getRecipeById(id);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>Recipes</h1>
        <AddRecipeButton />
      </header>
      <main className="m-5 flex flex-col gap-5"></main>
    </div>
  );
};
export default RecipeProfile;
