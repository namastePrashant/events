import React, { useState } from "react";
import {
  MdFormatListBulleted,
  MdPeople,
  MdDeleteOutline,
  MdDoneAll,
  MdEdit,
  MdLocationOn,
} from "react-icons/md";
import { IoMdPrint } from "react-icons/io";

import { Row, Col, Button, Popconfirm, DatePicker, Popover } from "antd";
import ProgressComponent from "../../common/progress/progress.component";
import moment from "moment";

import {
  toggleFunctionNoteModal,
  toggleFunctionCreateModal,
} from "../../../store/slice/togglers.slice";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { extractTextForHeader } from "../../../utils/utilities";

interface FunctionHeaderComponentInterface {
  handleFunctionDateSelection?: any;
  functionItem?: any;
  handleCreateNewTask?: any;
  functionIndex?: any;
  storeEditFunctionData?: any;
  handleDeleteFunction?: any;
  handleFunctionStatusChange?: any;
  setActiveKey?: any;
  setNewTaskFunctionId?: any;
  newTaskFunctionId?: any;
  eventData?: any;
}

const FunctionHeaderComponent: React.FC<FunctionHeaderComponentInterface> = (
  props
) => {
  const {
    functionItem,

    storeEditFunctionData,
    handleDeleteFunction,
    handleFunctionStatusChange,
    eventData,
  } = props;
  const [showRightSection, setShowRightSection] = useState(false);
  const dispatch = useAppDispatch();
  const isFunctionComplete = functionItem?.status === "complete";

  return (
    <div
      className="function-card__collapse__header"
      onMouseOver={() => setShowRightSection(true)}
      onMouseOut={() => setShowRightSection(false)}
    >
      <Col span={23}>
        <Row>
          <ProgressComponent
            format={
              <>
                <Button
                  type="link"
                  onClick={(e) => {
                    dispatch(
                      storeEditFunctionData({
                        event: eventData,
                        ...functionItem,
                      })
                    );
                    dispatch(
                      toggleFunctionCreateModal({
                        showModal: true,
                        isEdit: true,
                      })
                    );
                    e.stopPropagation();
                  }}
                >
                  {functionItem?.start_date ? (
                    <>
                      <div>
                        {moment(functionItem?.start_date).format("D MMM")}
                        {" - "}
                      </div>

                      <div>
                        {moment(functionItem?.end_date).format("D MMM")}
                      </div>
                    </>
                  ) : (
                    "Set"
                  )}
                </Button>
              </>
            }
            className="function-card__collapse__progress"
            percent={
              functionItem?.status === "complete"
                ? 100
                : (functionItem?.complete_tasks_count /
                    functionItem?.tasks?.length) *
                  100
            }
            strokeColor={
              functionItem?.color_code
                ? {
                    "0%": functionItem?.color_code[0],
                    "100%": functionItem?.color_code[1],
                  }
                : undefined
            }
          />

          <div className="function-card__collapse__date for-print">
            {functionItem?.start_date
              ? moment(functionItem?.start_date).format("YYYY-MM-DD")
              : undefined}{" "}
            -{" "}
            {functionItem?.end_date
              ? moment(functionItem?.end_date).format("YYYY-MM-DD")
              : undefined}
          </div>
          <div>
            <Row>
              <span className={`title ${isFunctionComplete ? "strike" : ""}`}>
                {functionItem?.name}
              </span>
              <Row className="function-card__collapse__header__buttons-row">
                <Button
                  type="link"
                  onClick={(e) => {
                    dispatch(
                      storeEditFunctionData({
                        event: eventData,
                        ...functionItem,
                      })
                    );
                    dispatch(
                      toggleFunctionCreateModal({
                        showModal: true,
                        isEdit: true,
                      })
                    );
                    e.stopPropagation();
                  }}
                  className="function-card__buttons"
                >
                  <MdEdit />
                  Edit
                </Button>
                <span className="function-card__buttons">
                  <MdFormatListBulleted />
                  {functionItem?.complete_tasks_count}/
                  {functionItem?.tasks?.length ?? 0}
                </span>
                <span className="function-card__buttons">
                  <MdPeople />
                  {functionItem?.vendors_count}
                </span>
                <Popover
                  content={
                    <>
                      {functionItem?.venue ? (
                        <>
                          <li>{functionItem?.venue?.name}</li>
                          {functionItem?.venue?.address ? (
                            <li>
                              <strong>Address: </strong>
                              {functionItem?.venue?.address}
                            </li>
                          ) : (
                            <></>
                          )}
                          {functionItem?.venue?.contact_person ? (
                            <li>
                              <strong>Contact person: </strong>
                              {functionItem?.venue?.contact_person}
                            </li>
                          ) : (
                            <></>
                          )}
                          {functionItem?.venue?.phone ? (
                            <li>
                              <strong>Phone: </strong>
                              {functionItem?.venue?.phone}
                            </li>
                          ) : (
                            <></>
                          )}
                          {functionItem?.venue?.email ? (
                            <li>
                              <strong>Email: </strong>
                              {functionItem?.venue?.email}
                            </li>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <i>Not set</i>
                      )}
                    </>
                  }
                  title={<strong>Venue</strong>}
                >
                  <span className="function-card__buttons">
                    <MdLocationOn color="#BDC4CE" />
                    <span className="venue">
                      {functionItem?.venue?.name ?? "Venue not set"}
                    </span>
                  </span>
                </Popover>
                <Button
                  type="link"
                  onClick={(e) => {
                    window.open(
                      `/events/${functionItem?.event_id}/print/${functionItem?.id}`
                    );
                    e.stopPropagation();
                  }}
                  className="function-card__buttons"
                >
                  <IoMdPrint />
                  Print
                </Button>
                {isFunctionComplete ? (
                  <Button
                    type="link"
                    className="function-card__buttons done-btn"
                    onClick={(e) => {
                      handleFunctionStatusChange({
                        function_id: functionItem?.id,
                        status: "incomplete",
                      });
                      e.stopPropagation();
                    }}
                  >
                    <MdDoneAll color="rgb(28, 214, 28)" />
                    Done
                  </Button>
                ) : (
                  <Button
                    type="link"
                    onClick={(e) => {
                      handleFunctionStatusChange({
                        function_id: functionItem?.id,
                        status: "complete",
                      });
                      e.stopPropagation();
                    }}
                    className="function-card__buttons"
                  >
                    <MdDoneAll />
                    Mark as done
                  </Button>
                )}
              </Row>
            </Row>
            <Row>
              <Col
                span={10}
                className="function-card__collapse__header__notes"
                onClick={(e) => {
                  dispatch(
                    storeEditFunctionData({ event: eventData, ...functionItem })
                  );
                  dispatch(
                    storeEditFunctionData({ event: eventData, ...functionItem })
                  );
                  dispatch(toggleFunctionNoteModal(true));
                  e.stopPropagation();
                }}
              >
                {functionItem?.note ? (
                  functionItem?.note === "<p></p>" ? (
                    <span>Add function note</span>
                  ) : (
                    extractTextForHeader(functionItem?.note)
                  )
                ) : (
                  <span>Add function note</span>
                )}
              </Col>
            </Row>
          </div>
        </Row>
      </Col>

      {showRightSection && (
        <Col className="right-section" span={1}>
          <Row>
            <Popconfirm
              placement="topLeft"
              title={"Are you sure you want to delete this function?"}
              // onConfirm={confirm}
              onConfirm={(e: any) => {
                handleDeleteFunction(functionItem?.id);
                e.stopPropagation();
              }}
              onCancel={(e: any) => {
                e.stopPropagation();
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="ghost"
                shape="circle"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="delete-btn"
                icon={<MdDeleteOutline color="red" size={22} />}
              />
            </Popconfirm>
          </Row>
        </Col>
      )}
    </div>
  );
};

export default FunctionHeaderComponent;
