import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import instituteLogo from "../assets/images/images.png";
import anniversaryLogo from "../assets/images/logo.png";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // Login dropdown ko track karne ke liye
  const loginRef = useRef(null);


  /* =====================================================
     CLOSE LOGIN DROPDOWN WHEN CLICKING OUTSIDE
  ===================================================== */

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        loginRef.current &&
        !loginRef.current.contains(event.target)
      ) {

        setLoginOpen(false);

      }

    };


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  /* =====================================================
     CLOSE MENU
  ===================================================== */

  const closeMenu = () => {

    setMenuOpen(false);
    setLoginOpen(false);

  };


  /* =====================================================
     LOGIN TOGGLE
  ===================================================== */

  const toggleLogin = () => {

    setLoginOpen((prev) => !prev);

  };


  return (

    <nav className="navbar">


      {/* =================================================
          BRAND
      ================================================= */}

      <Link
        to="/"
        className="brand"
        onClick={closeMenu}
      >

        <img
          src={instituteLogo}
          alt="American Institute"
          className="main-logo"
        />


        <div className="brand-name">

          <h1>
            American Institute of Hathras
          </h1>

          <span>
            Since 1991
          </span>

        </div>


        <img
          src={anniversaryLogo}
          alt="34 Years"
          className="years-logo"
        />

      </Link>


      {/* =================================================
          MOBILE MENU BUTTON
      ================================================= */}

      <button
        type="button"
        className={`menu-toggle ${
          menuOpen ? "active" : ""
        }`}
        onClick={() =>
          setMenuOpen((prev) => !prev)
        }
        aria-label="Open navigation menu"
      >

        <span></span>
        <span></span>
        <span></span>

      </button>


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <ul
        className={`nav-links ${
          menuOpen ? "open" : ""
        }`}
      >


        {/* HOME */}

        <li>

          <Link
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>

        </li>


        {/* ABOUT */}

        <li>

          <Link
            to="/about"
            onClick={closeMenu}
          >
            About Us
          </Link>

        </li>


        {/* WHO WE ARE */}

        <li>

          <Link
            to="/who-we-are"
            onClick={closeMenu}
          >
            Who We Are
          </Link>

        </li>


        {/* GALLERY */}

        <li>

          <Link
            to="/gallery"
            onClick={closeMenu}
          >
            Gallery
          </Link>

        </li>


        {/* CONTACT */}

        <li>

          <Link
            to="/contact"
            onClick={closeMenu}
          >
            Contact Us
          </Link>

        </li>


        {/* =================================================
            LOGIN
        ================================================= */}

        <li
          className="login-menu"
          ref={loginRef}
        >

          <button
            type="button"
            className={`login-button ${
              loginOpen ? "login-active" : ""
            }`}
            onClick={toggleLogin}
          >

            <span className="login-lock">
              
            </span>

            <span>
              Login
            </span>

            <span
              className={`login-arrow ${
                loginOpen ? "rotate" : ""
              }`}
            >
              ▾
            </span>

          </button>


          {/* =================================================
              LOGIN DROPDOWN
          ================================================= */}

          {loginOpen && (

            <div className="login-dropdown">


              {/* ================= STUDENT ================= */}

              <Link
                to="/student-login"
                onClick={closeMenu}
                className="login-option"
              >

                <span className="login-option-icon">
                  👨🏻‍🎓
                </span>
                


                <span className="login-option-text">

                  <strong>
                    Student Login
                  </strong>

                  <small>
                    Access your student account
                  </small>

                </span>

              </Link>


              {/* ================= ADMIN ================= */}

              <Link
                to="/admin"
                onClick={closeMenu}
                className="login-option"
              >

                <span className="login-option-icon">
                  🖥️
                </span>


                <span className="login-option-text">

                  <strong>
                    Admin Login
                  </strong>

                  <small>
                    Access only by Administrator
                  </small>

                </span>

              </Link>


            </div>

          )}

        </li>


      </ul>


    </nav>

  );

}

export default Navbar;