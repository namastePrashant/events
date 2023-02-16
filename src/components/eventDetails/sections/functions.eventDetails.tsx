import React, { useState } from "react";
import { Collapse, Row, Col } from "antd";

import TasksComponent from "./tasks.eventDetails";
import { storeEditFunctionData } from "../../../store/slice/togglers.slice";
import FunctionHeaderComponent from "./functionHeader";

interface FunctionsEventDetailsInterface {
  data?: any;
  handleDeleteFunction?: any;
  handleFunctionDateSelection?: any;
  handleCreateNewTask?: any;
  setHasAddNewTask?: any;
  hasAddNewTask?: any;
  handleTaskInputChange?: any;
  handleDeleteTask?: any;
  handleReorderFunction?: any;
  handleTaskPriorityChange?: any;
  handleTaskStatusChange?: any;
  handleMoveUp?: any;
  handleMoveDown?: any;
  handleSubTaskInputChange?: any;
  setHasAddNewSubTask?: any;
  hasAddNewSubTask?: boolean;
  taskForm?: any;
  handleFunctionStatusChange?: any;
  loading?: any;
  newTaskFunctionId?: any;
  submittingSubtask?: boolean;
  submittingTask?: boolean;
  setNewTaskFunctionId?: any;
  setExpandAll?: any;
  expandAll?: boolean;
  eventData?: any;
  handleVendorSelection?: any;
}

const { Panel } = Collapse;

const FunctionsEventDetails: React.FC<FunctionsEventDetailsInterface> = (
  props
) => {
  const {
    data,
    handleDeleteFunction,
    handleFunctionDateSelection,
    handleCreateNewTask,
    hasAddNewTask,
    handleTaskInputChange,
    handleDeleteTask,
    handleTaskPriorityChange,
    handleTaskStatusChange,
    handleMoveDown,
    handleMoveUp,
    handleSubTaskInputChange,
    hasAddNewSubTask,
    setHasAddNewSubTask,
    taskForm,
    handleFunctionStatusChange,
    newTaskFunctionId,

    submittingSubtask,
    submittingTask,
    setNewTaskFunctionId,

    expandAll,
    eventData,
    handleVendorSelection,
  } = props;
  const [activeKey, setActiveKey] = useState<any>();

  return (
    <div className="function-card">
      <Collapse
        accordion={false}
        className="function-card__collapse"
        activeKey={expandAll ? data.map((d?: any) => d.id) : activeKey}
        onChange={(val) => {
          if (expandAll) {
            return;
          }
          setActiveKey(val);
        }}
      >
        {data.map((functionItem: any, functionIndex: any) => {
          return (
            <Panel
              header={
                <FunctionHeaderComponent
                  handleFunctionDateSelection={handleFunctionDateSelection}
                  functionItem={functionItem}
                  handleCreateNewTask={handleCreateNewTask}
                  functionIndex={functionIndex}
                  storeEditFunctionData={storeEditFunctionData}
                  handleDeleteFunction={handleDeleteFunction}
                  handleFunctionStatusChange={handleFunctionStatusChange}
                  setActiveKey={setActiveKey}
                  setNewTaskFunctionId={setNewTaskFunctionId}
                  newTaskFunctionId={newTaskFunctionId}
                  eventData={eventData}
                />
              }
              key={functionItem?.id}
              showArrow={false}
              className="panel"
            >
              <Row className="task-label">
                <Col span={16} className="label">
                  {functionItem?.tasks?.length ?? 0} Task
                </Col>
                <Col span={3} className="label">
                  Assignee
                </Col>
                <Col span={3} className="label">
                  Due Date
                </Col>
                <Col span={1} className="label">
                  Priority
                </Col>
                <Col span={1} className="label">
                  Status
                </Col>
              </Row>
              <TasksComponent
                tasks={functionItem?.tasks}
                handleTaskInputChange={handleTaskInputChange}
                handleDeleteTask={handleDeleteTask}
                handleTaskPriorityChange={handleTaskPriorityChange}
                handleTaskStatusChange={handleTaskStatusChange}
                hasAddNewTask={hasAddNewTask}
                handleCreateNewTask={handleCreateNewTask}
                functionId={functionItem?.id}
                handleMoveDown={handleMoveDown}
                handleMoveUp={handleMoveUp}
                handleSubTaskInputChange={handleSubTaskInputChange}
                hasAddNewSubTask={hasAddNewSubTask}
                setHasAddNewSubTask={setHasAddNewSubTask}
                taskForm={taskForm}
                newTaskFunctionId={newTaskFunctionId}
                submittingSubtask={submittingSubtask}
                submittingTask={submittingTask}
                functionItem={functionItem}
                handleVendorSelection={handleVendorSelection}
              />
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default FunctionsEventDetails;
