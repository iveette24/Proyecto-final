import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        width: '100%',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        justifyContent: 'space-between',
        minHeight: 'var(--header-height)'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#fff', fontWeight: 700 }}>
          <img src="/icons/logo-solo.png" alt="Komuni logo" style={{ width: 40, height: 40, marginRight: 12 }} />
          <span style={{ fontSize: '2rem', letterSpacing: '1px', fontWeight: 800 }}>Komuni</span>
        </Link>
        <span style={{
          color: '#e0f7fa',
          fontWeight: 400,
          fontSize: '1.1rem',
          letterSpacing: '0.04em',
          marginRight: 24,
          fontStyle: 'italic'
        }}>
          Accesibilidad urbana global
        </span>
        <nav>
          <NavLink to="/" label="Inicio" active={pathname === "/"} />
          <NavLink to="/mapa" label="Mapa" active={pathname === "/mapa"} />
          <NavLink to="/educacion" label="Educación" active={pathname === "/educacion"} />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, label, active }) {
  return (
    <Link
      to={to}
      style={{
        marginRight: 18,
        color: '#fff',
        fontWeight: active ? 'bold' : 'normal',
        textDecoration: active ? 'underline' : 'none',
        fontSize: '1.08rem',
        letterSpacing: '0.5px'
      }}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}