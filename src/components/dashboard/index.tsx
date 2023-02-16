import React from "react";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useAppSelector } from "../../hooks/reduxHooks";
import EventsSummarySection from "./sections/eventsSummary.section";
import RecentEventsSection from "./sections/recentEvents.section";
import TaskListComponent from "./sections/newTasklist.section";

interface DashboardComponentInterface {}

const DashboardComponent: React.FC<DashboardComponentInterface> = () => {
  const state = useAppSelector((state) => state);
  const { summary, recentEvents } = state.events;
  const navigate = useNavigate();

  return (
    <Row className="dashboard" gutter={20}>
      <Col span={18}>
        <EventsSummarySection data={summary} />
        <RecentEventsSection data={recentEvents} />
      </Col>
      <Col span={6}>
        {/* <TasklistSection /> */}
        <TaskListComponent
          day={"today"}
          onSeeMoreClick={() => {
            navigate("/my-day", {
              state: {
                date: moment().format(),
              },
            });
          }}
        />
        <TaskListComponent
          day={"tomorrow"}
          onSeeMoreClick={() => {
            navigate("/my-day", {
              state: {
                date: moment().add(1, "days").format(),
              },
            });
          }}
        />
      </Col>
    </Row>
  );
};

export default DashboardComponent;
