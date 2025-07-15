import React from 'react';
import ReportForm from './components/ReportForm';
import UsuariosGoogle from './UsuariosGoogle';
import './App.css';
import ReportList from './components/ReportList';

function App() {
  return (
    <div className="app">
      <h1>komuni2.0</h1>
      <UsuariosGoogle />
      <ReportForm />
      <hr />
      <ReportList />
    </div>
  );
}

export default App;
