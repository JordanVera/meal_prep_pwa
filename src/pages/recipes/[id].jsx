import { useState, useEffect } from 'react';
import RecipeProfileHeaderButton from '@/components/buttons/RecipeProfileHeaderButton';
import { useUser } from '@/providers/UserContext';
import { useParams } from 'next/navigation';
import UserService from '@/services/UserService';
import { useRouter } from 'next/router';
import { Link, Play, Send, Users } from 'lucide-react';
import Ingredients from '@/components/recipes/Ingredients';
import Instructions from '@/components/recipes/Instructions';
import DeleteRecipeConfirmation from '@/components/modals/DeleteRecipeConfirmation';
import { Skeleton } from '@mui/material';

const RecipeProfile = () => {
  const { user, fetchCurrentlyLoggedInUser } = useUser();
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const [measurementSystem, setMeasurementSystem] = useState('us');
  const [openDeleteRecipeModal, setOpenDeleteRecipeModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log('openDeleteRecipeModal: ');
    console.log(openDeleteRecipeModal);
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
    return (
      <div>
        <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800  px-5">
          <Skeleton variant="text" width={150} height={40} />
        </header>

        <main className="p-5 flex flex-col gap-5 max-w-[600px] mx-auto">
          <Skeleton variant="rectangular" width="100%" height={180} />

          <section className="flex justify-between">
            <Skeleton variant="rectangular" width={100} height={40} />
            <div className="flex gap-3">
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="circular" width={40} height={40} />
            </div>
          </section>

          <section>
            <h2 className="text-white font-bold text-sm mb-2">
              <Skeleton width={80} />
            </h2>
            <Skeleton variant="rectangular" width="100%" height={40} />
          </section>

          <Skeleton variant="rectangular" width="100%" height={100} />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </main>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>{recipe.title}</h1>

        <RecipeProfileHeaderButton
          recipe={recipe}
          setOpenDeleteRecipeModal={setOpenDeleteRecipeModal}
        />
      </header>

      <main className="p-5 flex flex-col gap-5 max-w-[600px] mx-auto">
        <header
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
        </header>

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

        <section>
          <h2 className="text-white font-bold text-sm mb-2">Servings</h2>
          <div className="bg-gradient-to-b from-zinc-700 to-zinc-800 text-white rounded-xl py-2 w-full flex justify-center items-center gap-2">
            <Users className="h-4 w-4 text-white" />
            {recipe.servings}
          </div>
        </section>

        <Ingredients
          measurementSystem={measurementSystem}
          setMeasurementSystem={setMeasurementSystem}
          recipe={recipe}
        />

        <Instructions recipe={recipe} />
      </main>

      <DeleteRecipeConfirmation
        deleteRecipe={deleteRecipe}
        openDeleteRecipeModal={openDeleteRecipeModal}
        setOpenDeleteRecipeModal={setOpenDeleteRecipeModal}
      />
    </div>
  );
};

export default RecipeProfile;
