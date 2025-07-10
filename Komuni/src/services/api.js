import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000'
});

export function sendReporte(data) {
  return API.post('/reportes', data);
}