import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './ReportList.css';

function formatDate(ts) {
  if (!ts) return '';
  try {
    const date = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000);
    return date.toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' });
  } catch {
    return '';
  }
}

const ReportList = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarReportes = async () => {
      try {
        const q = query(collection(db, 'reportes'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReportes(datos);
      } catch (err) {
        setReportes([]);
      } finally {
        setLoading(false);
      }
    };

    cargarReportes();
  }, []);

  if (loading) return <p style={{ color: '#888' }}>Cargando reportes...</p>;

  if (reportes.length === 0) return <p>No hay reportes aún.</p>;

  return (
    <div className="report-list">
      <h2>Incidencias Reportadas</h2>
      {reportes.map(reporte => (
        <div key={reporte.id} className="reporte-card">
          {reporte.imageUrl && <img src={reporte.imageUrl} alt="Reporte" />}
          <p><strong>Ubicación:</strong> {reporte.location}</p>
          <p><strong>Descripción:</strong> {reporte.description}</p>
          <p><strong>Reportado por:</strong> {reporte.userName || 'Anónimo'}</p>
          {reporte.userEmail && <p className="email">{reporte.userEmail}</p>}
          {reporte.createdAt && (
            <p className="fecha">
              <span role="img" aria-label="fecha">🕒</span> {formatDate(reporte.createdAt)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportList;
