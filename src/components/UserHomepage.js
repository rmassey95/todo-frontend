import { React, useState, useEffect } from "react";

const UserHomepage = () => {
  const [tasks, setTasks] = useState();

  const getTasks = async () => {
    const tasksRes = await fetch("http://localhost:5000/taskaid/tasks", {
      method: "GET",
      // credentials set to include allows cookies to be passed through request
      credentials: "include",
    });

    if (tasksRes.status === 401) {
      console.log("USER NOT AUTHENTICATED");
    } else {
      console.log("USER AUTHENTICATED");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return <div>USER HOMEPAGE</div>;
};

export default UserHomepage;
