import { useState, useEffect } from 'react';
import AddRecipeButton from '@/components/buttons/AddRecipeButton';
import { useUser } from '@/providers/UserContext';
import { useParams } from 'next/navigation';
import UserService from '@/services/UserService';
import Image from 'next/image';

const RecipeProfile = () => {
  const { user } = useUser();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('id:');
    console.log(id);
  }, [user]);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await UserService.getRecipeById(id);

      console.log('RECIPE:');
      console.log(response.recipe);

      setRecipe(response.recipe);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>Recipes</h1>
        <AddRecipeButton />
      </header>
      <main className="p-5 flex flex-col gap-5 max-w-[600px] mx-auto">
        <div
          className="flex-auto rounded-lg  h-[180px] relative"
          style={{
            backgroundImage: `url(${recipe?.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <h2 className="absolute top-2 left-2 flex items-center justify-center text-white text-lg font-bold">
            {recipe.title}
          </h2>
          <a
            href={recipe.sourceUrl}
            className="absolute bottom-2 left-2 flex items-center justify-center text-white text-sm font-bold bg-black bg-opacity-50 rounded-full px-3 py-1"
            target="_blank"
            rel="noreferrer noopener"
          >
            {recipe.sourceName}
          </a>
        </div>
      </main>
    </div>
  );
};
export default RecipeProfile;
