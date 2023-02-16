import React, { useState, useEffect } from "react";
import { Row, Col, Space, Tooltip, Input, Button } from "antd";
import { MdDeleteOutline, MdModeEditOutline, MdInbox } from "react-icons/md";
import _ from "lodash";

import PriorityComponent from "./priorityComponent";
import DueDateComponent from "./dueDateComponent";
import AssignVendorComponent from "./assignVendorComponent";
import StatusComponent from "./statusComponent";
import {
  toggleFunctionNoteModal,
  storeEditFunctionData,
} from "../../../store/slice/togglers.slice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { extractTextForHeader } from "../../../utils/utilities";

interface SubTaskHeaderInterface {
  subTask?: any;
  handleDeleteTask?: any;
  handleTaskInputChange?: any;
  handleTaskPriorityChange?: any;
  handleTaskStatusChange?: any;
  handleVendorSelection?: any
}

const SubTaskHeader: React.FC<SubTaskHeaderInterface> = (props) => {
  const {
    subTask,
    handleDeleteTask,
    handleTaskInputChange,
    handleTaskPriorityChange,
    handleTaskStatusChange,
    handleVendorSelection
  } = props;
  const [showRightSection, setShowRightSection] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [nameValue, setNameValue] = useState(subTask?.name);
  const [isSubtaskComplete, setIsSubtaskComplete] = useState(
    subTask?.status === "complete"
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setNameValue(subTask?.name);
    setIsSubtaskComplete(subTask?.status === "complete");
  }, [subTask]);

  return (
    <li className="draggable-li">
      <Row>
        <Col
          span={15}
          className="value"
          onMouseOver={(e) => {
            if (isSubtaskComplete) {
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
          <Row>
            <Col span={17} className="subTaskHeader__col">
              {isEdit ? (
                <Row>
                  <Col span={18}>
                    <Input
                      placeholder="New Task"
                      value={nameValue}
                      onBlur={(e) => {
                        handleTaskInputChange({
                          name: "name",
                          value: nameValue,
                          data: subTask,
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
                  </Col>
                  <Col span={6}>
                    <Button
                      onClick={(e) => {
                        handleTaskInputChange({
                          name: "name",
                          value: nameValue,
                          data: subTask,
                        });
                        setIsEdit(false);
                        e.stopPropagation();
                      }}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              ) : (
                <>
                  <MdInbox color="#B4BCC7" className="icon" />
                  <span
                    className={`title ${isSubtaskComplete ? "strike" : ""}`}
                  >
                    {_.upperFirst(nameValue)}
                  </span>
                </>
              )}
            </Col>
            <Col span={7}>
              {showRightSection && !isEdit && (
                <Space>
                  <Tooltip placement="top" title="Edit">
                    <Button
                      onClick={(e) => {
                        setIsEdit(true);
                        e.stopPropagation();
                      }}
                      type="text"
                      icon={<MdModeEditOutline color="#1890FF" />}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Delete">
                    <Button
                      onClick={(e) => {
                        handleDeleteTask(subTask?.id);
                        e.stopPropagation();
                      }}
                      type="text"
                      icon={<MdDeleteOutline color="red" />}
                    />
                  </Tooltip>
                </Space>
              )}
            </Col>
          </Row>
          <Row>
            <Col
              className="sub-task-notes"
              // span={24}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  storeEditFunctionData({ ...subTask, isSubTask: true })
                );
                dispatch(toggleFunctionNoteModal(true));
              }}
            >
              {subTask?.note ?
                subTask?.note === '<p></p>' ?
                  "Add subtasks' notes" :
                  (
                    <div className="header-parsed-html">
                      {extractTextForHeader(subTask?.note)}
                    </div>
                  ) : (
                  "Add subtasks' notes"
                )}
            </Col>
          </Row>
        </Col>
        <Col span={4} className="value">
          <AssignVendorComponent
            data={subTask}
            disabled={isSubtaskComplete}
            isSubTask
            handleVendorSelection={handleVendorSelection}
          />
        </Col>
        <Col span={3} className="value">
          <DueDateComponent
            data={subTask}
            disabled={isSubtaskComplete}
            isSubTask
            handleTaskInputChange={handleTaskInputChange}
          />
        </Col>
        <Col span={1} className="value">
          <PriorityComponent
            data={subTask}
            disabled={isSubtaskComplete}
            isSubTask
            handleTaskPriorityChange={handleTaskPriorityChange}
          />
        </Col>
        <Col span={1} className="value">
          <StatusComponent
            disabled={isSubtaskComplete}
            data={subTask}
            isSubTask
            handleTaskStatusChange={handleTaskStatusChange}
          />
        </Col>
      </Row>
    </li>
  );
};

export default SubTaskHeader;
