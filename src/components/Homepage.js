import Navbar from "./Navbar";
import Footer from "./Footer";

const Homepage = ({ backendUrl }) => {
  return (
    <div className="main">
      <Navbar backendUrl={backendUrl} />
      <div className="homepage">
        <h1 style={{ marginBottom: "10px" }}>
          Welcome to <span className="text-color-main">Taskaid</span>!
        </h1>
        <h4 style={{ margin: "0" }}>
          Click{" "}
          <a className="homepage-anchor" href="/taskaid/login">
            here
          </a>{" "}
          to login or signup{" "}
          <a className="homepage-anchor" href="/taskaid/signup">
            here
          </a>{" "}
        </h4>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
