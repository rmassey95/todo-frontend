import addBtnImg from "../img/icons8-add-new.png";
import { useNavigate } from "react-router-dom";
const { React, useEffect, useState } = require("react");

const Navbar = () => {
  const [loggedStatus, setLoggedStatus] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserStatus = async () => {
    const res = await fetch("http://localhost:5000/taskaid/login/status", {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 200) {
      const userRes = await res.json();
      setLoggedStatus(userRes);
      setLoading(false);
    } else {
      setLoggedStatus();
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserStatus();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/taskaid/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoggedStatus();
    navigate("/");
  };

  if (loading) {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand text-color-main" href="/taskaid">
            Taskaid
          </a>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand text-color-main" href="/taskaid">
          Taskaid
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="justify-content-end align-items-center collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          {loggedStatus ? (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link me-4 ps-8 pe-8"
                  aria-current="page"
                  href="/taskaid/create-task"
                >
                  <img
                    className="add-task-btn-img"
                    src={addBtnImg}
                    alt="add task"
                  />
                </a>
              </li>
              <li className="nav-item" style={{ lineHeight: "25px" }}>
                <a className="nav-link" href="/taskaid/user/info">
                  {loggedStatus.username}
                </a>
              </li>
              <li className="nav-item me-4" style={{ lineHeight: "25px" }}>
                <img
                  className="profile-img"
                  src={loggedStatus.profileImg}
                  alt="Profile"
                ></img>
              </li>
              <li className="nav-item" style={{ lineHeight: "25px" }}>
                <button onClick={logout} className="nav-link nav-btn">
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item" style={{ lineHeight: "25px" }}>
                <a className="nav-link" href="/taskaid/login">
                  Login
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
