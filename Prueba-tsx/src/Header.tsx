Object.values(import.meta.glob('./assets/css/*', { eager: true }));

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
            <a href="index.html">
              KOMUNI
            </a>
          </h1>
          <nav className="rk-navigation">
            <ul className="rk-menu">
              <li className="active rk-menu__item">
                <a href="index.html" className="rk-menu__link">
                  Home
                </a>
              </li>
              <li className="rk-menu__item">
                <a href="portfolio.html" className="rk-menu__link">
                  Portfolio
                </a>
              </li>
              <li className="rk-menu__item">
                <a href="blog.html" className="rk-menu__link">
                  Blog
                </a>
              </li>
              <li className="rk-menu__item">
                <a href="#0" className="rk-menu__link">
                  Pages
                </a>
              </li>
              <li className="rk-menu__item">
                <a href="contact.html" className="rk-menu__link">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;