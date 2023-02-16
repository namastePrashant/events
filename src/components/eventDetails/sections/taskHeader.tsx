import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Space, Tooltip } from "antd";
import _ from "lodash";
import {
  MdOutlineArticle,
  MdDeleteOutline,
  MdModeEditOutline,
  MdFormatListBulleted,
  MdPeople,
} from "react-icons/md";
import { FaAngleDoubleUp, FaAngleDoubleDown } from "react-icons/fa";
import moment from "moment";

import PriorityComponent from "./priorityComponent";
import DueDateComponent from "./dueDateComponent";
import AssignVendorComponent from "./assignVendorComponent";
import StatusComponent from "./statusComponent";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import {
  toggleFunctionNoteModal,
  storeEditFunctionData,
} from "../../../store/slice/togglers.slice";
import { extractTextForHeader } from "../../../utils/utilities";

interface TaskNameComponentInterface {
  handleTaskInputChange?: any;
  isCreate?: any;
  taskItem?: any;
  setIsEdit?: any;
  isEdit?: any;
  taskIndex?: any;
  handleDeleteTask?: any;
  tasks?: any;
  handleTaskStatusChange?: any;
  handleTaskPriorityChange?: any;
  fetchVendor?: any;
  vendors?: any;
  handleMoveUp?: any;
  handleMoveDown?: any;
  functionItem?: any;
  handleVendorSelection?: any;
}

const TaskNameComponent: React.FC<TaskNameComponentInterface> = (props) => {
  const {
    isCreate,
    handleTaskInputChange,
    taskItem,
    taskIndex,
    handleDeleteTask,
    handleTaskStatusChange,
    handleTaskPriorityChange,
    tasks,
    handleMoveUp,
    handleMoveDown,
    functionItem,
    handleVendorSelection,
  } = props;
  const [nameValue, setNameValue] = useState(isCreate ? "" : taskItem?.name);
  const [isEdit, setIsEdit] = useState(false);
  const [showRightSection, setShowRightSection] = useState(false);
  const [isTaskComplete, setIsTaskComplete] = useState(
    taskItem?.status === "complete"
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsTaskComplete(taskItem?.status === "complete");
  }, [taskItem]);

  return (
    <div className="">
      <Row>
        <Col
          span={16}
          className="value"
          onMouseOver={(e) => {
            if (isTaskComplete) {
              return;
            }
            setShowRightSection(true);
            e.stopPropagation();
          }}
          onMouseOut={(e) => {
            setShowRightSection(false);
            e.stopPropagation();
          }}
        >
          <Row align="middle">
            <Col span={21}>
              <div className="task__collapse__header">
                <span className="icon">
                  <MdOutlineArticle />
                </span>
                {isEdit || isCreate ? (
                  <>
                    <Input
                      placeholder="New Task"
                      value={nameValue}
                      onBlur={(e) => {
                        handleTaskInputChange({
                          name: "name",
                          value: nameValue,
                          data: taskItem,
                        });
                        setIsEdit(false);
                      }}
                      // ref={nameInputRef}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setNameValue(e.target.value)}
                      onFocus={(e) => {
                        e.stopPropagation();
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        handleTaskInputChange({
                          name: "name",
                          value: nameValue,
                          data: taskItem,
                        });
                        setIsEdit(false);
                        e.stopPropagation();
                      }}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <span className={`title ${isTaskComplete ? "strike" : ""}`}>
                      {_.upperFirst(nameValue)}
                    </span>
                    <Row className="mt-5">
                      <span className="task__subtask-info">
                        <MdFormatListBulleted />
                        {taskItem?.complete_subtasks_count}/
                        {taskItem?.subtasks_count ?? 0}
                      </span>
                      <span className="task__subtask-info">
                        <MdPeople />
                        {taskItem?.vendors_count}
                      </span>
                    </Row>
                  </>
                )}
              </div>
              <Row>
                <Col
                  className="task-notes"
                  // span={24}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(
                      storeEditFunctionData({ ...taskItem, isTask: true })
                    );
                    dispatch(toggleFunctionNoteModal(true));
                  }}
                >
                  {taskItem?.note ? (
                    taskItem?.note === "<p></p>" ? (
                      "Add tasks' notes"
                    ) : (
                      <div className="">
                        {extractTextForHeader(taskItem?.note)}
                      </div>
                    )
                  ) : (
                    "Add tasks' notes"
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={3}>
              {showRightSection && !isEdit && (
                <Space className="task__collapse__right-section">
                  <Tooltip placement="top" title="Edit">
                    <Button
                      onClick={(e) => {
                        setIsEdit(true);
                        // nameInputRef?.current?.focus();
                        e.stopPropagation();
                      }}
                      type="ghost"
                      shape="circle"
                      className="right-button"
                      icon={<MdModeEditOutline color="#1890FF" />}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Delete">
                    <Button
                      onClick={(e) => {
                        handleDeleteTask(taskItem?.id);
                        e.stopPropagation();
                      }}
                      type="ghost"
                      shape="circle"
                      className="right-button"
                      icon={<MdDeleteOutline color="red" />}
                    />
                  </Tooltip>
                </Space>
              )}
            </Col>
          </Row>
          <Row></Row>
        </Col>
        <Col span={3} className="value">
          <AssignVendorComponent
            data={taskItem}
            disabled={isTaskComplete}
            handleVendorSelection={handleVendorSelection}
          />
        </Col>
        <Col span={3} className="value">
          <DueDateComponent
            data={taskItem}
            handleTaskInputChange={handleTaskInputChange}
            disabled={isTaskComplete}
            // disabledDate={(current?: any) => {
            //   let startDate: any = moment(functionItem.start_date).startOf('day');
            //   let endDate: any = moment(functionItem.end_date).endOf('day');
            //   return !(startDate.isSameOrBefore(current) && endDate.isAfter(current));
            // }}
          />
        </Col>
        <Col span={1} className="value">
          <PriorityComponent
            data={taskItem}
            handleTaskPriorityChange={handleTaskPriorityChange}
            disabled={isTaskComplete}
          />
        </Col>
        <Col span={1} className="value">
          <StatusComponent
            data={taskItem}
            handleTaskStatusChange={handleTaskStatusChange}
            disabled={isTaskComplete}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TaskNameComponent;
