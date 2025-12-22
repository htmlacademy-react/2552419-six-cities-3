import axios from 'axios';

const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: 'https://15.design.htmlacademy.pro/six-cities',
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

