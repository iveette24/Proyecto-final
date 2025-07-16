function Footer() {
  return (
    <footer className="ae-container-fluid rk-footer ">
      <div className="ae-grid ae-grid--collapse">
        <div className="ae-grid__item item-lg-4 au-xs-ta-center au-lg-ta-left">
          <ul className="rk-menu rk-footer-menu">
            <li className="rk-menu__item">
              <a href="about.html" className="rk-menu__link">
                About
              </a>
            </li>
            <li className="rk-menu__item">
              <a href="documentation.html" className="rk-menu__link">
                Docs
              </a>
            </li>
            <li className="rk-menu__item">
              <a href="contact.html" className="rk-menu__link">
                Contact
              </a>
            </li>
          </ul>
          <p className="rk-footer__text rk-footer__copy ">
            {" "}
            <span className="ae-u-bold">© </span>
            <span className="ae-u-bolder">2015 URKU PORTFOLIO </span>All Right
            Reserved.
          </p>
        </div>
        <div className="ae-grid__item item-lg-4 au-xs-ta-center">
          <a href="#0" className="rk-social-btn ">
            <svg>
              <use xlinkHref="assets/img/symbols.svg#icon-facebook"></use>
            </svg>
          </a>
          <a href="#0" className="rk-social-btn ">
            <svg>
              <use xlinkHref="assets/img/symbols.svg#icon-twitter"></use>
            </svg>
          </a>
          <a href="#0" className="rk-social-btn ">
            <svg>
              <use xlinkHref="assets/img/symbols.svg#icon-pinterest"></use>
            </svg>
          </a>
          <a href="#0" className="rk-social-btn ">
            <svg>
              <use xlinkHref="assets/img/symbols.svg#icon-tumblr"></use>
            </svg>
          </a>
        </div>
        <div className="ae-grid__item item-lg-4 au-xs-ta-center au-lg-ta-right">
          <p className="rk-footer__text rk-footer__contact ">
            {" "}
            <span className="ae-u-bold">Email: </span>
            <span className="ae-u-bolder">
              {" "}
              <a href="#0" className="rk-dark-color ">
                komuniCAT@gmail.com{" "}
              </a>
            </span>
          </p>
          <p className="rk-footer__text rk-footer__by">
            Theme by{" "}
            <a href="http://pixeden.com" className="ae-u-bolder">
              Pixeden.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
