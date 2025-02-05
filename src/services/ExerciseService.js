import axios from 'axios';

class ExerciseService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getExercises() {
    const response = await axios.get(`${this.apiUrl}/exercise`);

    return response.data;
  }
}

export default new ExerciseService(process.env.NEXT_PUBLIC_BASE_URL);
