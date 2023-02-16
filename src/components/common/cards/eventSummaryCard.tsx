import React from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getAllEventsApi } from "../../../services/events.service";

interface EventSummaryCardInterface {
  title?: string;
  icon?: any;
  count?: number;
  filter?: string;
}

const EventSummaryCard: React.FC<EventSummaryCardInterface> = (props) => {
  const { title, icon: Icon, count, filter } = props;

  const navigate = useNavigate();

  return (
    <div className="event-card">
      <div className="title">{title}</div>
      <Row align="middle" className="middle-section">
        <Icon className="icon" />
        <div className="count">{count}</div>
      </Row>
      <div>
        <Button
          className="app-btn"
          block
          onClick={() => {
            navigate(`./events/type=${filter}`);
          }}
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export default EventSummaryCard;
