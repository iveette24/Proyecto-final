import { Link } from "react-router";

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
              <li className="active rk-menu__item">
                <Link to="/" className="rk-menu__link">
                  Home
                </Link>
              </li>
              <li className="rk-menu__item">
                <Link to="/about" className="rk-menu__link">
                  Portfolio
                </Link>
              </li>
              <li className="rk-menu__item">
                <Link to="/" className="rk-menu__link">
                  Blog
                </Link>
              </li>
              <li className="rk-menu__item">
                <Link to="/" className="rk-menu__link">
                  Pages
                </Link>
              </li>
              <li className="rk-menu__item">
                <Link to="/" className="rk-menu__link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
