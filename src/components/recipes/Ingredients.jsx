const Ingredients = ({ measurementSystem, setMeasurementSystem, recipe }) => {
  const roundDecimals = (number) => {
    if (number % 1 === 0) return number;

    return number.toFixed(2);
  };

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-white font-bold text-sm mb-2">Ingredients</h2>

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
        className="grid grid-flow-row auto-rows-max gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
      >
        {recipe?.Ingredient?.map((ingredient) => (
          <div className="bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-xl p-3">
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
