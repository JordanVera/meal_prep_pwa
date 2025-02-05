import axios from 'axios';

class ExerciseService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getExercises(page = 1, limit = 10) {
    const response = await axios.get(`${this.apiUrl}/exercise`, {
      params: { page, limit },
    });

    return response.data;
  }
}

export default new ExerciseService(process.env.NEXT_PUBLIC_BASE_URL);
