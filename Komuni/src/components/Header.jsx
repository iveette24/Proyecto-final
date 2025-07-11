import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header
      style={{
        background: 'var(--turquesa-medio)',
        color: '#fff',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Komuni</h1>

      <nav>
        <Link to="/" style={linkStyle}>Inicio</Link>
        <Link to="/mapa" style={linkStyle}>Mapa</Link>
        <Link to="/educacion" style={linkStyle}>Educación</Link>
      </nav>
    </header>
  );
}

const linkStyle = {
  marginRight: '1rem',
  color: '#fff',
  fontWeight: 'bold',
  textDecoration: 'none'
};