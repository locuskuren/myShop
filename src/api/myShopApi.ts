import axios from 'axios';

const BASE_URL = 'https://myshop-backend.herokuapp.com/api/';

export const myShopApi = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
