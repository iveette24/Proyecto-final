import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        background: "var(--turquesa-medio)",
        color: "white",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>Komuni</h1>
      
      <nav>
        <Link to="/" style={{ marginRight: "1rem", color: "white" }}>
          Inicio
        </Link>
        <Link to="/mapa" style={{ marginRight: "1rem", color: "white" }}>
          Mapa
        </Link>
        <Link to="/reporte" style={{ marginRight: "1rem", color: "white" }}>
          Reporte
        </Link>
        <Link to="/educacion" style={{ color: "white" }}>
          Educación
        </Link>
      </nav>
    </header>
  );
}
