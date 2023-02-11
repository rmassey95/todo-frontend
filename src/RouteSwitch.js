import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserHomepage from "./components/UserHomepage";
import TaskForm from "./components/TaskForm";
import UserInfo from "./components/UserInfo";

const RouteSwitch = () => {
  const backendUrl = "https://taskaid.onrender.com";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage backendUrl={backendUrl} exact />} />
        <Route
          path="/taskaid/signup"
          element={<Signup backendUrl={backendUrl} />}
        />
        <Route
          path="/taskaid/login"
          element={<Login backendUrl={backendUrl} />}
        />
        <Route
          path="/taskaid"
          element={<UserHomepage backendUrl={backendUrl} />}
        />
        <Route
          path="/taskaid/create-task"
          element={<TaskForm backendUrl={backendUrl} />}
        />
        <Route
          path="/taskaid/update-task/:taskId"
          element={<TaskForm backendUrl={backendUrl} />}
        />
        <Route
          path="/taskaid/user/info"
          element={<UserInfo backendUrl={backendUrl} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
