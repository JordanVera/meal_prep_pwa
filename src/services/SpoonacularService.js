import axios from 'axios';

class SpoonacularService {
  constructor(apiUrl, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async generateMealPlan({ calorieTarget, diet, timeFrame }) {
    try {
      const response = await axios.get(`${this.apiUrl}/mealplanner/generate`, {
        params: {
          apiKey: this.apiKey,
          calorieTarget,
          diet,
          timeFrame,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new SpoonacularService(
  'https://api.spoonacular.com',
  process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
);
