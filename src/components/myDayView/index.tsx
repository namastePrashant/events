import React, { useState } from "react";
import { Row, Col, Tabs } from "antd";
import { MdFeaturedPlayList, MdOutlineEventNote } from "react-icons/md";
import { useLocation } from "react-router-dom";

import MyDayCalendar from "./sections/myDayCalendar";
import MyDayWorklist from "./sections/worklist";
import SmallCalendar from "./sections/calendar";

const { TabPane } = Tabs;

interface MyDayViewComponentInterface {}

const MyDayViewComponent: React.FC<MyDayViewComponentInterface> = () => {
  const [activeTab, setActiveTab] = useState<any>(1);
  const locations: any = useLocation();
  const [selectedMyDate, setMyDayDate] = useState(locations?.state?.date);

  const onNextMonth = () => {
    let newDate =
      selectedMyDate === undefined
        ? new Date(new Date().getFullYear(), new Date().getMonth() + 1)
        : new Date(selectedMyDate.getFullYear(), selectedMyDate.getMonth() + 1);

    setMyDayDate(newDate);
  };

  const onPrevMonth = () => {
    let newDate =
      selectedMyDate === undefined
        ? new Date(new Date().getFullYear(), new Date().getMonth() - 1)
        : new Date(selectedMyDate.getFullYear(), selectedMyDate.getMonth() - 1);

    setMyDayDate(newDate);
  };

  const onToday = () => {
    let newDate = new Date();

    setMyDayDate(newDate);
  };

  const onChange = (key: any) => {
    setActiveTab(parseInt(key));
  };

  const handleDateSelection = (val: any) => {
    let date = val.toDate();

    setMyDayDate(date);
  };

  return (
    <Row className="my-day" gutter={20}>
      <Col
        xs={24}
        md={activeTab === 1 ? 12 : 24}
        lg={activeTab === 1 ? 14 : 24}
        xl={activeTab === 1 ? 16 : 24}
        className="card"
      >
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane
            tab={
              <>
                <MdFeaturedPlayList />
                <span className="my-day__title">Work List</span>
              </>
            }
            key="1"
          >
            <MyDayWorklist selectedDate={selectedMyDate} />
          </TabPane>
          <TabPane
            tab={
              <>
                <MdOutlineEventNote />
                <span className="my-day__title">Calendar</span>
              </>
            }
            key="2"
          >
            <MyDayCalendar />
          </TabPane>
        </Tabs>
      </Col>
      <Col
        xs={24}
        md={activeTab === 1 ? 12 : 0}
        lg={activeTab === 1 ? 10 : 0}
        xl={activeTab === 1 ? 8 : 0}
      >
        {activeTab === 1 ? (
          <>
            <SmallCalendar
              handleDateSelection={handleDateSelection}
              selectedMyDate={selectedMyDate}
              onNextMonth={onNextMonth}
              onPrevMonth={onPrevMonth}
              onToday={onToday}
            />
          </>
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
};

export default MyDayViewComponent;
