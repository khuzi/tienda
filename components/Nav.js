import Link from "next/link";
import CartIcon from "./cart/CartIcon";
import { useState } from "react";

const Nav = () => {
  const [show, setDisplay] = useState(false);

  return (
    <nav className="navbara navbar-dark">
      <div className="col-md-8 offset-md-2 nav-container">
        {/*Branding*/}
        <div className="woo-next-branding">
          <Link href="/">
            <a className="">
              <img
                width="50"
                className="site-logo"
                src="/logo.png"
                title="Santaignacia. Dulce & gourmet"
                alt="Santaignacia"
              ></img>
            </a>
          </Link>
        </div>

        {/*Navigation menu*/}
        <div className={`woo-next-sub-menu-wrap ${show ? "show" : ""}`} id="">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">carta</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">Preguntas Frecuentes</a>
              </Link>
            </li>
          </ul>
        </div>

        {/*	Cart and Menu button*/}
        <div className="woo-next-cart-and-menu-btn">
          <CartIcon />
        </div>
        {/*Cart Icon*/}
        <div></div>
        {/*Menu toggle button for mobile*/}
        <button
          onClick={() => setDisplay(!show)}
          className="woo-next-menu-btn"
          type="button"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
