import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.countapi.xyz/hit/',
});

export { api };