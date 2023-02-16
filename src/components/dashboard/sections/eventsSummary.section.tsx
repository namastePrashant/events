import React from "react";
import { Row, Col } from "antd";
import { MdEvent, MdFreeCancellation } from "react-icons/md";

import EventSummaryCard from "../../common/cards/eventSummaryCard";

interface EventsSummarySectionInterface {
  data?: any;
}

const EventsSummarySection: React.FC<EventsSummarySectionInterface> = (
  props
) => {
  const { data } = props;

  return (
    <div className="card event-summary">
      <div className="eventSummary-heading">
        <h3>Event Summary</h3>
        <div className="eventSummary-title">
          (Total : {data?.total ?? 0})
        </div>
      </div>
      <div className="stats">
        <Row gutter={20}>
          <Col span={8}>
            <EventSummaryCard
              title="Upcoming Events"
              count={data?.upcoming ?? 0}
              icon={MdEvent}
              filter="upcoming"
            />
          </Col>
          <Col span={8}>
            <EventSummaryCard
              title="Ongoing Events"
              count={data?.ongoing ?? 0}
              icon={MdFreeCancellation}
              filter="ongoing"
            />
          </Col>
          <Col span={8}>
            <EventSummaryCard
              title="Completed Events"
              count={data?.complete ?? 0}
              icon={MdFreeCancellation}
              filter="completed"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EventsSummarySection;
