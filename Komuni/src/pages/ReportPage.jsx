import { useState, useEffect } from 'react';
import { sendReporte } from '../services/api';

export default function ReportPage() {
  const [calle, setCalle] = useState('');
  const [desc, setDesc] = useState('');
  const [extra, setExtra] = useState('');
  const [foto, setFoto] = useState(null);
  const [msg, setMsg] = useState('');
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setCoords({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude
        });
      },
      error => {
        console.error('Error de geolocalización', error);
        setCoords(null);
      }
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
      setMsg('✅ Reporte enviado');
      setCalle('');
      setDesc('');
      setExtra('');
      setFoto(null);
    } catch (err) {
      console.error(err);
      setMsg('❌ Error al enviar');
    }
  }

  return (
    <section>
      <h2>Reportar barrera</h2>
      {msg && <p style={{ marginBottom: '1rem' }}>{msg}</p>}
      <form onSubmit={handleSubmit}>
        {/* campos similares al popup */}
      </form>
    </section>
  );
}
