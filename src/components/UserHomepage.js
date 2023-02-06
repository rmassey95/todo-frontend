import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const UserHomepage = () => {
  const [tasks, setTasks] = useState();
  const [labels, setLabels] = useState([]);
  const [title, setTitle] = useState("All Tasks");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getTasks = () => {
    return fetch("http://localhost:5000/taskaid/tasks", {
      method: "GET",
      // credentials set to include allows cookies to be passed through request
      credentials: "include",
    });
  };

  const getLabels = () => {
    return fetch("http://localhost:5000/taskaid/user/labels", {
      method: "GET",
      // credentials set to include allows cookies to be passed through request
      credentials: "include",
    });
  };

  const getData = async () => {
    let [tasksRes, labelRes] = await Promise.all([getTasks(), getLabels()]);

    if (tasksRes.status === 401 || labelRes.status === 401) {
      navigate("/");
    } else {
      const tasks = await tasksRes.json();
      const labels = await labelRes.json();

      setTasks(tasks);
      setLabels(labels.taskLabels);
      setTitle("All Tasks");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const dropdown = () => {
    const filterOptions = document.querySelector(".filter-options");
    filterOptions.classList.toggle("show-content");
  };

  const prioMouseOver = () => {
    const prioOptions = document.querySelector(".prio-options");
    const labelOptions = document.querySelector(".label-options");

    if (labelOptions.classList.contains("show-content")) {
      labelOptions.classList.toggle("show-content");
      prioOptions.classList.toggle("show-content");
    } else if (
      !labelOptions.classList.contains("show-content") &&
      !prioOptions.classList.contains("show-content")
    ) {
      prioOptions.classList.toggle("show-content");
    }
  };

  const labelMouseOver = () => {
    const prioOptions = document.querySelector(".prio-options");
    const labelOptions = document.querySelector(".label-options");

    if (prioOptions.classList.contains("show-content")) {
      labelOptions.classList.toggle("show-content");
      prioOptions.classList.toggle("show-content");
    } else if (
      !labelOptions.classList.contains("show-content") &&
      !prioOptions.classList.contains("show-content")
    ) {
      labelOptions.classList.toggle("show-content");
    }
  };

  const optionsMouseLeave = () => {
    const labelOptions = document.querySelector(".label-options");
    const prioOptions = document.querySelector(".prio-options");

    if (labelOptions.classList.contains("show-content")) {
      labelOptions.classList.toggle("show-content");
    }
    if (prioOptions.classList.contains("show-content")) {
      prioOptions.classList.toggle("show-content");
    }
  };

  const sortTasksByPrio = async (prio) => {
    switch (prio) {
      case "low":
        setTitle("Priority: Low");
        break;
      case "med":
        setTitle("Priority: Medium");
        break;
      case "high":
        setTitle("Priority: High");
        break;
      case "none":
        setTitle("No Priority");
        break;
      default:
        setTitle("All Tasks");
    }

    const tasksRes = await fetch(
      `http://localhost:5000/taskaid/tasks/by-priority/${prio}`,
      {
        method: "GET",
        // credentials set to include allows cookies to be passed through request
        credentials: "include",
      }
    );

    if (tasksRes.status === 401) {
      navigate("/");
    }

    const tasks = await tasksRes.json();
    setTasks(tasks);
    setLoading(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = "" + d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");
  };

  const sortTasksByDay = async (date) => {
    const formattedDate = formatDate(date);

    const tasksRes = await fetch(
      `http://localhost:5000/taskaid/tasks/by-date/${formattedDate}`,
      {
        method: "GET",
        // credentials set to include allows cookies to be passed through request
        credentials: "include",
      }
    );

    if (tasksRes.status === 401) {
      navigate("/");
    } else {
      const tasks = await tasksRes.json();
      setTasks(tasks);
      setTitle(`${new Date(date).toDateString()}`);
      setLoading(false);
    }
  };

  const toggleLabels = () => {
    const labels = document.querySelector(".sidebar-labels");
    labels.classList.toggle("show-content");
  };

  const sortTasksByLabel = async (label) => {
    const tasksRes = await fetch(
      `http://localhost:5000/taskaid/tasks/by-label/${label}`,
      {
        method: "GET",
        // credentials set to include allows cookies to be passed through request
        credentials: "include",
      }
    );

    if (tasksRes.status === 401) {
      navigate("/");
    } else {
      const tasks = await tasksRes.json();
      setTasks(tasks);
      setTitle(`Label: ${label}`);
      setLoading(false);
    }
  };

  const completeTask = async (taskId) => {
    await fetch(`http://localhost:5000/taskaid/task/delete/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });

    getData();
  };

  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <div className="flex-grow-1 position-relative d-flex">
      <div className="sidebar">
        <div className="container mt-4 ms-3">
          <h4>
            <button
              className="sidebar-btn"
              onClick={() => {
                getData();
              }}
            >
              All Tasks
            </button>
          </h4>
          <h4>
            <button
              className="sidebar-btn"
              onClick={() => {
                sortTasksByDay(new Date());
              }}
            >
              Today
            </button>
          </h4>
          <h4>
            <button className="sidebar-btn">Upcoming</button>
          </h4>
          <h4>
            <button
              className="sidebar-btn"
              onClick={() => {
                toggleLabels();
              }}
            >
              Labels
            </button>
          </h4>
          <div className="sidebar-labels">
            <p className="ms-3 ">
              {labels.map((label) => {
                return (
                  <button
                    key={uuidv4()}
                    className="sidebar-btn d-block"
                    onClick={() => {
                      sortTasksByLabel(label);
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mt-3 ms-3 me-3 pb-2 border-bottom">
          <h2 style={{ margin: 0 }}>{title}</h2>
          <div className="text-end">
            <button onClick={dropdown} className="dropbtn-filter">
              Filter
            </button>
          </div>
        </div>
        <div
          className="position-absolute me-3 end-0 d-flex"
          onMouseLeave={optionsMouseLeave}
        >
          <div className="dropdown-content prio-options">
            <button
              onClick={() => {
                sortTasksByPrio("low");
              }}
            >
              Low
            </button>
            <button
              onClick={() => {
                sortTasksByPrio("med");
              }}
            >
              Medium
            </button>
            <button
              onClick={() => {
                sortTasksByPrio("high");
              }}
            >
              High
            </button>
            <button
              onClick={() => {
                sortTasksByPrio("none");
              }}
            >
              None
            </button>
          </div>

          <div className="dropdown-content label-options">
            {labels.map((label) => {
              return (
                <button
                  key={uuidv4()}
                  onClick={() => {
                    sortTasksByLabel(label);
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="filter-options">
            <div className="dropdown">
              <button className="dropbtn prio-btn" onMouseOver={prioMouseOver}>
                By Priority
              </button>
            </div>
            <div className="dropdown">
              <button
                className="dropbtn label-btn"
                onMouseOver={labelMouseOver}
              >
                By Label
              </button>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <div
                  className={
                    task.priority === "low"
                      ? "card d-flex flex-row mb-3 prio-low-card"
                      : task.priority === "med"
                      ? "card d-flex flex-row mb-3 prio-med-card"
                      : task.priority === "high"
                      ? "card d-flex flex-row mb-3 prio-high-card"
                      : "card d-flex flex-row mb-3"
                  }
                  key={task._id}
                >
                  <div className="task-check-body ms-2">
                    <div
                      onClick={() => {
                        completeTask(task._id);
                      }}
                      className={
                        task.priority === "low"
                          ? "task-check prio-low"
                          : task.priority === "med"
                          ? "task-check prio-med"
                          : task.priority === "high"
                          ? "task-check prio-high"
                          : "task-check"
                      }
                    ></div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{task.title}</h5>
                      <h5 className="card-title">{task.label}</h5>
                    </div>
                    {task.desc !== "" ? (
                      <p className="card-text">{task.desc}</p>
                    ) : (
                      <p className="card-text">No task description</p>
                    )}
                    <h6 className="card-subtitle mb-0 text-muted">
                      Due date: {task.dueDate}
                    </h6>
                    <Link
                      to={`/taskaid/update-task/${task._id}`}
                      className="update-btn"
                      state={{ labels: labels }}
                    >
                      Update
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>No Tasks</h3>
          )}
        </div>
        <Link
          to="/taskaid/create-task"
          className="btn-outline-primary btn"
          state={{ labels: labels }}
        >
          Add Task
        </Link>
      </div>
    </div>
  );
};

export default UserHomepage;
