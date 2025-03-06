const Ingredients = ({ measurementSystem, setMeasurementSystem, recipe }) => {
  const roundDecimals = (number) => {
    if (number % 1 === 0) return number;

    return number.toFixed(2);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-sm font-bold text-white">Ingredients</h2>

        <div className="flex gap-0">
          <button
            onClick={() => setMeasurementSystem('us')}
            className={`px-2 py-1 rounded-md text-xs transition-colors ease-in-out duration-300 ${
              measurementSystem === 'us' ? 'bg-orange-500 bg-opacity-50' : ''
            }`}
          >
            us
          </button>

          <button
            onClick={() => setMeasurementSystem('metric')}
            className={`px-2 py-1 rounded-md text-xs transition-colors ease-in-out duration-300 ${
              measurementSystem === 'metric'
                ? 'bg-orange-500 bg-opacity-50'
                : ''
            }`}
          >
            metric
          </button>
        </div>
      </div>

      <div
        className="grid grid-flow-row gap-3 auto-rows-max"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
      >
        {recipe?.Ingredient?.map((ingredient, i) => (
          <div
            key={`ingredient-${i}`}
            className="p-3 border shadow bg-zinc-800 border-zinc-700 rounded-xl"
          >
            <p className="text-xs">
              <span>
                {measurementSystem === 'us'
                  ? `${roundDecimals(ingredient.amount_us)}${
                      ingredient.unitShort_us
                    }`
                  : `${roundDecimals(ingredient.amount_metric)}${
                      ingredient.unitShort_metric
                    }`}
              </span>{' '}
              {ingredient.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Ingredients;
