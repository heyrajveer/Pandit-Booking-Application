import API from './axios';

// Send chat message and get AI response
export const sendMessage = async (message) => {
  try {
    const response = await API.post('/chat', { message });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to send message' };
  }
};
