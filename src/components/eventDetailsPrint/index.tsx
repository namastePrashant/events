import React, { useEffect, useState } from "react";
import moment from "moment";
import { Row, Col } from "antd";
import { BiRectangle, BiCheckSquare } from "react-icons/bi";
import { MdLocationOn, MdCalendarToday } from "react-icons/md";
import { BsCalendar4Week, BsPersonSquare } from "react-icons/bs";
import parse from "html-react-parser";

import { extractTextForHeader } from "../../utils/utilities";

interface EventDetailsPrintComponentInterface {
  data?: any;
  functionData?: any;
  functionId?: any;
}

const EventDetailsPrintComponent: React.FC<
  EventDetailsPrintComponentInterface
> = (props) => {
  const { data, functionData, functionId } = props;
  const [printShown, setPrintShown] = useState(false);

  const dateFormat = "Do MMM YYYY, hh:mm a";

  useEffect(() => {
    if (data) {
      setPrintShown(true);
    }
  }, [data]);

  useEffect(() => {
    if (printShown) {
      setTimeout(() => {
        window.print();
        window.close();
      }, 300);
    }
  }, [printShown]);

  return (
    <div className="print-container">
      <div className="main-title"> Clover Event Management</div>
      <h2 className="print-container__event-title">{data?.name}</h2>
      <Row align="middle" justify="space-between">
        {/* {functionId ?
          <></> :
          <span className="print-container__function-count"> {functionData?.length} functions</span>
        } */}
        <div className="print-container__date">
          <b>Start date</b>:{" "}
          {data?.start_date
            ? moment(data?.start_date).format(dateFormat)
            : "Start date N/A"}{" "}
          <br />
          <b>End date</b>:{" "}
          {data?.end_date
            ? moment(data?.end_date).format(dateFormat)
            : "End date N/A"}
        </div>
        <div className="print-container__client">
          <BsPersonSquare className="user" /> {data?.client_name}
        </div>
      </Row>
      <Row className="print-container__event-note">
        <span className="print-container__notes__title">
          Note:{" "}
        </span>
        <div className="ck-content">
          {data?.note ? parse(data?.note) : <></>}
        </div>
      </Row>
      <div>
        {functionData?.map((functionItem?: any, functionIndex?: any) => {
          return (
            <div className="print-container__functions">
              <div className="print-container__functions__header">
                <Row align="middle">
                  {functionItem?.status === "complete" ? (
                    <BiCheckSquare size={22} className="checkbox" />
                  ) : (
                    <BiRectangle size={25} className="checkbox" />
                  )}
                  <h3 className="print-container__functions__name">
                    {functionItem?.name}
                  </h3>

                  {/* <div className="print-container__venue">
                    <MdLocationOn />{" "}
                    {functionItem?.venue ?? <i>Venue not set</i>}
                  </div> */}
                </Row>
                <div className="print-container__functions__date">
                  <BsCalendar4Week className="icon" />{" "}
                  {functionItem?.start_date
                    ? moment(functionItem?.start_date).format(dateFormat)
                    : "Start date N/A"}{" "}
                  to{" "}
                  {functionItem?.end_date
                    ? moment(functionItem?.end_date).format(dateFormat)
                    : "End date N/A"}
                </div>
                <div className="print-container__venue">
                  <MdLocationOn className="icon" />{" "}
                  {functionItem?.venue?.name ?? <i>Venue not set</i>}
                </div>
                <div className="print-container__notes">
                  <Row>
                    <span className="print-container__notes__title">
                      Note:{" "}
                    </span>
                    {/* {extractTextForHeader(functionItem?.note)} */}
                    <div className="print-container__parsed-html ck-content">
                      {functionItem?.note ? parse(functionItem?.note) : ""}
                    </div>
                  </Row>
                </div>
              </div>

              {functionItem?.tasks?.length > 0 ?
                <div className="print-container__functions__tasks">
                  <Row className="task-label">
                    <Col span={16} className="label">
                      {functionItem?.tasks?.length
                        ? functionItem?.tasks?.length + " tasks"
                        : ""}
                    </Col>
                    <Col span={3} className="label">
                      Assignee
                    </Col>
                    <Col span={3} className="label">
                      Due Date
                    </Col>
                    <Col span={2} className="label">
                      Priority
                    </Col>
                    {/* <Col span={2} className="label">
                    Status
                  </Col> */}
                  </Row>
                  {functionItem?.tasks?.map((taskItem?: any, taskIndex?: any) => {
                    return (
                      <li className="print-container__functions__task">
                        <Row>
                          <Col span={16} className="value">
                            <Row align="middle">
                              {taskItem?.status === "complete" ? (
                                <BiCheckSquare size={22} className="checkbox" />
                              ) : (
                                <BiRectangle size={22} className="checkbox" />
                              )}
                              {taskItem?.name}
                            </Row>

                          </Col>
                          <Col span={3} className="value">
                            {taskItem?.vendor ? taskItem?.vendor?.name : ""}
                          </Col>
                          <Col span={3} className="value">
                            {taskItem?.due_date
                              ? moment(taskItem?.due_date).format("YYYY-MM-DD")
                              : ""}
                          </Col>
                          <Col span={2} className="value">
                            {taskItem?.Priority === "high" ? "High" : "Normal"}
                          </Col>
                          {/* <Col span={2} className="value">
                          {taskItem?.status}
                        </Col> */}
                        </Row>
                        <div className="print-container__notes">
                          <Row>
                            <span className="print-container__notes__title">
                              Note:{" "}
                            </span>
                            {/* {extractTextForHeader(taskItem?.note)} */}
                            <div className="print-container__parsed-html">
                              {taskItem?.note ? parse(taskItem?.note) : ""}
                            </div>
                          </Row>
                        </div>

                        <div className="print-container__subtasks">
                          <span className="label title">
                            {taskItem?.subtasks?.length
                              ? taskItem?.subtasks?.length + " subtasks"
                              : ""}
                          </span>
                          {taskItem?.subtasks?.map(
                            (subtaskItem?: any, subtaskIndex?: any) => {
                              return (
                                <li className="print-container__subtask">
                                  <Row align="top">
                                    <Col
                                      span={16}
                                      className="value print-container__subtask__name"
                                    >
                                      <Row>
                                        {subtaskItem?.status === "complete" ? (
                                          <BiCheckSquare
                                            size={22}
                                            className="checkbox"
                                          />
                                        ) : (
                                          <BiRectangle
                                            size={22}
                                            className="checkbox"
                                            color="#8A8D91"
                                          />
                                        )}
                                        {subtaskItem?.name}
                                      </Row>

                                    </Col>
                                    <Col span={3} className="value">
                                      {subtaskItem?.vendor
                                        ? subtaskItem?.vendor?.name
                                        : ""}
                                    </Col>
                                    <Col span={3} className="value">
                                      {subtaskItem?.due_date
                                        ? moment(subtaskItem?.due_date).format(
                                          "YYYY-MM-DD"
                                        )
                                        : ""}
                                    </Col>
                                    <Col span={2} className="value">
                                      {subtaskItem?.Priority === "high"
                                        ? "High"
                                        : "Normal"}
                                    </Col>
                                    {/* <Col span={2} className="value">
                                  {subtaskItem?.status}
                                </Col> */}
                                  </Row>
                                  <div className="print-container__notes">
                                    <Row>
                                      <span className="print-container__notes__title">
                                        Note:{" "}
                                      </span>
                                      {/* {extractTextForHeader(taskItem?.note)} */}
                                      <div className="print-container__parsed-html ck-content">
                                        {subtaskItem?.note
                                          ? parse(subtaskItem?.note)
                                          : ""}
                                      </div>
                                    </Row>
                                  </div>
                                </li>
                              );
                            }
                          )}
                        </div>
                      </li>
                    );
                  })}
                </div>
                : <></>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventDetailsPrintComponent;
