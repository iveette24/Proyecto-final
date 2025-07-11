import { useState, useEffect } from 'react';
import { sendReporte } from '../services/api';

export default function ReportPage() {
  const [calle, setCalle] = useState('');
  const [desc, setDesc] = useState('');
  const [extra, setExtra] = useState('');
  const [foto, setFoto] = useState(null);
  const [coords, setCoords] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setCoords({
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude
      }),
      err => console.error('No se pudo obtener ubicación:', err)
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      calle,
      descripción: desc,
      informaciónExtra: extra,
      imagen: foto?.name || null,
      latitud: coords?.latitud || null,
      longitud: coords?.longitud || null,
      fecha: new Date().toISOString()
    };

    try {
      await sendReporte(payload);
      setMsg('✅ Reporte enviado correctamente');
      setCalle('');
      setDesc('');
      setExtra('');
      setFoto(null);
    } catch (err) {
      console.error('Error al enviar reporte', err);
      setMsg('❌ Ocurrió un error al enviar');
    }
  }

  return (
    <section style={{ padding: '1rem' }}>
      <h2>Reportar barrera urbana</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Calle"
          value={calle}
          onChange={e => setCalle(e.target.value)}
          required
        /><br />

        <textarea
          placeholder="Descripción"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
          rows={2}
        /><br />

        <textarea
          placeholder="Información extra"
          value={extra}
          onChange={e => setExtra(e.target.value)}
          rows={1}
        /><br />

        <input
          type="file"
          accept="image/*"
          onChange={e => setFoto(e.target.files[0])}
        /><br />

        <button type="submit" style={{ marginTop: '1rem' }}>Reportar</button>
      </form>
    </section>
  );
}