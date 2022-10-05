import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-2 justify-content-between">
      <Link className="navbar-brand" to="/">
        Harlemlabs
      </Link>

      <div id="navbarNavDropdown">
        <div />
        {localStorage.getItem("id") && (
          <ul onClick={logOutUser} className="navbar-nav text-white me-5">
            <li
              className="nav-item "
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
              }}
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
