import React, { useState, useEffect } from "react";
import {
  Segmented,
  List,
  Badge,
  Collapse,
  Row,
  Col,
  Skeleton,
  Tooltip,
} from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import _ from "lodash";

import {
  getAllWorkListApi,
  getTaskSummaryApi,
} from "../../../services/myDay.service";
import { useAppDispatch } from "../../../hooks/reduxHooks";

interface WorklistInterface {
  selectedDate?: any;
}

const { Panel } = Collapse;

const Worklist: React.FC<WorklistInterface> = (props) => {
  const [activeSegment, setActiveSegment] = useState<any>("ToDo");

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [counter, setCounter] = useState<any>({});
  const { selectedDate } = props;

  useEffect(() => {
    fetchWorklist();
    fetchTaskSummary();
  }, [activeSegment, selectedDate]);

  const fetchWorklist = () => {
    setLoading(true);
    dispatch(
      getAllWorkListApi({
        finalCallback: () => {
          setLoading(false);
        },
        successCallback: (data: any) => {
          setData(data);
        },
        data: {
          type: activeSegment?.toLowerCase(),
          date: moment(selectedDate)?.format("YYYY-MM-DD"),
        },
      })
    );
  };

  const fetchTaskSummary = () => {
    dispatch(
      getTaskSummaryApi({
        finalCallback: () => { },
        successCallback: (data: any) => {
          setCounter(data);
        },
        data: {
          date: moment(selectedDate)?.format("YYYY-MM-DD"),
        },
      })
    );
  };

  return (
    <div className="worklist">
      <div className="worklist__segment">
        <Segmented
          options={[
            {
              // label: "To-Do",
              value: "To-Do",
              icon: (
                <div className="worklist--worklist__segment__to-do-icon">
                  <h4>To-Do</h4>
                  <Badge
                    className="worklist__segment__badge"
                    showZero
                    count={counter.todo}
                    offset={[-1, -3]}
                  />
                </div>
              ),
            },
            {
              value: "Ongoing",
              icon: (
                <div className="worklist--worklist__segment__Ongoing-icon">
                  <h4>Ongoing</h4>
                  <Badge
                    className="worklist__segment__badge"
                    showZero
                    count={counter.ongoing}
                    offset={[-1, -3]}
                  />
                </div>
              ),
            },
            {
              value: "Done",
              icon: (
                <div className="worklist--worklist__segment__Done-icon">
                  <h4>Done</h4>
                  <Badge
                    className="worklist__segment__badge"
                    showZero
                    count={counter.complete}
                    offset={[-1, -3]}
                  />
                </div>
              ),
            },
          ]}
          onChange={(val) => {
            setActiveSegment(val?.toString().replace(/-/g, ""));
          }}
        />
      </div>
      <div className="data">
        {loading ? (
          <Skeleton />
        ) : data?.length === 0 ? (
          <>No records found on current day selection.</>
        ) : (
          <Collapse
            className="data-collapse"
            expandIcon={({ isActive }) => <></>}
          >
            {data?.map((worklistData?: any, worklistIndex?: any) => {
              return (
                <Panel
                  header={
                    <>
                      <Row align='middle'>
                        <Col span={21}>
                          <div className="data-panel-header" />
                          {worklistData?.name}
                          <br />
                          {worklistData?.category} -{" "}
                          {worklistData?.tasks?.length} tasks
                        </Col>
                        <Col span={3}>
                          <NavLink to={`/events/${worklistData?.id}`}>
                            View Event
                          </NavLink>
                        </Col>
                      </Row>
                    </>
                  }
                  key={worklistIndex}
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={worklistData?.tasks ?? []}
                    renderItem={(item?: any) => {
                      return (
                        <>
                          <List.Item className="worklist-list-item">
                            <List.Item.Meta
                              avatar={
                                <div className="worklist-list-item--avatar" />
                              }
                              title={
                                <>

                                  {item?.name} ({item?.function?.name}) -{" "}
                                  <Tooltip title="Due Date" >
                                    <span className="redDuedate">
                                      {item?.due_date === null
                                        ? "Not Set"
                                        : moment(item?.due_date).format(
                                          "YYYY-MM-DD"
                                        )}
                                    </span>
                                  </Tooltip>
                                </>
                              }
                              description={
                                <>
                                  {item?.vendor ? (
                                    `Assigned to ${item?.vendor?.name}`
                                  ) : (
                                    <i>Vendor Not assigned</i>
                                  )}
                                </>
                              }
                            />
                          </List.Item>
                        </>
                      );
                    }}
                  />
                </Panel>
              );
            })}
          </Collapse>
        )}
      </div>
    </div>
  );
};

export default Worklist;
