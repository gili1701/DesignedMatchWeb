import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/create_user', { username, email, password });
  return response.data;
};

export const getNextQuestion = async (userId: string) => {
  const response = await api.post('/next_question', { user_id: userId });
  return response.data;
};

export const submitAnswer = async (userId: string, answer: string) => {
  const response = await api.post('/submit_answer', { user_id: userId, answer });
  return response.data;
};

export default api;