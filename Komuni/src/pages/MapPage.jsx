// src/pages/MapPage.jsx
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchReportes } from '../services/api';

export default function MapPage() {
  useEffect(() => {
    const map = L.map('map').setView([41.1189, 1.2459], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Carga y pinta marcadores
    fetchReportes().then(reports => {
      reports.forEach(r => {
        if (r.latitud && r.longitud) {
          L.marker([r.latitud, r.longitud])
            .addTo(map)
            .bindPopup(`<strong>Barrera:</strong> ${r.descripción}`);
        }
      });
    });
  }, []);

  return (
    <section>
      <h2>Mapa de accesibilidad</h2>
      <div id="map" style={{ height: '60vh', borderRadius: '8px' }} />
    </section>
  );
}