import { v4 as uuidv4 } from "uuid";

const Sidebar = ({
  getData,
  sortTasksByDay,
  chooseDate,
  toggleLabels,
  sortTasksByLabel,
  labels,
}) => {
  return (
    <div className="sidebar">
      <div className="container mt-4 ms-3">
        <h4>
          <button className="sidebar-btn" onClick={getData}>
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
          <button className="sidebar-btn" onClick={chooseDate}>
            Upcoming
          </button>
        </h4>
        <h4>
          <button className="sidebar-btn" onClick={toggleLabels}>
            Labels
          </button>
        </h4>
        <div className="sidebar-labels">
          <ul>
            {labels.map((label) => {
              return (
                <li key={uuidv4()} className="sidebar-li">
                  <button
                    className="sidebar-btn d-block"
                    onClick={() => {
                      sortTasksByLabel(label);
                    }}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
