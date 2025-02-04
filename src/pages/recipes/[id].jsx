import { useState, useEffect } from 'react';
import RecipeProfileHeaderButton from '@/components/buttons/RecipeProfileHeaderButton';
import { useUser } from '@/providers/UserContext';
import UserService from '@/services/UserService';
import { useRouter } from 'next/router';
import { Link, Play, Send, Users } from 'lucide-react';
import Ingredients from '@/components/recipes/Ingredients';
import Instructions from '@/components/recipes/Instructions';
import DeleteRecipeConfirmation from '@/components/modals/DeleteRecipeConfirmation';
import { Skeleton } from '@mui/material';

const RecipeProfile = ({ initialRecipe }) => {
  const { user, fetchCurrentlyLoggedInUser } = useUser();
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState(initialRecipe || {});
  const [loading, setLoading] = useState(false);
  const [measurementSystem, setMeasurementSystem] = useState('us');
  const [openDeleteRecipeModal, setOpenDeleteRecipeModal] = useState(false);

  useEffect(() => {
    console.log('openDeleteRecipeModal: ');
    console.log(openDeleteRecipeModal);
  }, [user]);

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
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
        <header className="flex items-center justify-between px-5 border-b border-zinc-600 bg-zinc-800">
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
            <h2 className="mb-2 text-sm font-bold text-white">
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
      <header className="flex items-center justify-between px-5 py-2 border-b border-zinc-600 bg-zinc-800">
        <h1>{recipe.title}</h1>

        <RecipeProfileHeaderButton
          recipe={recipe}
          setOpenDeleteRecipeModal={setOpenDeleteRecipeModal}
        />
      </header>

      <main className="p-5 flex flex-col gap-5 max-w-[600px] mx-auto">
        <section
          className="flex-auto rounded-lg  h-[180px] relative"
          style={{
            backgroundImage: `url(${recipe?.image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <h2 className="absolute flex items-center justify-center text-lg font-bold text-white top-2 left-2">
            {recipe.title}
          </h2>
          <a
            href={recipe.sourceUrl}
            className="absolute flex items-center justify-center px-3 py-1 text-sm font-bold text-white bg-black bg-opacity-50 rounded-full bottom-2 left-2"
            target="_blank"
            rel="noreferrer noopener"
          >
            {recipe.sourceName}
          </a>
        </section>

        <section className="flex justify-between">
          <button className="flex items-center justify-center gap-2 px-3 py-1 text-green-500 bg-green-500 bg-opacity-50 rounded-full">
            <Play className="w-5 h-5 text-green-500" />
            Start
          </button>

          <div className="flex gap-3">
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center p-3 bg-blue-500 bg-opacity-50 rounded-full"
            >
              <Link className="w-5 h-5 text-blue-500" />
            </a>
            <button className="flex items-center justify-center p-3 bg-purple-500 bg-opacity-50 rounded-full">
              <Send className="w-5 h-5 text-purple-500" />
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm font-bold text-white">Servings</h2>
          <div className="flex items-center justify-center w-full gap-2 py-2 text-white bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-xl">
            <Users className="w-4 h-4 text-white" />
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

export async function getServerSideProps({ params }) {
  try {
    const response = await UserService.getRecipeById(params.id);

    return {
      props: {
        initialRecipe: response.recipe || null,
      },
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return {
      props: {
        initialRecipe: null,
      },
    };
  }
}
