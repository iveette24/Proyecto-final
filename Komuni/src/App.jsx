// json-server --watch db.json --port 4000

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import EduPage from './pages/EduPage';

function NotFound() {
  return (
    <section>
      <h2>Página no encontrada</h2>
      <p>La ruta solicitada no existe.</p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/educacion" element={<EduPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;