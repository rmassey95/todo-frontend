import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const { v4: uuidv4 } = require("uuid");

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [label, setLabel] = useState("");
  const [desc, setDesc] = useState("");
  const [prio, setPrio] = useState("none");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { taskId } = useParams();
  const location = useLocation();
  const { labels } = location.state;
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handlePrioChange = (e) => {
    setPrio(e.target.value);
  };

  const checkStatus = async (res) => {
    if (res.status === 200) {
      if (!labels.includes(label)) {
        await fetch(`http://localhost:5000/taskaid/user/add-label/${label}`, {
          method: "POST",
          credentials: "include",
        });
      }
      navigate("/taskaid");
    }

    const resData = await res.json();
    setErrors(resData.errorMsgs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskId) {
      const res = await fetch(
        `http://localhost:5000/taskaid/task/update/${taskId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            dueDate: dueDate,
            priority: prio,
            label: label === "" ? "No Label" : label,
            desc: desc,
          }),
        }
      );
      checkStatus(res);
    } else {
      const res = await fetch("http://localhost:5000/taskaid/task/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          dueDate: dueDate,
          priority: prio,
          label: label === "" ? "No Label" : label,
          desc: desc,
        }),
      });
      checkStatus(res);
    }
  };

  const getTask = async () => {
    const res = await fetch(`http://localhost:5000/taskaid/task/${taskId}`, {
      method: "GET",
      credentials: "include",
    });

    const task = await res.json();

    setTitle(task.title);
    setDueDate(task.dueDate);
    setLabel(task.label);
    setDesc(task.desc);
    setPrio(task.priority);
    setLoading(false);
  };

  useEffect(() => {
    if (taskId) {
      setLoading(true);
      getTask();
    }
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  } else {
    return (
      <div className="form-container">
        <div className="container">
          {taskId ? <h1>Update Task</h1> : <h1>Add Task</h1>}
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                required={true}
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dueDate" className="form-label">
                Due Date
              </label>
              <input
                required={true}
                type="date"
                className="form-control"
                id="dueDate"
                value={dueDate}
                onChange={handleDueDateChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="prio" className="form-label">
                Priority
              </label>
              <select
                required={true}
                onChange={handlePrioChange}
                id="prio"
                className="form-select"
                aria-label="Priority"
                value={prio}
              >
                <option value="none">No Priority</option>
                <option value="low">Low</option>
                <option value="med">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="label" className="form-label">
                Label
              </label>
              <input
                type="text"
                className="form-control"
                id="label"
                value={label}
                onChange={handleLabelChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <textarea
                rows={5}
                className="form-control"
                id="desc"
                value={desc}
                onChange={handleDescChange}
              />
            </div>

            {errors.length > 0 && (
              <ul>
                {errors.map((error) => {
                  return (
                    <li key={uuidv4()} className="text-danger">
                      {error.msg}
                    </li>
                  );
                })}
              </ul>
            )}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default TaskForm;