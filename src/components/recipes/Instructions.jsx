const Instructions = ({ recipe }) => {
  return (
    <section>
      <h2 className="text-white font-bold text-sm mb-2">Instructions</h2>

      <div className="flex flex-col gap-5">
        {recipe?.Step?.sort((x, y) => x.step - y.step).map((step) => (
          <div className="flex gap-3.5 bg-zinc-700 rounded-xl p-3">
            <div>
              <p className="rounded-full bg-orange-500 bg-opacity-60 h-6 w-6 flex items-center justify-center text-xs">
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
