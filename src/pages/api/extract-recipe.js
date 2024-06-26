// pages/api/extract-recipe.js
import axios from 'axios';

const SPOONACULAR_API_KEY = 'a27ed32edc854fbbab486d3a512d830c';

export default async function handler(req, res) {
  const { url } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(
        url
      )}&apiKey=${SPOONACULAR_API_KEY}`
    );

    if (response.data) {
      console.log('RESPONSE.DATA');
      console.log(response.data);

      // res.status(200).json({
      //   title: response.data.title,
      //   ingredients: response.data.extendedIngredients.map(
      //     (ingredient) => ingredient.original
      //   ),
      //   instructions: response.data.instructions,
      // });
      res.status(200).json({
        recipe: response.data,
      });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to extract recipe' });
  }
}
