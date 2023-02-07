import { useNavigate } from "react-router-dom";
import { React, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const { v4: uuidv4 } = require("uuid");

const Signup = ({ backendUrl }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState({ error: false });

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPasswordChange = (e) => {
    setConfPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST req to backend with username and pw details
    const signupRes = await fetch(`${backendUrl}/taskaid/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        confPassword: confPassword,
      }),
    });

    // Successful signup
    if (signupRes.status === 200) {
      navigate("/taskaid/login");
    }

    // Failed signup, error messages will be displayed
    const resData = await signupRes.json();
    setError(resData);
  };

  return (
    <div className="main">
      <Navbar />
      <div className="form-container">
        <div className="container">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={username}
                id="username"
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                className="form-control"
                aria-describedby="passwordHelpBlock"
                onChange={handlePasswordChange}
              />
              <div id="passwordHelpBlock" className="form-text">
                Your password must be a minimum of 8 characters long. Minimum of
                1 uppercase letter, 1 lowercase, 1 symbol, and 1 number.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="confPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                value={confPassword}
                id="confPassword"
                onChange={handleConfPasswordChange}
              />
            </div>
            {/* Display signup errors if any are present */}
            {error.error && (
              <ul>
                {error.errorMsgs.map((errorMsg) => {
                  return (
                    <li key={uuidv4()} className="text-danger">
                      {errorMsg.msg}
                    </li>
                  );
                })}
              </ul>
            )}
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
