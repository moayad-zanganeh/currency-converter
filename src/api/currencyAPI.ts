import axios from 'axios';

const API_KEY = 'freeTuDJRYEsh3h3cRgC8RbNs7TPE2Q5';
const BASE_URL = 'http://api.navasan.tech/latest';

export const getLatestExchangeRate = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/?api_key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
};
