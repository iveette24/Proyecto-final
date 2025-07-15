import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ReportForm.css';

const ReportForm = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert('Debes iniciar sesión para enviar un reporte.');
      setLoading(false);
      return;
    }

    try {
      let imageUrl = '';
      if (image) {
        const storageRef = ref(storage, `reportes/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'reportes'), {
        description,
        location,
        imageUrl,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
        createdAt: Timestamp.now(),
      });

      alert('Reporte enviado correctamente ✅');
      setImage(null);
      setDescription('');
      setLocation('');
    } catch (err) {
      console.error('Error al guardar el reporte:', err);
      alert('Hubo un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>Reportar Incidencia</h2>

      <label>
        Foto del problema:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>

      <label>
        Descripción:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        Ubicación:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Reporte'}
      </button>
    </form>
  );
};

export default ReportForm;
