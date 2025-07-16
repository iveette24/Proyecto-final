import { useState, useEffect } from 'react';
import { sendReporte } from '../services/api';

function generateId() {
  return Math.random().toString(16).slice(2, 6);
}

export default function ReportPage() {
  const [calle, setCalle] = useState('');
  const [desc, setDesc] = useState('');
  const [extra, setExtra] = useState('');
  const [foto, setFoto] = useState(null);
  const [coords, setCoords] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Añadir función para obtener la calle por lat/lng usando Nominatim
  async function getStreetName(lat, lng) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=es`
      );
      const data = await res.json();
      return (
        data.address?.road ||
        data.address?.pedestrian ||
        data.address?.footway ||
        data.address?.path ||
        data.address?.cycleway ||
        data.address?.neighbourhood ||
        data.address?.suburb ||
        ""
      );
    } catch {
      return "";
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const latitud = pos.coords.latitude;
        const longitud = pos.coords.longitude;
        setCoords({ latitud, longitud });
        // Autocompletar calle usando reverse geocoding
        const nombreCalle = await getStreetName(latitud, longitud);
        if (nombreCalle) setCalle(nombreCalle);
      },
      err => setMsg('⚠️ No se pudo obtener ubicación automáticamente')
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    if (!calle.trim() || !desc.trim()) {
      setMsg('❌ Todos los campos obligatorios deben estar completos.');
      setLoading(false);
      return;
    }

    let imagenBase64 = null;
    if (foto) {
      imagenBase64 = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(foto);
      });
    }

    const payload = {
      id: generateId(),
      calle: calle.trim(),
      descripción: desc.trim(),
      informaciónExtra: extra.trim(),
      imagen: imagenBase64, // Guardar base64 en vez de solo el nombre
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
      setMsg('❌ Ocurrió un error al enviar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Reportar barrera urbana</h2>
      {msg && <p aria-live="polite" style={{ color: msg.startsWith('✅') ? 'green' : 'crimson', marginTop: 8 }}>{msg}</p>}
      <form onSubmit={handleSubmit} aria-label="Formulario de reporte">
        <label>
          Calle*:
          <input
            type="text"
            placeholder="Calle"
            value={calle}
            onChange={e => setCalle(e.target.value)}
            required
            aria-required="true"
          />
        </label>

        <label>
          Descripción*:
          <textarea
            placeholder="Descripción"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            required
            rows={2}
            aria-required="true"
          />
        </label>

        <label>
          Información extra:
          <textarea
            placeholder="Información extra"
            value={extra}
            onChange={e => setExtra(e.target.value)}
            rows={1}
          />
        </label>

        <label>
          Imagen:
          <input
            type="file"
            accept="image/*"
            onChange={e => setFoto(e.target.files[0])}
          />
        </label>

        <button type="submit" style={{ marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Enviando...' : 'Reportar'}
        </button>
      </form>
    </section>
  );
}