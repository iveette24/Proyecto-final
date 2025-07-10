import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ background: 'var(--turquesa-intenso)', padding: '1rem 0' }}>
      <nav className="container">
        <Link to="/">Inicio</Link>
        <Link to="/mapa">Mapa</Link>
        <Link to="/reporte">Reporte</Link>
        <Link to="/educacion">Educación</Link>
      </nav>
    </header>
  );
}