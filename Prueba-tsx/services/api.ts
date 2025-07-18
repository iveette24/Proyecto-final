import axios, { AxiosResponse } from 'axios';

// Definición de la interfaz para el payload de un nuevo reporte
// `id` es opcional aquí si lo generas en el frontend o backend
interface ReportPayload {
  id?: string; // Opcional si se genera en el backend
  calle: string;
  descripción: string;
  informaciónExtra?: string;
  imagen?: string | null;
  latitud: number | null;
  longitud: number | null;
  fecha: string;
  tipo?: 'escalera' | 'rampa' | 'bache' | 'acera' | 'calle' | 'obstaculo' | 'cruce' | 'señal';
  dificultad?: 'baja' | 'media' | 'alta';
  comentarios?: string[];
}

// Definición de la interfaz para un reporte existente (con todos los campos esperados del backend)
interface Reporte extends ReportPayload {
  id: string; // El ID es obligatorio para un reporte existente
  // Puedes añadir otros campos si tu backend los devuelve (ej: createdAt, updatedAt)
}

const API = axios.create({
  baseURL: 'http://localhost:4000' // 🔁 Asegúrate de que este puerto sea el que usaste
});

/**
 * Envía un nuevo reporte a la API.
 * @param data Los datos del reporte a enviar.
 * @returns Una promesa con la respuesta de Axios.
 */
export function sendReporte(data: ReportPayload): Promise<AxiosResponse<Reporte>> {
  return API.post<Reporte>('/reportes', data);
}

/**
 * Obtiene todos los reportes de la API.
 * @returns Una promesa con la respuesta de Axios que contiene un array de reportes.
 */
export function getReportes(): Promise<AxiosResponse<Reporte[]>> {
  return API.get<Reporte[]>('/reportes');
}

/**
 * Actualiza un reporte existente en la API.
 * @param id El ID del reporte a actualizar.
 * @param data Los datos parciales del reporte a actualizar.
 * @returns Una promesa con la respuesta de Axios.
 */
export function updateReporte(id: string, data: Partial<Reporte>): Promise<AxiosResponse<Reporte>> {
  return API.patch<Reporte>(`/reportes/${id}`, data);
}

/**
 * Elimina un reporte de la API.
 * @param id El ID del reporte a eliminar.
 * @returns Una promesa con la respuesta de Axios.
 */
export function deleteReporte(id: string): Promise<AxiosResponse<void>> {
  return API.delete<void>(`/reportes/${id}`);
}
