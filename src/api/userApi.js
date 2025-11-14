import apiClient from './apiClient';

export const userApi = {
  getAllUsers: () => apiClient.get('/users'),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  createUser: (data) => apiClient.post('/users', data),
};
