import { useState } from 'react';
import GenerateMealPlanButton from '@/components/buttons/GenerateMealPlanButton';
import { ChevronDown, Plus, Ellipsis } from 'lucide-react';
import { IconButton } from '@mui/material'; 

const mealPlan = () => {
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
    <div className="bg-zinc-900 text-white min-h-screen">
      <header className="flex items-center justify-between border-b border-zinc-600 bg-zinc-800 py-2 px-5">
        <h1>Meal Plan</h1>
        <GenerateMealPlanButton />
      </header>

      <main className="mx-10 my-5 flex flex-col gap-5">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="rounded-lg border-dashed border-spacing-8 border-2 border-gray-500"
          >
            <header className="bg-zinc-800 px-2 rounded-lg flex items-center justify-between">
              <h2 className="text-xs font-bold">
                {day.day} <span className="text-zinc-500"> {day.date}</span>
              </h2>

              <div className="flex items-center gap-1 relative">
                <IconButton onClick={() => toggleDropdown(index)}>
                  <Plus className="h-4 w-4 text-blue-500" />
                </IconButton>

                {dropdowns[index] && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 shadow-lg rounded-md z-50">
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

export default mealPlan;
