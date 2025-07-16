import React from 'react';
import ReportForm from './components/ReportForm';
import UsuariosGoogle from './UsuariosGoogle';
import './App.css';
import ReportList from './components/ReportList';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src="/vite.svg" alt="Komuni logo" className="logo" />
        <h1>Komuni 2.0</h1>
      </header>
      <UsuariosGoogle />
      <main>
        <ReportForm />
        <hr style={{ margin: '2rem 0' }} />
        <ReportList />
      </main>
      <footer className="app-footer">
        <small>
          &copy; {new Date().getFullYear()} Komuni. Plataforma colaborativa de
          accesibilidad.
        </small>
      </footer>
    </div>
  );
}

export default App;
