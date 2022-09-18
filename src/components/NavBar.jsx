import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2">
      <Link className="navbar-brand" to="/">
        Harlemlabs
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarNavDropdown"
      >
        {/* <ul className="navbar-nav">
          <li className="nav-item active text-white">
            <a className="nav-link" href="#">
              Home <span className="sr-only"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul> */}
        <div />
        {/* <form className="d-flex">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success bg-dark text-white"
            type="submit"
          >
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
}

export default NavBar;
