import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { sendReporte, getReportes } from "../services/api";
import axios from "axios";

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

function getEmojiByDificultad(nivel) {
  if (nivel === "alta") return "🔴";
  if (nivel === "media") return "🟡";
  if (nivel === "baja") return "🟢";
  return "🔵";
}

function getIncidenciaEmoji(descripcion = "") {
  const desc = descripcion.toLowerCase();
  if (desc.includes("escalera") || desc.includes("escalón") || desc.includes("escalon")) return "🪜";
  if (desc.includes("rampa")) return "♿";
  if (desc.includes("bache") || desc.includes("agujero") || desc.includes("socavón") || desc.includes("socavon")) return "🕳️";
  if (desc.includes("acera rota") || desc.includes("acera") || desc.includes("vereda")) return "🧱";
  if (desc.includes("calle rota") || desc.includes("calle") || desc.includes("pavimento")) return "🛣️";
  if (desc.includes("obstáculo") || desc.includes("obstaculo") || desc.includes("barrera")) return "🚧";
  if (desc.includes("paso de peatones") || desc.includes("cruce")) return "🚸";
  if (desc.includes("señal") || desc.includes("señalización") || desc.includes("señalizacion")) return "🚦";
  // Puedes añadir más reglas según necesidades
  return "";
}

function generateId() {
  // Simple random id for json-server
  return Math.random().toString(16).slice(2, 6);
}

// Añadir función para obtener la calle por lat/lng usando Nominatim
async function getStreetName(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=es`
    );
    const data = await res.json();
    // Buscar el nombre de la calle en el objeto address
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

export default function MapPage() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [sidebar, setSidebar] = useState({ open: false, lat: null, lng: null, calle: "", modo: "nuevo", reporte: null });
  const [tempMarker, setTempMarker] = useState(null);

  // Centrar mapa en la ubicación del usuario
  function centerOnUser() {
    if (!mapRef.current) return;
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        mapRef.current.setView([latitude, longitude], 16, { animate: true });
        // Añadir un marcador temporal
        const marker = L.circleMarker([latitude, longitude], {
          radius: 10,
          color: "#2aa198",
          fillColor: "#2aa198",
          fillOpacity: 0.5
        }).addTo(mapRef.current);
        setTimeout(() => mapRef.current.removeLayer(marker), 3000);
      },
      () => alert("No se pudo obtener tu ubicación")
    );
  }

  // Buscar localización por nombre
  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    setSearchLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&limit=1`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        mapRef.current.setView([parseFloat(lat), parseFloat(lon)], 16, { animate: true });
      } else {
        alert("No se encontró la localización.");
      }
    } catch {
      alert("Error buscando la localización.");
    }
    setSearchLoading(false);
  }

  // Abrir sidebar para nuevo reporte
  const onMapClick = useCallback(async function (e) {
    const { lat, lng } = e.latlng;
    let calleDetectada = "";
    try {
      calleDetectada = await getStreetName(lat, lng);
    } catch {
      calleDetectada = "";
    }
    setSidebar({ open: true, lat, lng, calle: calleDetectada, modo: "nuevo", reporte: null });
  }, []);

  // Mantener marker temporal mientras el sidebar esté abierto y en modo "nuevo" o "editar"
  useEffect(() => {
    if (!mapRef.current) return;

    // Eliminar marker temporal anterior si existe
    if (tempMarker) {
      mapRef.current.removeLayer(tempMarker);
      setTempMarker(null);
    }

    // Solo mostrar marker si el sidebar está abierto y hay lat/lng
    if (sidebar.open && sidebar.lat && sidebar.lng) {
      const marker = L.marker([sidebar.lat, sidebar.lng], {
        icon: L.icon({
          iconUrl: "/icons/marker-blue.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -30],
          iconRetinaUrl: "/icons/marker-blue.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
        }),
        interactive: false
      }).addTo(mapRef.current);
      setTempMarker(marker);
    }
    // Eliminar marker cuando se cierra el sidebar
    return () => {
      if (tempMarker && mapRef.current) {
        mapRef.current.removeLayer(tempMarker);
        setTempMarker(null);
      }
    };
    // eslint-disable-next-line
  }, [sidebar.open, sidebar.lat, sidebar.lng]);

  // Abrir sidebar para editar reporte existente
  function openEditSidebar(rep) {
    setSidebar({
      open: true,
      lat: rep.latitud,
      lng: rep.longitud,
      calle: rep.calle || "",
      modo: "editar",
      reporte: rep
    });
    // Añadir marcador temporal para la ubicación seleccionada
    if (mapRef.current) {
      if (tempMarker) {
        mapRef.current.removeLayer(tempMarker);
      }
      const marker = L.marker([rep.latitud, rep.longitud], {
        icon: L.icon({
          iconUrl: "/icons/marker-blue.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -30],
          iconRetinaUrl: "/icons/marker-blue.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
        }),
        interactive: false
      }).addTo(mapRef.current);
      setTempMarker(marker);
    }
  }

  // Eliminar marcador temporal al cerrar el sidebar
  useEffect(() => {
    if (!sidebar.open && tempMarker && mapRef.current) {
      mapRef.current.removeLayer(tempMarker);
      setTempMarker(null);
    }
  }, [sidebar.open, tempMarker]);

  // Función para actualizar un reporte
  async function updateReporte(id, data) {
    await axios.patch(`http://localhost:4000/reportes/${id}`, data);
    setReportes(reps => reps.map(r => (r.id === id ? { ...r, ...data } : r)));
  }

  // Función para borrar un reporte
  async function deleteReporte(id) {
    await axios.delete(`http://localhost:4000/reportes/${id}`);
    setReportes(reps => reps.filter(r => r.id !== id));
  }

  useEffect(() => {
    const map = L.map("map", { zoomControl: true, attributionControl: true }).setView([41.1189, 1.2459], 13);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    getReportes()
      .then(res => setReportes(res.data))
      .finally(() => setLoading(false));

    map.on("click", onMapClick);

    return () => {
      map.off("click", onMapClick);
      map.remove();
    };
  }, [onMapClick]);

  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.forEach(m => mapRef.current.removeLayer(m));
    markersRef.current = [];

    reportes.forEach(rep => {
      if (!rep.latitud || !rep.longitud) return;
      const icono = getIconByDificultad(rep.dificultad || "media");
      const emoji = getEmojiByDificultad(rep.dificultad || "media");
      const incidenciaEmoji = getIncidenciaEmoji(rep.descripción || "");
      let imagenHtml = "";
      if (rep.imagen) {
        let imgSrc = rep.imagen;
        if (rep.imagen.startsWith("data:image/")) {
          imgSrc = rep.imagen;
        } else if (rep.imagen.startsWith("http")) {
          imgSrc = rep.imagen;
        } else {
          imgSrc = `/uploads/${rep.imagen}`;
        }
        imagenHtml = `<div style="margin:6px 0; text-align:center;"><img src='${imgSrc}' alt="Imagen de la incidencia" style="max-width:100%;max-height:60px;border-radius:6px;box-shadow:0 1px 4px #0002;object-fit:contain;background:#eee;display:block;margin:0 auto;" /></div>`;
      }

      const comentarios = Array.isArray(rep.comentarios) ? rep.comentarios : [];
      const popupId = `popup-${rep.id}`;
      // Popup solo muestra info y botones, no edición directa
      const popupHtml = `
        <div style="position:relative;width:auto;max-width:98vw;min-width:140px;min-height:80px;padding-bottom:8px;">
          <button id="${popupId}-close" style="position:absolute;top:2px;right:2px;background:none;border:none;font-size:1rem;cursor:pointer;color:#888;">❌</button>
          <div style="font-size:1.1rem;line-height:1.1;margin-bottom:0.15em;">
            ${emoji} ${incidenciaEmoji}
          </div>
          <strong style="font-size:0.98rem;">${rep.calle || "Ubicación sin calle"}</strong><br/>
          <span style="font-size:0.91rem;">
            📝 ${rep.descripción}<br/>
            Nivel: ${rep.dificultad?.toUpperCase() || "MEDIA"}<br/>
            ${rep.informaciónExtra ? "📌 " + rep.informaciónExtra + "<br/>" : ""}
            ${imagenHtml}
          </span>
          <hr style="margin:0.3em 0"/>
          <div id="${popupId}-comentarios" style="font-size:0.88em;">
            <strong>Comentarios:</strong>
            <ul style="padding-left:1em;margin:0;">
              ${comentarios.map(c => `<li>${c}</li>`).join("") || "<li style='color:#888'>Sin comentarios</li>"}
            </ul>
          </div>
          <form id="${popupId}-form" style="margin-top:0.2em;display:flex;gap:0.2em;">
            <input type="text" name="comentario" placeholder="Agregar comentario..." style="flex:1;padding:0.15em;border-radius:5px;border:1px solid #ccc;font-size:0.88em;" />
            <button type="submit" style="padding:0.15em 0.5em;border-radius:5px;background:#2aa198;color:#fff;border:none;cursor:pointer;">Enviar</button>
          </form>
          <div style="margin-top:0.3em;display:flex;gap:0.3em;">
            <button id="${popupId}-edit" style="padding:0.15em 0.5em;border-radius:5px;background:#ffb300;color:#fff;border:none;cursor:pointer;">Editar</button>
            <button id="${popupId}-delete" style="padding:0.15em 0.5em;border-radius:5px;background:#e53935;color:#fff;border:none;cursor:pointer;">Borrar</button>
          </div>
        </div>
      `;

      const marker = L.marker([rep.latitud, rep.longitud], { icon: icono })
        .addTo(mapRef.current)
        .bindPopup(popupHtml, { maxWidth: 400, minWidth: 140, closeButton: false });

      marker.on("popupopen", () => {
        // Cerrar popup con la equis
        const closeBtn = document.getElementById(`${popupId}-close`);
        if (closeBtn) {
          closeBtn.onclick = () => {
            mapRef.current.closePopup();
          };
        }
        // Editar: abre el sidebar de edición
        const editBtn = document.getElementById(`${popupId}-edit`);
        if (editBtn) {
          editBtn.onclick = () => {
            mapRef.current.closePopup();
            openEditSidebar(rep);
          };
        }
        // Comentar
        const form = document.getElementById(`${popupId}-form`);
        if (form) {
          form.onsubmit = async evt => {
            evt.preventDefault();
            const input = form.comentario;
            const comentario = input.value.trim();
            if (!comentario) return;
            const nuevosComentarios = [...comentarios, comentario];
            await updateReporte(rep.id, { comentarios: nuevosComentarios });
            input.value = "";
          };
        }
        // Borrar
        const delBtn = document.getElementById(`${popupId}-delete`);
        if (delBtn) {
          delBtn.onclick = async () => {
            if (window.confirm("¿Seguro que quieres borrar este reporte?")) {
              await deleteReporte(rep.id);
              mapRef.current.closePopup();
            }
          };
        }
      });

      markersRef.current.push(marker);
    });
  }, [reportes]);

  // Sidebar: formulario de reporte o edición
  function ReportSidebar() {
    const editando = sidebar.modo === "editar";
    const rep = sidebar.reporte;
    const [tipo, setTipo] = useState(editando ? rep.tipo || "escalera" : "escalera");
    const [dificultad, setDificultad] = useState(editando ? rep.dificultad || "media" : "media");
    const [desc, setDesc] = useState(editando ? rep.descripción || "" : "");
    const [foto, setFoto] = useState(null);
    const [sending, setSending] = useState(false);

    async function handleSubmit(e) {
      e.preventDefault();
      setSending(true);
      let imagenBase64 = editando ? rep.imagen : null;
      if (foto) {
        imagenBase64 = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target.result);
          reader.readAsDataURL(foto);
        });
      }
      if (editando) {
        await updateReporte(rep.id, {
          tipo,
          dificultad,
          descripción: desc.trim() || `Incidencia de tipo ${tipo}`,
          imagen: imagenBase64,
          calle: sidebar.calle
        });
      } else {
        const nuevoReporte = {
          id: generateId(),
          calle: sidebar.calle,
          descripción: desc.trim() || `Incidencia de tipo ${tipo}`,
          informaciónExtra: "",
          tipo,
          dificultad,
          imagen: imagenBase64,
          latitud: sidebar.lat,
          longitud: sidebar.lng,
          fecha: new Date().toISOString(),
        };
        try {
          await sendReporte(nuevoReporte);
          setReportes(prev => [...prev, nuevoReporte]);
        } catch {
          alert("❌ No se pudo guardar el reporte.");
        }
      }
      setSidebar({ open: false, lat: null, lng: null, calle: "", modo: "nuevo", reporte: null });
      setSending(false);
    }

    return (
      <aside
        style={{
          position: "fixed",
          top: 90,
          right: 0,
          width: 320,
          maxWidth: "98vw",
          background: "#fff",
          boxShadow: "0 2px 16px #0002",
          borderLeft: "2px solid #2aa198",
          zIndex: 2000,
          padding: "2rem 1.5rem 1.5rem 1.5rem",
          borderRadius: "12px 0 0 12px",
          minHeight: 320,
          transition: "transform 0.2s",
        }}
      >
        <button
          onClick={() => setSidebar({ open: false, lat: null, lng: null, calle: "", modo: "nuevo", reporte: null })}
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            background: "none",
            border: "none",
            fontSize: 22,
            color: "#888",
            cursor: "pointer"
          }}
          aria-label="Cerrar formulario"
        >✖️</button>
        <h3 style={{ marginTop: 0, color: "#2aa198" }}>{editando ? "Editar reporte" : "Nuevo reporte"}</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>
            Tipo de barrera:
            <select value={tipo} onChange={e => setTipo(e.target.value)} required>
              <option value="escalera">🪜 Escalera</option>
              <option value="rampa">♿ Rampa</option>
              <option value="bache">🕳️ Bache</option>
              <option value="acera">🧱 Acera rota</option>
              <option value="calle">🛣️ Calle rota</option>
              <option value="obstaculo">🚧 Obstáculo</option>
              <option value="cruce">🚸 Paso de peatones</option>
              <option value="señal">🚦 Señalización</option>
            </select>
          </label>
          <label>
            Nivel:
            <select value={dificultad} onChange={e => setDificultad(e.target.value)} required>
              <option value="baja">🟢 Baja</option>
              <option value="media">🟡 Media</option>
              <option value="alta">🔴 Alta</option>
            </select>
          </label>
          <label>
            Descripción:
            <input
              type="text"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="¿Qué ocurre?"
              required
            />
          </label>
          <label>
            Calle detectada:
            <input type="text" value={sidebar.calle || ""} readOnly />
          </label>
          <label>
            Imagen (opcional):
            <input type="file" accept="image/*" onChange={e => setFoto(e.target.files[0])} />
          </label>
          <button type="submit" disabled={sending} style={{ marginTop: 10 }}>
            {sending ? (editando ? "Guardando..." : "Enviando...") : (editando ? "Guardar cambios" : "Reportar")}
          </button>
        </form>
      </aside>
    );
  }

  return (
    <section>
      <h2>Mapa de accesibilidad</h2>
      <div
        className="card"
        style={{
          marginBottom: 18,
          background: "#fafdff",
          border: "1.5px solid #e0e0e0",
          fontSize: "1.04rem",
          lineHeight: 1.7,
          color: "#20706e"
        }}
      >
        <strong>Guía de usuario:</strong>
        <ul style={{ margin: "0.7em 0 0 1.2em", padding: 0 }}>
          <li>🔍 Usa el buscador para localizar una dirección o ciudad.</li>
          <li>📍 Pulsa "Mi ubicación" para centrar el mapa donde estás.</li>
          <li>🖱️ Haz clic en el mapa para añadir un nuevo reporte de barrera urbana.</li>
          <li>📝 Haz clic en un marcador para ver detalles, comentar, editar o borrar el reporte.</li>
          <li>❌ Pulsa la equis en el popup para cerrarlo.</li>
        </ul>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 6 }}>
          <input
            type="text"
            placeholder="Buscar dirección o ciudad..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "0.5em 0.8em",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: "1rem",
              minWidth: 180
            }}
            aria-label="Buscar localización"
          />
          <button type="submit" disabled={searchLoading} style={{ padding: "0.5em 1em", borderRadius: 8 }}>
            {searchLoading ? "Buscando..." : "Buscar"}
          </button>
        </form>
        <button
          type="button"
          onClick={centerOnUser}
          style={{
            padding: "0.5em 1em",
            borderRadius: 8,
            background: "#2aa198",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          📍 Mi ubicación
        </button>
      </div>
      {loading && <p style={{ color: '#888' }}>Cargando reportes...</p>}
      <div style={{ position: "relative" }}>
        <div id="map" style={{ height: "60vh", borderRadius: 10, overflow: "hidden" }} aria-label="Mapa de reportes" />
        {sidebar.open && <ReportSidebar />}
      </div>
    </section>
  );
}