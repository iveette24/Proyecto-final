// src/pages/ReportPage.jsx
import { useState, useEffect } from 'react';
import { sendReporte } from './services/api';

export default function ReportPage() {
  const [desc, setDesc] = useState('');
  const [coords, setCoords] = useState({ lat: '', lng: '' });
  const [msg, setMsg] = useState('');

  // Al cargar, solicita ubicación al navegador
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => {
        setMsg('No se pudo obtener tu ubicación. Introduce coordenadas manualmente.');
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await sendReporte({
        descripción: desc,
        latitud: coords.lat,
        longitud: coords.lng,
        fecha: new Date().toISOString()
      });
      setMsg('Reporte enviado correctamente');
      setDesc('');
    } catch {
      setMsg('Error al enviar el reporte');
    }
  }

  return (
    <section>
      <h2>Reportar barrera</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Descripción:
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            required
          />
        </label>
        <label>
          Latitud:
          <input
            type="number"
            value={coords.lat}
            onChange={e => setCoords(c => ({ ...c, lat: e.target.value }))}
            required
          />
        </label>
        <label>
          Longitud:
          <input
            type="number"
            value={coords.lng}
            onChange={e => setCoords(c => ({ ...c, lng: e.target.value }))}
            required
          />
        </label>
        <button type="submit" style={{
          background: 'var(--turquesa-medio)',
          color: '#fff',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Enviar reporte
        </button>
      </form>
    </section>
  );
}