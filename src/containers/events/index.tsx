import React, { useState, useEffect } from "react";
import { Popover, Space, Popconfirm, Form } from "antd";
import { MdBookmark } from "react-icons/md";
import { defaultEventColors } from "../../constants/colorPalette.constant";
import moment from "moment";
import {
  EditFilled,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import _ from "lodash";

import EventsComponent from "../../components/events";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getAllEventsApi,
  deleteEventsApi,
  favoriteEventApi,
  getAllFavoriteEventsApi,
} from "../../services/events.service";

interface EventsContainerInterface {
  data?: any;
  page?: any;
  doTypeExist?: boolean;
}

const EventsContainer: React.FC<EventsContainerInterface> = (props) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const state = useAppSelector((state) => state);
  const { events } = state.events;
  const [filters, setFilters] = useState<any>();
  const [currentPage, setCurrentPage] = React.useState<Number>();

  const { doTypeExist } = props;

  // our data source
  const { pageSize } = state.events;
  const { total } = state.events;

  const navigate = useNavigate();
  const params = useParams();

  const filter = params?.filter;

  const columns = [
    {
      title: "Event",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: true,
      render: (name: any, data: any) => {
        return (
          <div className="event_eventName">
            <MdBookmark
              className="eventBookmark"
              color={data?.color_code ?? defaultEventColors}
            />
            <NavLink to={`/events/${data?.id}`}>{name}</NavLink>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
      key: "category",
      width: "10%",
    },
    {
      title: "Ethnicity",
      dataIndex: "ethnicity",
      key: "ethnicity",
      width: "10%",
      sorter: true,
    },
    {
      title: "Client",
      dataIndex: "client_name",
      sorter: true,
      key: "client_name",
      width: "20%",
      render: (client: any, data: any) => {
        return (
          <>
            <Popover
              content={
                <>
                  <h4 className="events-columns-popover-h4">
                    Mobile Number:{" "}
                    {data?.client?.mobile === "null" || undefined
                      ? "N/A"
                      : data?.client?.mobile}{" "}
                  </h4>
                  <h4 className="events-columns-popover-h4">
                    Address:{" "}
                    {data?.client?.address === "null" || undefined
                      ? "N/A"
                      : data?.client?.address}
                  </h4>
                  <h4 className="events-columns-popover-h4">
                    Email:{" "}
                    {data?.client?.email === "null" || undefined
                      ? "N/A"
                      : data?.client?.email}
                  </h4>
                </>
              }
              title={
                data?.client?.name === "null" || undefined
                  ? "N/A"
                  : data?.client?.name
              }
            >
              <h4>
                {data?.client?.name === "null" || undefined
                  ? "N/A"
                  : data?.client?.name}
              </h4>
            </Popover>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "type",
      key: "type",
      width: "10%",
      render: (type: any) => {
        return <>{_.upperFirst(type)}</>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      sorter: true,
      key: "start_date",
      width: "10%",
      render: (start_date: any) => {
        return <>{moment(start_date).format("YYYY-MM-DD")}</>;
      },
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      width: "10%",
      sorter: true,
      render: (end_date: any) => {
        return <>{moment(end_date).format("YYYY-MM-DD")}</>;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "5%",
      render: (text: any, record: any) => {
        return (
          <Space size="middle">
            {record?.type !== "completed" && record?.is_favourite ? (
              <HeartFilled
                onClick={() => {
                  handleFavoriteEvent(record?.id);
                }}
              />
            ) : (
              <Popover
                trigger="click"
                content={
                  record?.type === "completed" ? (
                    <>This event is already completed.</>
                  ) : undefined
                }
              >
                <HeartOutlined
                  onClick={() => {
                    record?.type !== "completed" &&
                      handleFavoriteEvent(record?.id);
                  }}
                />
              </Popover>
            )}
            <EditFilled
              onClick={() => {
                navigate(`/events/${text?.id}/edit`, { state: record });
              }}
            />
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                handleDelete(text?.id);
              }}
            >
              <DeleteFilled />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleFavoriteEvent = (id?: number) => {
    dispatch(
      favoriteEventApi({
        id: id,
        finalCallback: () => {},
        successCallback: () => {
          fetchAllFavoriteEvents();
          fetchEvents(filters);
        },
      })
    );
  };

  const fetchAllFavoriteEvents = () => {
    dispatch(
      getAllFavoriteEventsApi({
        finalCallback: () => {},
      })
    );
  };

  const fetchEvents = (obj?: any) => {
    setLoading(true);
    setFilters(obj);
    dispatch(
      getAllEventsApi({
        finalCallback: () => {
          setLoading(false);
        },
        successCallback: () => {},
        pageSize: obj?.pageSize ?? window.DEFAULT_PAGE_SIZE,
        page: obj ? obj?.page : undefined,
        data: obj ? obj?.data : undefined,
        orderBy: obj ? obj?.orderBy : undefined,
        order: obj ? obj?.order : undefined,
      })
    );
  };

  useEffect(() => {
    if (doTypeExist) {
      let obj = { filter: filter };
      fetchEvents({
        data: obj,
        page: undefined,
      });

      form.setFieldsValue({
        filter: filter,
      });
    } else {
      fetchEvents();
      form.setFieldsValue({
        filter: "All",
      });
    }

    // fetchEvents();
  }, []);

  const handleDelete = (id: number) => {
    dispatch(
      deleteEventsApi({
        id: id,
        finalCallback: () => {},
        successCallback: () => {
          fetchEvents();
        },
      })
    );
  };

  const handleFilter = (val?: any) => {
    let obj = {
      name: val?.name,
      start_date: val?.range && moment(val?.range[0]).format("YYYY-MM-DD"),
      end_date: val?.range && moment(val?.range[1]).format("YYYY-MM-DD"),
      filter: val?.filter,
    };

    fetchEvents({
      data: obj,
    });
  };

  const handleClear = () => {
    form.resetFields();
    fetchEvents({
      data: undefined,
    });
    setCurrentPage(1);
  };

  return (
    <EventsComponent
      data={events}
      columns={columns}
      loading={loading}
      handleFilter={handleFilter}
      handleClear={handleClear}
      filterForm={form}
      fetchEvents={fetchEvents}
      pageSize={pageSize}
      total={total}
      filter={filter}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default EventsContainer;
