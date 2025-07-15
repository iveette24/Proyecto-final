import React, { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

const UsuariosGoogle = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  if (user) {
    return (
      <div className="user-info">
        <p>Hola, {user.displayName}</p>
        <img src={user.photoURL} alt="Perfil" width={40} style={{ borderRadius: '50%' }} />
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    );
  }

  return <button onClick={login}>Iniciar sesión con Google</button>;
};

export default UsuariosGoogle;
