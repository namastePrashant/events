import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

interface TotalEventsSectionInterface {
  data?: any;
}

const TotalEventsSection: React.FC<TotalEventsSectionInterface> = (props) => {
  const { data } = props;
  return (
    <div className="card total-events">
      <h3>Total Events</h3>
      {/* <BsFillCheckCircleFill /> */}
      <h1>{data?.total ?? 0}</h1>
      {/* <h3 className="status">Completed</h3> */}
    </div>
  );
};

export default TotalEventsSection;
