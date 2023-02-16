import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

import { getAllEventsApi } from "../../services/events.service";

import {
  getSingleVendorApi,
  getAllTasksApi,
} from "../../services/vendors.service";

import { useAppDispatch } from "../../hooks/reduxHooks";

import VendorDetailsComponent from "../../components/vendorDetails";

interface VendorDetailsContainerInterface {}

const VendorDetailsContainer: React.FC<
  VendorDetailsContainerInterface
> = () => {
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = React.useState<Number>();

  const params = useParams();
  const id = params?.id;
  const [loading, setLoading] = useState(false);

  const [vendorDetailData, setVendorDetailData] = useState();

  const [vendorTasksData, setVendorTasksData] = useState();

  const [eventsData, setEventsData] = useState();

  const [eventName, setEventName] = useState();

  const [total, setTotal] = useState();

  const [per_page, setPer_page] = useState();
  const [filters, setFilters] = useState<any>();

  const dispatch = useAppDispatch();

  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      width: "20%",
    },
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      width: "20%",
      render: (event: any, data?: any) => {
        return (
          <>
            <Link to={`/events/${data?.eventId}`}>{event}</Link>
          </>
        );
      },
    },
    {
      title: "Function",
      dataIndex: "function",
      key: "function",
      width: "20%",
    },
    {
      title: "Venue",
      dataIndex: "venue",
      key: "venue",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: "10%",
    },
  ];

  useEffect(() => {
    setLoading(true);
    fetchVendorDetail();
    fetchVendorTasks({ page: undefined });
  }, [id]);

  const fetchVendorDetail = () => {
    dispatch(
      getSingleVendorApi({
        id: id,
        successCallback: (response: any) => {
          setVendorDetailData(response?.data);
        },
        finalCallback: () => {
          setLoading(false);
        },
      })
    );
  };

  const fetchVendorTasks = (obj: any) => {
    dispatch(
      getAllTasksApi({
        id: id,
        successCallback: (response: any) => {
          setVendorTasksData(response?.data?.data);
          setTotal(response?.data?.total);
          setPer_page(response?.data?.per_page);
        },
        finalCallback: () => {
          // setLoading(false);
        },
        pageSize: obj?.pageSize ?? window.DEFAULT_PAGE_SIZE,
        page: obj ? obj?.page : undefined,
        data: obj ? obj?.data : undefined,
      })
    );
  };

  // .....................................................................................................handleFilter

  const handleFilter = (val?: any) => {
    let obj = {
      task_name: val?.task_name,
      event_name: val?.event_name,
      status: val?.filter,
      start_date: val?.dueDate && moment(val?.dueDate[0]).format("YYYY-MM-DD"),
      end_date: val?.dueDate && moment(val?.dueDate[1]).format("YYYY-MM-DD"),
    };
    setFilters(obj);

    fetchVendorTasks({
      data: obj,
    });
  };

  const handleKeywordChange = (val: any) => {
    dispatch(
      getAllEventsApi({
        finalCallback: () => {
          setLoading(false);
        },
        successCallback: (val: any) => {
          setEventsData(val);
        },
        pageSize: undefined,
        page: undefined,
        data: { name: val },
        orderBy: undefined,
        order: undefined,
      })
    );
  };

  return (
    <VendorDetailsComponent
      loading={loading}
      vendorDetailData={vendorDetailData}
      vendorTasksData={vendorTasksData}
      columns={columns}
      total={total}
      per_page={per_page}
      fetchVendorTasks={fetchVendorTasks}
      filterForm={form}
      handleFilter={handleFilter}
      id={id}
      handleKeywordChange={handleKeywordChange}
      filters={filters}
      eventsData={eventsData}
      setEventsData={setEventsData}
      eventName={eventName}
      setFilters={setFilters}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    />
  );
};

export default VendorDetailsContainer;
