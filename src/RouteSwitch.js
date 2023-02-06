import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserHomepage from "./components/UserHomepage";
import TaskForm from "./components/TaskForm";
import Calendar from "./components/Calendar";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/taskaid/signup" element={<Signup />} />
        <Route path="/taskaid/login" element={<Login />} />
        <Route path="/taskaid" element={<UserHomepage />} />
        <Route path="/taskaid/create-task" element={<TaskForm />} />
        <Route path="/taskaid/update-task/:taskId" element={<TaskForm />} />
        <Route path="/taskaid/choose-date" element={<Calendar />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default RouteSwitch;
