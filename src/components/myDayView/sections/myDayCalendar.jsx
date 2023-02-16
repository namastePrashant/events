import React, { useEffect, useState, useMemo } from "react";
import { Row, Button } from "antd";
import moment from "moment";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import _ from "lodash";

import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getCalendarViewApi } from "../../../services/myDay.service";

import { getSingleFunctionApi } from "../../../services/function.service";

import { toggleMyDayCalenderModal } from "../../../store/slice/togglers.slice";

import MyDayCalenderModal from "../../../components/common/modals/myDayCalender.modal";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {},
  });

const MyDayCalendar = (props) => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [monthlyData, setMonthlyData] = useState();

  const [newData, setNewData] = useState();

  const [singleFunctionData, setSingleFunctionData] = useState();

  const [monthlyArr, setMonthlyArr] = useState();

  const [loading, setLoading] = useState(false);
  const localizer = mLocalizer;
  const navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Assignee",
      // dataIndex: "name",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: "20%",
    },
    {
      title: "Due Date ",
      dataIndex: "due_date",
      width: "20%",
    },
  ];

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  useEffect(() => {
    setLoading(true);
    fetchCalendarData();
  }, [selectedDate]);

  useEffect(() => {
    let newArr = [];
    monthlyData?.forEach((monData) => {
      newArr.push({
        id: monData?.id,
        title: `${monData?.name} | ${monData?.event?.name ?? "N/A"}`,
        start: monData?.start_date,
        end: monData?.end_date,
        status: monData?.status,
        type: monData?.type,
        color_code: monData?.color_code,
      });
    });
    setMonthlyArr(newArr);
  }, [monthlyData]);

  const fetchCalendarData = () => {
    dispatch(
      getCalendarViewApi({
        finalCallback: () => {
          setLoading(false);
        },
        successCallback: (data) => {
          setMonthlyData(data);
        },
        data: {
          year: moment(selectedDate).format("YYYY"),
          month: moment(selectedDate).format("MM"),
        },
      })
    );
  };

  const eventPropGetter = (event) => {
    const backgroundColor = event?.color_code ?? "#B4BCC7";
    return { style: { backgroundColor } };
  };

  const CustomToolbar = (props) => {
    const { onNavigate, date } = props;

    const onNextMonth = () => {
      let newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      onNavigate("next", newDate);
    };

    const onPrevMonth = () => {
      let newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      onNavigate("prev", newDate);
    };

    const onToday = () => {
      let newDate = new Date();
      onNavigate("next", newDate);
    };

    return (
      <div className="calendar-toolbar">
        <Row justify="center">
          <Row className="buttons">
            <Button
              icon={<MdArrowBackIosNew />}
              onClick={() => onPrevMonth()}
            />
            <Button onClick={() => onToday()}>
              <h4>Today</h4>
            </Button>
            <Button
              icon={<MdArrowForwardIos />}
              onClick={() => onNextMonth()}
            />
          </Row>
          <h2>{moment(selectedDate).format("MMMM YYYY")}</h2>
        </Row>
      </div>
    );
  };

  return (
    <div className="my-day__calendar">
      <div className={loading ? "filtering" : null}>
        <div className="height600">
          <Calendar
            components={{
              toolbar: CustomToolbar,
            }}
            defaultDate={defaultDate}
            events={loading ? "" : monthlyArr}
            localizer={localizer}
            views={["month"]}
            showMultiDayTimes
            // views={views}
            popup
            eventPropGetter={eventPropGetter}
            onNavigate={(data) => {
              setSelectedDate(moment(data).format("YYYY-MM-DD"));
            }}
            onSelectEvent={(data) => {
              setNewData(data);
              dispatch(
                toggleMyDayCalenderModal({
                  showModal: true,
                })
              );

              const fetchSingleFunction = (id) => {
                dispatch(
                  getSingleFunctionApi({
                    id: id,
                    finalCallback: () => {},
                    successCallback: (data) => {
                      setSingleFunctionData(data);
                    },
                  })
                );
              };

              fetchSingleFunction(data?.id);
            }}
          />
          <MyDayCalenderModal
            data={newData}
            singleFunctionData={singleFunctionData}
          />
        </div>
      </div>
    </div>
  );
};

export default MyDayCalendar;
