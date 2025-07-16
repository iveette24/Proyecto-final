import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

const UsuariosGoogle = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const login = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError('');
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setError('Error al cerrar sesión.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div style={{ margin: '1rem 0' }}>Procesando...</div>;
  }

  if (user) {
    return (
      <div className="user-info" style={{ margin: '1rem 0' }}>
        <img src={user.photoURL} alt="Perfil" width={40} style={{ borderRadius: '50%', marginRight: 8, verticalAlign: 'middle' }} />
        <span style={{ fontWeight: 600, marginRight: 12 }}>Hola, {user.displayName}</span>
        <button onClick={logout} style={{
          background: '#e57373',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.4rem 1rem',
          cursor: 'pointer'
        }}>Cerrar sesión</button>
        {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{ margin: '1rem 0' }}>
      <button onClick={login} style={{
        background: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '0.5rem 1.2rem',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer'
      }}>
        Iniciar sesión con Google
      </button>
      {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
    </div>
  );
};

export default UsuariosGoogle;
