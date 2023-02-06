import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserHomepage from "./components/UserHomepage";
import TaskForm from "./components/TaskForm";
import UserInfo from "./components/UserInfo";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/taskaid/signup" element={<Signup />} />
        <Route path="/taskaid/login" element={<Login />} />
        <Route path="/taskaid" element={<UserHomepage />} />
        <Route path="/taskaid/create-task" element={<TaskForm />} />
        <Route path="/taskaid/update-task/:taskId" element={<TaskForm />} />
        <Route path="/taskaid/user/info" element={<UserInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
