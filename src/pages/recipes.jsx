import AddRecipeButton from '@/components/buttons/AddRecipeButton';

const recipes = () => {
  return (
    <div>
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>Recipes</h1>

        <AddRecipeButton />
      </header>
      <main className="m-5">
        <div
          className="rounded-lg max-w-[200px] h-[100px] relative"
          style={{
            backgroundImage: "url('/photos/cookies.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <h2 className="absolute top-1 left-1 flex items-center justify-center text-white text-sm font-bold">
            Chocolate Chip Cookies
          </h2>
        </div>
      </main>
    </div>
  );
};
export default recipes;
