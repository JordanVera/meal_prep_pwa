import axios from 'axios';

class ExerciseService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getExercises(params = { limit: 100, offset: 0 }) {
    const response = await axios.get(`${this.apiUrl}/exercises`, {
      params,
    });

    return response.data;
  }

  async getBodyParts() {
    const response = await axios.get(`${this.apiUrl}/bodyparts`, {});

    return response.data;
  }
}

export default new ExerciseService(process.env.NEXT_PUBLIC_EXERCISE_URL);
