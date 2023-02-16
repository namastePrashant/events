import React from "react";
import { Calendar, Typography } from "antd";
import { Row, Button } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import moment from "moment";

interface CalendarInterface {
  handleDateSelection?: any;
  selectedMyDate?: any;
  defaultValue?: any;
  onNextMonth?: any;
  onPrevMonth?: any;
  onToday?: any;
}

const SmallCalendar: React.FC<CalendarInterface> = (props) => {
  const {
    handleDateSelection,
    selectedMyDate,
    defaultValue,
    onNextMonth,
    onPrevMonth,
    onToday,
  } = props;

  const headerRender = () => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            right: "30px",
            top: "10px",
          }}
        >
          <Row justify="center">
            <Row className="buttons">
              <Button
                icon={<MdArrowBackIosNew />}
                onClick={() => onPrevMonth()}
              />
              <Button onClick={() => onToday()}>
                <h4 style={{ marginTop: "auto", marginBottom: "auto" }}>
                  Today
                </h4>
              </Button>
              <Button
                icon={<MdArrowForwardIos />}
                onClick={() => onNextMonth()}
              />
            </Row>
          </Row>
        </div>
      </>
    );
  };

  return (
    <div className="card">
      <Typography.Title level={4}>
        {moment(selectedMyDate).format("MMMM YYYY")}
      </Typography.Title>
      <Calendar
        fullscreen={false}
        value={moment(selectedMyDate)}
        headerRender={headerRender}
        onSelect={(val: any) => handleDateSelection(val)}
      />
    </div>
  );
};

export default SmallCalendar;
