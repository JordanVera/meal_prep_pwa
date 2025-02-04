const Instructions = ({ recipe }) => {
  return (
    <section>
      <h2 className="mb-2 text-sm font-bold text-white">Instructions</h2>

      <div className="flex flex-col gap-5">
        {recipe?.Step?.sort((x, y) => x.step - y.step).map((step, i) => (
          <div
            key={`instruction-${i}`}
            className="bg-gradient-to-b from-zinc-700 to-zinc-800 flex gap-3.5 rounded-xl p-3"
          >
            <div>
              <p className="flex items-center justify-center w-6 h-6 text-xs bg-orange-500 rounded-full bg-opacity-60">
                {step.step}
              </p>
            </div>
            <p className="text-xs">{step.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Instructions;
