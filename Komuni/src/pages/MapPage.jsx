import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { sendReporte, getReportes } from "../services/api";

function getIconByDificultad(nivel) {
  const color =
    nivel === "alta" ? "red" :
    nivel === "media" ? "orange" :
    nivel === "baja" ? "green" :
    "blue";

  return L.icon({
    iconUrl: `/icons/marker-${color}.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -30],
  });
}

export default function MapPage() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);        // Para mantener los markers actuales
  const [reportes, setReportes] = useState([]);

  // 1) Montaje del mapa + click listener
  useEffect(() => {
    const map = L.map("map").setView([41.1189, 1.2459], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Carga inicial de reportes
    getReportes().then(res => setReportes(res.data));

    // Al hacer click en el mapa, abrimos el formulario
    map.on("click", onMapClick);

    return () => {
      map.off("click", onMapClick);
      map.remove();
    };
  }, []);

  // 2) Efecto para pintar “reportes” y actualizar marcadores
  useEffect(() => {
    if (!mapRef.current) return;

    // 2.1 Limpia marcadores previos
    markersRef.current.forEach(m => mapRef.current.removeLayer(m));
    markersRef.current = [];

    // 2.2 Pinta los nuevos
    reportes.forEach(rep => {
      const icono = getIconByDificultad(rep.dificultad || "media");
      const marker = L.marker([rep.latitud, rep.longitud], { icon: icono })
        .addTo(mapRef.current)
        .bindPopup(`
          <strong>${rep.calle || "Ubicación sin calle"}</strong><br/>
          📝 ${rep.descripción}<br/>
          Nivel: ${rep.dificultad?.toUpperCase() || "MEDIA"}<br/>
          ${rep.informaciónExtra ? "📌 " + rep.informaciónExtra : ""}
        `);

      markersRef.current.push(marker);
    });
  }, [reportes]);

  // 3) Función callback del click
  function onMapClick(e) {
    const { lat, lng } = e.latlng;
    const popupHTML = `
      <form id="popup-form">
        <input type="text" name="calle" placeholder="Calle" required /><br/>
        <textarea name="descripción" placeholder="Descripción" required rows="2"></textarea><br/>
        <textarea name="informaciónExtra" placeholder="Información extra" rows="1"></textarea><br/>
        <select name="dificultad" required>
          <option value="">Nivel de dificultad</option>
          <option value="baja">🟢 Baja</option>
          <option value="media">🟡 Media</option>
          <option value="alta">🔴 Alta</option>
        </select><br/>
        <input type="file" name="imagen" accept="image/*" /><br/>
        <button type="submit">Reportar</button>
      </form>
    `;

    const formPopup = L.popup()
      .setLatLng([lat, lng])
      .setContent(popupHTML)
      .openOn(mapRef.current);

    setTimeout(() => {
      const form = document.getElementById("popup-form");
      form.onsubmit = async evt => {
        evt.preventDefault();

        const nuevoReporte = {
          calle: form.calle.value,
          descripción: form.descripción.value,
          informaciónExtra: form.informaciónExtra.value,
          dificultad: form.dificultad.value,
          imagen: form.imagen.files[0]?.name || null,
          latitud: lat,
          longitud: lng,
          fecha: new Date().toISOString(),
        };

        console.log("POST /reportes:", nuevoReporte);
        try {
          await sendReporte(nuevoReporte);
          setReportes(prev => [...prev, nuevoReporte]);
          formPopup.remove();  // cierra el popup
        } catch (err) {
          console.error("Error al guardar reporte:", err);
          alert("❌ No se pudo guardar el reporte.");
        }
      };
    }, 100);
  }

  return (
    <section>
      <h2>Mapa de accesibilidad</h2>
      <div id="map" style={{ height: "60vh", marginTop: "1rem" }} />
    </section>
  );
}