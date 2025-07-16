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
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    setLoading(true);

    if (!user) {
      setError('Debes iniciar sesión para enviar un reporte.');
      setLoading(false);
      return;
    }
    if (!description.trim() || !location.trim()) {
      setError('Todos los campos son obligatorios.');
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
        description: description.trim(),
        location: location.trim(),
        imageUrl,
        userName: user.displayName,
        userEmail: user.email,
        userPhoto: user.photoURL,
        createdAt: Timestamp.now(),
      });

      setMsg('Reporte enviado correctamente ✅');
      setImage(null);
      setDescription('');
      setLocation('');
    } catch (err) {
      setError('Hubo un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="report-form"
      onSubmit={handleSubmit}
      aria-label="Formulario de reporte"
    >
      <h2>Reportar Incidencia</h2>

      {msg && (
        <div style={{ color: 'green', marginBottom: 8 }}>{msg}</div>
      )}
      {error && (
        <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>
      )}

      <label>
        Foto del problema:
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
      </label>

      <label>
        Descripción:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={10}
          maxLength={300}
          placeholder="Describe el problema (mínimo 10 caracteres)"
        />
      </label>

      <label>
        Ubicación:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          minLength={3}
          maxLength={100}
          placeholder="Ej: Calle Mayor 123, Tarragona"
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Reporte'}
      </button>
    </form>
  );
};

export default ReportForm;
