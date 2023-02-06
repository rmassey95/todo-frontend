import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [user, setUser] = useState();
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getUser = async () => {
    const res = await fetch("http://localhost:5000/taskaid/login/status", {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 200) {
      const userRes = await res.json();
      setUser(userRes);
      setLoading(false);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/taskaid/user/profile-img/update",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileImg: profileImg,
        }),
      }
    );
    if (res.status === 200) {
      getUser();
    }
  };

  const handleProfileImgChange = (e) => {
    setProfileImg(e.target.value);
  };

  if (loading) {
    return (
      <div className="main">
        <Navbar />
        <div className="container loading"></div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="main">
      <Navbar />
      <div className="container flex-grow-1 d-flex flex-column justify-content-center">
        <h2>Welcome, {user.username}</h2>
        <div className="d-flex mt-2 ms-3" style={{ width: "100%" }}>
          <h4>Profile image: </h4>
          <img
            className="ms-4 user-profile-img"
            src={user.profileImg}
            alt="Profile"
          ></img>
        </div>
        <h3 className="mt-4">Update Profile Image:</h3>
        <form className="form-wrap" onSubmit={handleSubmit}>
          <label htmlFor="imgUrl" className="form-label">
            New Profile Image
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text" id="imgUrl">
              URL
            </span>

            <input
              type="url"
              onChange={handleProfileImgChange}
              value={profileImg}
              id="imgUrl"
              className="form-control"
              aria-label="imgUrl"
              aria-describedby="imgUrl"
            />
          </div>
          <button className="btn btn-outline-primary">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UserInfo;
