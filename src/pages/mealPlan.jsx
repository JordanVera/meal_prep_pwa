import CreateMealPlanButton from '@/components/buttons/CreateMealPlanButton';

const mealPlan = () => {
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>Meal Plan</h1>
        <CreateMealPlanButton />
      </header>
    </div>
  );
};
export default mealPlan;
