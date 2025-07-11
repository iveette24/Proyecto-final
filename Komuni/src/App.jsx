import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import EduPage from './pages/EduPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/educacion" element={<EduPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;