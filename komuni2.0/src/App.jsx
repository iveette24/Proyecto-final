import React from 'react';
import './App.css';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Komuni2.0 - Reporta incidencias accesibles</h1>
      </header>

      <section className="Hero-section">
        <h2>Haz tu ciudad más accesible</h2>
        <p>Reporta obstáculos y dificultades en la vía pública para personas con movilidad reducida.</p>
      </section>

      <section className="ReportForm-section">
        <h2>Nuevo reporte</h2>
        <ReportForm />
      </section>

      <section className="ReportList-section">
        <h2>Reportes enviados</h2>
        <ReportList />
      </section>

      <footer className="App-footer">
        <p>© 2025 Komuni2.0 - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;
