import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

Object.values(import.meta.glob("./assets/css/*", { eager: true }));

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 2); // Adjust threshold as needed
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div
        className={` rk-header${scrolled ? " rk-header--scrolled" : ""}`}
        style={{ padding: 1 }}
      >
        <div className="ae-container-fluid rk-topbar">
          <h1 className="rk-logo">
            <Link to="/">
              <img
                className="logo-komuni"
                src="src/assets/img/Komuni2.png"
                alt="Logo de KOMUNI, con una imagen de una chincheta de mapa con una silla de ruedas en azul."
              />
            </Link>
          </h1>
          <nav className="rk-navigation">
            <ul className="rk-menu">
              <li className="rk-menu__item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }: { isActive: boolean }) =>
                    "rk-menu__link" + (isActive ? " active" : "")
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink
                  to="/about"
                  className={({ isActive }: { isActive: boolean }) =>
                    "rk-menu__link" + (isActive ? " active" : "")
                  }
                >
                  Sobre nosotros
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink
                  to="/mapa"
                  className={({ isActive }: { isActive: boolean }) =>
                    "rk-menu__link" + (isActive ? " active" : "")
                  }
                >
                  Mapa
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink
                  to="/foro"
                  className={({ isActive }: { isActive: boolean }) =>
                    "rk-menu__link" + (isActive ? " active" : "")
                  }
                >
                  Foro
                </NavLink>
              </li>
              <li className="rk-menu__item">
                <NavLink
                  to="/contacto"
                  className={({ isActive }: { isActive: boolean }) =>
                    "rk-menu__link" + (isActive ? " active" : "")
                  }
                >
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
