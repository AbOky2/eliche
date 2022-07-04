import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <section
      className="menu firmm4_menu1 cid-sAFX1m4jsM"
      once="menu"
      id="menu1-1b"
    >
      <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className="navbar-brand">
            <span className="navbar-logo">
              <Link href="/">
                <a>
                  <img
                    src="assets/images/logo-principal.svg"
                    alt=""
                    style={{ height: '2.5rem' }}
                  />
                </a>
              </Link>
            </span>
          </div>
          <a
            className="
              redirect-btn
              btn btn-primary
              display-4
              mobile-only
              signin-mobile
            "
            href="/login?register"
          >
            Je m'inscris
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link link text-secondary text-primary display-4">
                    Accueil
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about">
                  <a className="nav-link link text-secondary text-primary display-4">
                    Qui sommes-nous
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link link text-secondary text-primary display-4"
                  href="https://kitlenid.fr/blog"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="navbar-buttons mbr-section-btn">
            <a className="btn btn-primary-outline display-4" href="/login">
              Se connecter
            </a>
            <a
              className="redirect-btn btn btn-primary display-4"
              href="/login?register"
            >
              S'inscrire
            </a>
          </div>
        </div>
      </nav>
    </section>
  );
}
