import { useState } from 'react';
import GenerateMealPlanButton from '@/components/buttons/GenerateMealPlanButton';
import { Plus } from 'lucide-react';
import { IconButton } from '@mui/material';

const MealPlan = () => {
  const getDaysOfWeek = () => {
    const daysOfWeek = [];
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };

    // Adjust to start from Monday
    const dayOfWeek = currentDate.getDay();
    const daysToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    currentDate.setDate(currentDate.getDate() + daysToMonday);

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push({
        day: currentDate.toLocaleDateString('en-US', { weekday: 'long' }),
        date: currentDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        }),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysOfWeek;
  };

  const daysOfWeek = getDaysOfWeek();

  const [dropdowns, setDropdowns] = useState(
    Array(daysOfWeek.length).fill(false)
  );

  const toggleDropdown = (index) => {
    setDropdowns((prev) => {
      const newDropdowns = [...prev];
      newDropdowns[index] = !newDropdowns[index];
      return newDropdowns;
    });
  };

  return (
    <div className="min-h-screen text-white bg-zinc-900">
      <header className="flex items-center justify-between px-5 py-2 border-b border-zinc-600 bg-zinc-800">
        <h1>Meal Plan</h1>
        <GenerateMealPlanButton />
      </header>

      <main className="flex flex-col gap-5 mx-10 my-5">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="border-2 border-gray-500 border-dashed rounded-lg border-spacing-8"
          >
            <header className="flex items-center justify-between px-2 rounded-lg bg-zinc-800">
              <h2 className="text-xs font-bold">
                {day.day} <span className="text-zinc-500"> {day.date}</span>
              </h2>

              <div className="relative flex items-center gap-1">
                <IconButton onClick={() => toggleDropdown(index)}>
                  <Plus className="w-4 h-4 text-blue-500" />
                </IconButton>

                {dropdowns[index] && (
                  <div className="absolute right-0 z-50 w-48 mt-2 border rounded-md shadow-lg bg-zinc-900 border-zinc-800">
                    {/* Dropdown content here */}
                    <p className="p-2">Dropdown content for {day.day}</p>
                  </div>
                )}
              </div>
            </header>
            <p className="text-sm">no recipes...</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MealPlan;
