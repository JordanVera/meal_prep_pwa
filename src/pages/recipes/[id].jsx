import { useState, useEffect } from 'react';
import AddRecipeButton from '@/components/buttons/AddRecipeButton';
import { useUser } from '@/providers/UserContext';
import { useParams } from 'next/navigation';
import UserService from '@/services/UserService';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import { Link, Play, Send, Users } from 'lucide-react';

const RecipeProfile = () => {
  const { user, fetchCurrentlyLoggedInUser } = useUser();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const deleteRecipe = async () => {
    setLoading(true);
    try {
      const response = await UserService.deleteRecipeById(id);

      console.log(response);
      await fetchCurrentlyLoggedInUser();

      router.push('/recipes');
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
        <button
          onClick={deleteRecipe}
          className="border border-red-500 bg-red-500 text-red-500 bg-opacity-50 py-1 px-2 rounded-md"
        >
          Delete Recipe
        </button>
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
        <section className="flex justify-between">
          <button className="rounded-full bg-green-500 bg-opacity-50 text-green-500 items-center justify-center px-3 py-1 flex gap-2">
            <Play className="h-5 w-5 text-green-500" />
            Start
          </button>

          <div className="flex gap-3">
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-blue-500 bg-opacity-50 flex items-center justify-center p-3"
            >
              <Link className="h-5 w-5 text-blue-500" />
            </a>
            <button className="rounded-full bg-purple-500 bg-opacity-50 flex items-center justify-center p-3">
              <Send className="h-5 w-5 text-purple-500" />
            </button>
          </div>
        </section>

        <div className="bg-zinc-700 text-gray-400 rounded-xl py-2 w-full flex justify-center items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          {recipe.servings}
        </div>
        <div>
          <h2 className="text-white font-bold text-sm mb-2">Instructions</h2>

          <div className="flex flex-col gap-5">
            {recipe?.Step?.sort((x, y) => x.step - y.step).map((step) => (
              <div className="flex gap-3.5 bg-zinc-700 rounded-xl p-3">
                <div>
                  <p className="rounded-full bg-blue-500 h-6 w-6 flex items-center justify-center text-xs">
                    {step.step}
                  </p>
                </div>
                <p className="text-xs">{step.content}</p>
              </div>
            ))}
          </div>
          {/* <div
            dangerouslySetInnerHTML={{
              __html: recipe.instructions.replace(/\n/g, '<br />'),
            }}
          ></div> */}
        </div>
      </main>
    </div>
  );
};

export default RecipeProfile;
