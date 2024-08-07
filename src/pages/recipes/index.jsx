import { useEffect } from 'react';
import AddRecipeButton from '@/components/buttons/AddRecipeButton';
import { useUser } from '@/providers/UserContext';
import Link from 'next/link';
import { Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const recipes = () => {
  const { user, isLoadingUser, handleOpenAddRecipeModal } = useUser();

  useEffect(() => {
    console.log('USER');
    console.log(user);
  }, [user]);

  if (isLoadingUser) {
    return (
      <div className="m-5 flex flex-wrap gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={200}
            height={100}
          />
        ))}
      </div>
    );
  }

  if (user?.recipes?.length < 1) {
    return (
      <div>
        <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
          <h1>Recipes</h1>
          <AddRecipeButton />
        </header>
        <div className="m-5">
          <button
            onClick={handleOpenAddRecipeModal}
            className="bg-zinc-700 flex-auto rounded-lg w-[200px] h-[100px] relative"
          >
            <AddIcon />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>Recipes</h1>
        <AddRecipeButton />
      </header>
      <main className="m-5 flex flex-wrap gap-5">
        {user?.recipes?.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="flex-auto rounded-lg max-w-[200px] min-w-[150px] h-[100px] relative"
            style={{
              backgroundImage: `url('${recipe.image}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <h2 className="absolute top-1 left-1 flex items-center justify-center text-white text-sm font-bold">
              {recipe.title}
            </h2>
          </Link>
        ))}

        <button
          onClick={handleOpenAddRecipeModal}
          className="bg-zinc-700 flex-auto rounded-lg max-w-[200px] min-w-[150px] h-[100px] relative"
        >
          <AddIcon />
        </button>
      </main>
    </div>
  );
};
export default recipes;
