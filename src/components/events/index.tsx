import {
  Table,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Button,
  Select,
  Pagination,
} from "antd";
import React from "react";
import debounce from "lodash/debounce";
import { getDashboardTasksApi } from "../../services/task.service";
import { current } from "@reduxjs/toolkit";

interface EventsComponentInterface {
  data?: any;
  loading?: boolean;
  columns: any;
  total?: any;
  pageSize?: any;
  fetchEvents?: any;

  handleFilter?: any;
  handleClear?: any;
  filters?: any;
  filter?: any;
  filterForm?: any;
  currentPage?: any;
  setCurrentPage?: any;
}

const { RangePicker } = DatePicker;

const EventsComponent: React.FC<EventsComponentInterface> = (props) => {
  const {
    data,
    loading,
    columns,
    total,
    fetchEvents,
    pageSize,
    handleFilter,
    handleClear,
    filterForm,
    filter,
    currentPage,
    setCurrentPage,
  } = props;

  return (
    <div className="card page-card events">
      <div className="events__filters">
        <Form name="basic" onFinish={handleFilter} form={filterForm}>
          <Row gutter={15}>
            <Col span={10}>
              <Form.Item name="name">
                <Input
                  placeholder="Event Name"
                  onChange={debounce(() => {
                    filterForm.submit();
                  }, 300)}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="filter">
                <Select
                  defaultValue="Filter Status"
                  onChange={(val) => {
                    filterForm.submit();
                  }}
                  options={[
                    {
                      value: "all",
                      label: "All",
                    },
                    {
                      value: "upcoming",
                      label: "Upcoming",
                    },
                    {
                      value: "ongoing",
                      label: "Ongoing",
                    },
                    {
                      value: "completed",
                      label: "Completed",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="range">
                <RangePicker
                  onChange={(val?: any) => {
                    filterForm.submit();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button onClick={handleClear}>Clear</Button>
            </Col>
          </Row>
        </Form>
      </div>

      <Table
        size="small"
        columns={columns}
        dataSource={data}
        loading={loading}
        onChange={(pagination, filter, sorter?: any) => {
          setCurrentPage(undefined);
          fetchEvents({
            data: {
              filter: filterForm.getFieldValue("filter"),
              name: filterForm.getFieldValue("name"),
              start_date: filterForm.getFieldValue("range")?.[0],
              end_date: filterForm.getFieldValue("range")?.[1],
            },
            page: pagination?.current,
            pageSize: pagination?.pageSize,
            orderBy: sorter?.columnKey,
            order:
              sorter?.order === "ascend"
                ? "asc"
                : sorter?.order?.substring(0, 4),
          });
        }}
        pagination={{
          current: currentPage ?? undefined,
          total: total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSize: pageSize,
          showTotal: (total?: any) => `Total ${total} entries`,
          position: ["bottomRight"],
          className: "table-pagination",
        }}
      />
    </div>
  );
};

export default EventsComponent;
