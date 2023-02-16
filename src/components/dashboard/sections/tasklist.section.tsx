import React from "react";
import { MdTimer, MdCheckCircle, MdAccessTime } from "react-icons/md";
import { AiFillRightCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface TasklistSectionInterface {}

const TasklistSection: React.FC<TasklistSectionInterface> = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const { count }: { count: any } = state?.count;

  return (
    <div className="card task-list">
      <h3 className="dashboard-card-title">Task List (this day)</h3>

      <div
        className="task-list__task-type"
        onClick={() => {
          navigate("/my-day");
        }}
      >
        <div className="task-list__task-type__left-section">
          <MdTimer className="icon" />
          Pending Task: {count.todo}
        </div>
        <AiFillRightCircle className="right-icon" />
      </div>

      <div
        className="task-list__task-type ongoing"
        onClick={() => {
          navigate("/my-day");
        }}
      >
        <div className="task-list__task-type__left-section">
          <MdAccessTime className="icon" />
          Ongoing Task: {count.ongoing}
        </div>

        <AiFillRightCircle className="right-icon" />
      </div>

      <div
        className="task-list__task-type completed"
        onClick={() => {
          navigate("/my-day");
        }}
      >
        <div className="task-list__task-type__left-section">
          <MdCheckCircle className="icon" />
          Completed: {count.complete}
        </div>
        <AiFillRightCircle className="right-icon" />
      </div>
    </div>
  );
};

export default TasklistSection;
