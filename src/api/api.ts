import axios from 'axios';

const REQUEST_TIMEOUT = 5000;
const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

