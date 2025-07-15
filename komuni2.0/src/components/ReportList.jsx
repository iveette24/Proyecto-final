import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './ReportList.css';

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
        console.error('Error al cargar reportes:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarReportes();
  }, []);

  if (loading) return <p>Cargando reportes...</p>;

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
          <p className="email">{reporte.userEmail}</p>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
