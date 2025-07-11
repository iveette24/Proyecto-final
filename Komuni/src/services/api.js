import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000' // 🔁 Asegúrate de que este puerto sea el que usaste
});

export function sendReporte(data) {
  return API.post('/reportes', data);
}

export function getReportes() {
  return API.get('/reportes');
}
