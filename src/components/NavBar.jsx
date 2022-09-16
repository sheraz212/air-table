import React from "react";

function NavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary p-2">
      <a class="navbar-brand" href="#">
        Harlemlabs
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-between"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav">
          <li class="nav-item active text-white">
            <a class="nav-link" href="#">
              Home <span class="sr-only"></span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Features
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Pricing
            </a>
          </li>
        </ul>
        <form className="d-flex">
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-success bg-dark text-white"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
