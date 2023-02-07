import addBtnImg from "../img/icons8-add-new.png";
import { useNavigate, Link } from "react-router-dom";
import { React, useEffect, useState } from "react";

const Navbar = () => {
  const [loggedStatus, setLoggedStatus] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserStatus = async () => {
    // Send GET req to backend to see if user is logged in
    const loginRes = await fetch("http://localhost:5000/taskaid/login/status", {
      method: "GET",
      credentials: "include",
    });

    if (loginRes.status === 200) {
      // User logged in
      const userRes = await loginRes.json();
      setLoggedStatus(userRes);
      setLoading(false);
    } else {
      // User NOT logged in
      setLoggedStatus();
      setLoading(false);
    }
  };

  // Run on initial component mount
  useEffect(() => {
    getUserStatus();
  }, []);

  // log user out
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
          {/* Check if user is logged in or not */}
          {loggedStatus ? (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/taskaid/create-task"
                  className="me-4"
                  state={{ newTask: true }}
                >
                  <img
                    className="add-task-btn-img"
                    src={addBtnImg}
                    alt="add task"
                  />
                </Link>
              </li>
              <li className="nav-item" style={{ lineHeight: "25px" }}>
                <a
                  className="nav-link"
                  href="/taskaid/user/info"
                  style={{ display: "flex" }}
                >
                  {loggedStatus.username}
                  <img
                    className="profile-img ms-2"
                    src={loggedStatus.profileImg}
                    alt="Profile"
                  ></img>
                </a>
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
              <li className="nav-item" style={{ lineHeight: "25px" }}>
                <a className="nav-link" href="/taskaid/signup">
                  Signup
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
