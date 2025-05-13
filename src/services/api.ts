import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication
export const createUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/create_user', { username, email, password });
  return response.data;
};

// Interview Questions
export const getNextQuestion = async (userId: string) => {
  const response = await api.post('/next_question', { user_id: userId });
  return response.data;
};

export const submitAnswer = async (userId: string, answer: string) => {
  const response = await api.post('/submit_answer', { user_id: userId, answer });
  return response.data;
};

// Candidates Management
export const fetchCandidates = async () => {
  const response = await api.get('/candidates');
  return response.data;
};

export const updateCandidateStatus = async (candidateId: string, approved: boolean) => {
  const response = await api.patch(`/candidates/${candidateId}/status`, { approved });
  return response.data;
};

export const deleteCandidate = async (candidateId: string) => {
  const response = await api.delete(`/candidates/${candidateId}`);
  return response.data;
};

export const getCandidateDetails = async (candidateId: string) => {
  const response = await api.get(`/candidates/${candidateId}`);
  return response.data;
};

// Add authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized (e.g., redirect to login)
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;