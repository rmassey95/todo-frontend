import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const sendData = async () => {
    const res = await fetch("http://localhost:5000/taskaid/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (res.status === 200) {
      navigate("/taskaid");
    }

    const resData = await res.json();
    setError(resData.msg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendData();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const guestLogin = () => {
    setUsername("Guest");
    setPassword("Guest123.");
  };

  return (
    <div className="main">
      <Navbar />
      <div className="form-container">
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
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
            </div>
            {error && (
              <ul>
                <li className="text-danger">{error}</li>
              </ul>
            )}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <div className="mt-4">
            <p style={{ margin: "0" }}>
              Or click the button below to enter guest information then select
              "Login"
            </p>
            <button onClick={guestLogin} className="btn btn-outline-secondary">
              Guest View
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
