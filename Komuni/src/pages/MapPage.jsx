import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { sendReporte, getReportes } from '../services/api';

// Icono personalizado
const customIcon = L.icon({
  iconUrl: '/icons/barrier-icon.png', // Imagen ubicada en public/icons/
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30]
});

export default function MapPage() {
  const mapRef = useRef(null);
  const [reportes, setReportes] = useState([]);

  // Crear el mapa una sola vez
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([41.1189, 1.2459], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    getReportes().then(res => setReportes(res.data));
  }, []);

  // Pintar marcadores existentes
  useEffect(() => {
    if (!mapRef.current) return;

    reportes.forEach(reporte => {
      if (reporte.latitud && reporte.longitud) {
        L.marker([reporte.latitud, reporte.longitud], { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup(`
            <strong>${reporte.calle || 'Ubicación sin calle'}</strong><br/>
            📝 ${reporte.descripción}<br/>
            ${reporte.informaciónExtra ? '📌 ' + reporte.informaciónExtra : ''}
          `);
      }
    });
  }, [reportes]);

  // Escuchar clics en el mapa para crear nuevos reportes
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.on('click', e => {
      const { lat, lng } = e.latlng;

      const formHtml = `
        <form id="popup-form">
          <input type="text" name="calle" placeholder="Calle" required /><br/>
          <textarea name="descripción" placeholder="Descripción" required rows="2"></textarea><br/>
          <textarea name="informaciónExtra" placeholder="Información extra" rows="1"></textarea><br/>
          <input type="file" name="imagen" accept="image/*" /><br/>
          <button type="submit">Reportar</button>
        </form>
      `;

      const formPopup = L.popup()
        .setLatLng([lat, lng])
        .setContent(formHtml)
        .openOn(mapRef.current);

      setTimeout(() => {
        const form = document.getElementById('popup-form');
        if (form) {
          form.onsubmit = async evt => {
            evt.preventDefault();
            const calle = form.calle.value;
            const descripción = form.descripción.value;
            const informaciónExtra = form.informaciónExtra.value;
            const imagenFile = form.imagen.files[0];
            const imagenNombre = imagenFile ? imagenFile.name : null;

            const nuevoReporte = {
              calle,
              descripción,
              informaciónExtra,
              imagen: imagenNombre,
              latitud: lat,
              longitud: lng,
              fecha: new Date().toISOString()
            };

            await sendReporte(nuevoReporte);

            L.marker([lat, lng], { icon: customIcon })
              .addTo(mapRef.current)
              .bindPopup(`
                <strong>${calle}</strong><br/>
                📝 ${descripción}<br/>
                ${informaciónExtra ? '📌 ' + informaciónExtra : ''}
              `)
              .openPopup();

            mapRef.current.closePopup();
          };
        }
      }, 100);
    });
  }, []);

  return (
    <section>
      <h2>Mapa de accesibilidad</h2>
      <div
        id="map"
        style={{ height: '60vh', borderRadius: '8px', marginTop: '1rem' }}
      />
    </section>
  );
}
