import React, { useState } from "react";
import { Collapse, Row, Col, Button, Input, Form } from "antd";
import _ from "lodash";
import parse from "html-react-parser";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getAllVendorsApi } from "../../../services/vendors.service";
import TaskHeaderComponent from "./taskHeader";
import SubTaskHeaderComponent from "./subTaskHeader";
import NewSubtaskComponent from "./newSubtask";
import NewTaskComponent from "./newTask";

interface TasksCardInterface {
  handleTaskInputChange?: any;
  handleSubTaskInputChange?: any;
  hasAddNewTask?: boolean;
  handleDeleteTask?: any;
  handleTaskPriorityChange?: any;
  handleTaskStatusChange?: any;
  tasks?: any;
  handleCreateNewTask?: any;
  functionId?: any;
  handleMoveUp?: any;
  handleMoveDown?: any;
  hasAddNewSubTask?: boolean;
  setHasAddNewSubTask?: any;
  taskForm?: any;
  newTaskFunctionId?: any;
  submittingSubtask?: boolean;
  submittingTask?: boolean;
  functionItem?: any;
  handleVendorSelection?: any;
}

const TasksCard: React.FC<TasksCardInterface> = (props) => {
  const {
    handleTaskInputChange,
    handleSubTaskInputChange,
    hasAddNewTask,
    handleDeleteTask,
    handleTaskPriorityChange,
    handleTaskStatusChange,
    tasks,
    handleCreateNewTask,
    handleMoveDown,
    handleMoveUp,
    hasAddNewSubTask,
    newTaskFunctionId,
    functionId,
    submittingSubtask,
    submittingTask,
    functionItem,
    handleVendorSelection,
  } = props;
  const { Panel } = Collapse;
  const [isEdit, setIsEdit] = useState(false);
  const [subtaskNameValue, setSubtaskNameValue] = useState(
    hasAddNewSubTask ? "" : ""
  );
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { vendors } = state.vendors;

  const fetchVendor = () => {
    dispatch(
      getAllVendorsApi({
        finalCallback: () => {},
        page: undefined,
        pageSize: window.DEFAULT_PAGE_SIZE,
        data: undefined,
        successCallback: () => {},
        order: undefined,
        orderBy: undefined,
      })
    );
  };

  return (
    <div className="task">
      <Collapse accordion className="task__collapse">
        {tasks?.map((taskItem: any, taskIndex: any) => {
          return (
            <Panel
              showArrow={false}
              key={taskItem?.id}
              header={
                <TaskHeaderComponent
                  {...props}
                  taskItem={taskItem}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  taskIndex={taskIndex}
                  handleDeleteTask={handleDeleteTask}
                  tasks={tasks}
                  fetchVendor={fetchVendor}
                  vendors={vendors}
                  handleMoveDown={handleMoveDown}
                  handleMoveUp={handleMoveUp}
                  functionItem={functionItem}
                  handleVendorSelection={handleVendorSelection}
                />
              }
            >
              <ul className="task__subtask">
                <span className="task__subtask__label">
                  {taskItem?.subtasks?.length ?? 0} Subtasks
                </span>
                {taskItem?.subtasks?.map((subTask: any, subTaskIndex: any) => {
                  return (
                    <SubTaskHeaderComponent
                      subTask={subTask}
                      handleDeleteTask={handleDeleteTask}
                      handleTaskInputChange={handleTaskInputChange}
                      handleTaskPriorityChange={handleTaskPriorityChange}
                      handleTaskStatusChange={handleTaskStatusChange}
                      handleVendorSelection={handleVendorSelection}
                    />
                  );
                })}
              </ul>
              {/* new subtask */}
              <NewSubtaskComponent
                taskItem={taskItem}
                handleSubTaskInputChange={handleSubTaskInputChange}
                subtaskNameValue={subtaskNameValue}
                setSubtaskNameValue={setSubtaskNameValue}
                submittingSubtask={submittingSubtask}
              />
            </Panel>
          );
        })}
      </Collapse>
      <NewTaskComponent
        functionId={functionId}
        newTaskFunctionId={newTaskFunctionId}
        handleTaskInputChange={handleTaskInputChange}
        hasAddNewTaskParent={hasAddNewTask}
        handleCreateNewTask={handleCreateNewTask}
        submittingTask={submittingTask}
      />
    </div>
  );
};

export default TasksCard;
