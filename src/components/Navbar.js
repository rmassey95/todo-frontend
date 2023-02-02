import addBtnImg from "../img/icons8-add-new.png";
const { React } = require("react");

const Navbar = () => {
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
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                <img
                  className="add-task-btn-img"
                  src={addBtnImg}
                  alt="add task"
                />
              </a>
            </li>
            <li className="nav-item" style={{ lineHeight: "25px" }}>
              <a className="nav-link" href="#">
                USERNAME HERE
              </a>
            </li>
            <li className="nav-item" style={{ lineHeight: "25px" }}>
              <a className="nav-link" href="#">
                PROFILE IMG
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
