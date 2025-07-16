import { Link, NavLink } from "react-router-dom";
import type { NavLinkProps } from "react-router-dom";
Object.values(import.meta.glob("./assets/css/*", { eager: true }));

function Header() {
  return (
    <>
      <div className="ae-container-fluid ae-container-fluid--full rk-header">
        <input type="checkbox" id="mobile-menu" className="rk-mobile-menu" />
        <label htmlFor="mobile-menu">
          <svg>
            <use xlinkHref="assets/img/symbols.svg#bar"></use>
          </svg>
          <svg>
            <use xlinkHref="assets/img/symbols.svg#bar"></use>
          </svg>
          <svg>
            <use xlinkHref="assets/img/symbols.svg#bar"></use>
          </svg>
        </label>
        <div className="ae-container-fluid rk-topbar">
          <h1 className="rk-logo">
            <Link to="/">KOMUNI</Link>
          </h1>
          <nav className="rk-navigation">
            <ul className="rk-menu">
              <li className="rk-menu__item">
                <NavLink to="/"  end className={({ isActive }: { isActive: boolean }) => "rk-menu__link" + (isActive ? " active" : "")}>
                  Home
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink to="/about" className={({ isActive }: { isActive: boolean }) => "rk-menu__link" + (isActive ? " active" : "")}>
                  Sobre nosotros
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink to="/mapa" className={({ isActive }: { isActive: boolean }) => "rk-menu__link" + (isActive ? " active" : "")}>
                  Mapa
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink to="/foro" className={({ isActive }: { isActive: boolean }) => "rk-menu__link" + (isActive ? " active" : "")}>
                  Foro
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink to="/contacto" className={({ isActive }: { isActive: boolean }) => "rk-menu__link" + (isActive ? " active" : "")}>
                  Contacto
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
