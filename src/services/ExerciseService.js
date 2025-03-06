import axios from 'axios';

class ExerciseService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getExercises(page = 1, limit = 10, bodyPart = null) {
    const response = await axios.get(`${this.apiUrl}/exercise`, {
      params: {
        page,
        limit,
        bodyPart,
      },
    });

    return response.data;
  }

  async getBodyPartTypes(bodyPart = null) {
    const response = await axios.get(`${this.apiUrl}/exercise/get-types`, {
      params: { bodyPart },
    });
    return response.data;
  }

  async generateWorkoutPlan(
    height,
    weight,
    daysPerWeek,
    hasGymAccess,
    fitnessLevel
  ) {
    const response = await axios.post(`${this.apiUrl}/workout-plan`, {
      height,
      weight,
      daysPerWeek,
      hasGymAccess,
      fitnessLevel,
    });

    return response.data;
  }
}

export default new ExerciseService(process.env.NEXT_PUBLIC_BASE_URL);
