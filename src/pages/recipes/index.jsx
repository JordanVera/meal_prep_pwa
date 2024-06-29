import { useState, useEffect } from 'react';
import AddRecipeButton from '@/components/buttons/AddRecipeButton';
import { useUser } from '@/providers/UserContext';
import Link from 'next/link';

const recipes = () => {
  const { user } = useUser();

  useEffect(() => {
    console.log('USER');
    console.log(user);
  }, [user]);

  return (
    <div>
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>Recipes</h1>
        <AddRecipeButton />
      </header>
      <main className="m-5 flex flex-wrap gap-5">
        <div
          className="flex-auto rounded-lg max-w-[200px] min-w-[150px] h-[100px] relative"
          style={{
            backgroundImage: "url('/photos/cookies.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <h2 className="absolute top-1 left-1 flex items-center justify-center text-white text-sm font-bold">
            Chocolate Chip Cookies
          </h2>
        </div>

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
      </main>
    </div>
  );
};
export default recipes;
