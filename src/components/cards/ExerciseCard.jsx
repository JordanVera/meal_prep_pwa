import { BicepsFlexed, Target, Cog } from 'lucide-react';

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="overflow-hidden transition-shadow duration-200 border rounded-lg shadow-md border-zinc-600 bg-zinc-800 hover:shadow-orange-900/50 hover:shadow-lg">
      <div className="flex justify-center bg-zinc-700">
        <img
          src={exercise.gifUrl}
          alt={`${exercise.name} demonstration`}
          className="object-cover w-auto h-auto rounded"
        />
      </div>

      {exercise.instructions && (
        <div className="p-4 border-t border-zinc-700">
          <h2 className="mb-2 text-xl font-semibold text-white">
            {exercise.name}
          </h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-purple-500/30 w-fit">
              <Target className="w-4 h-4 text-purple-500" />
              <p className="text-xs text-purple-500">{exercise.target}</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/30 w-fit">
              <BicepsFlexed className="w-4 h-4 text-orange-500" />
              <p className="text-xs text-orange-500">{exercise.bodyPart}</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/30 w-fit">
              <Cog className="w-4 h-4 text-green-500" />
              <p className="text-xs text-green-500">{exercise.equipment}</p>
            </div>
          </div>

          <ol className="space-y-2 text-sm list-decimal list-inside text-zinc-300">
            {exercise.instructions.map((instruction, idx) => (
              <li key={idx} className="text-xs">
                {instruction.content}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
