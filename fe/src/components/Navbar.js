import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg nav-bg shadow-sm p-3 mb-5 bg-body rounded">
        <div className="container">
          <Link className="navbar-brand font-logo me-5" to="/">
            Books Store
            <span className="small black">&copy;</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto fw-semibold">
              <li className="nav-item me-3">
                <Link className="nav-link" to="">
                  Books List
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="">
                  Category
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="">
                  Author
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to="">
                  Publisher
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
