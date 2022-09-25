import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.clear();
    navigate("/");
  };
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
        <div />
        {localStorage.getItem("id") && (
          <ul onClick={logOutUser} className="navbar-nav text-white me-5">
            <li
              className="nav-item "
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Log Out
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
