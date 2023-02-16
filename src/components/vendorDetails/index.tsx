import React, { useState } from "react";
import {
  Descriptions,
  Table,
  Divider,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Popover,
} from "antd";
import moment from "moment";
import { MdCheckCircleOutline, MdCheckCircle } from "react-icons/md";
import debounce from "lodash/debounce";
import { IoMdPrint } from "react-icons/io";
import parse from "html-react-parser";

interface VendorDetailsComponentInterface {
  loading: any;
  vendorDetailData: any;
  columns: any;
  vendorTasksData: any;
  total: any;
  per_page: any;
  fetchVendorTasks: any;
  filterForm: any;
  handleFilter: any;
  id: any;
  handleKeywordChange: any;
  filters?: any;
  handleOnSelect?: any;
  eventsData?: any;
  setEventsData?: any;
  eventName?: any;
  setFilters?: any;
  setCurrentPage?: any;
  currentPage?: any;
}

const { RangePicker } = DatePicker;

const { Column, ColumnGroup } = Table;

const VendorDetailsComponent: React.FC<VendorDetailsComponentInterface> = (
  props
) => {
  const {
    vendorDetailData,
    columns,
    vendorTasksData,
    total,

    fetchVendorTasks,
    filterForm,
    handleFilter,
    id,
    handleKeywordChange,
    filters,

    eventsData,

    setFilters,

    setCurrentPage,
    currentPage,
  } = props;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const eventNameContent = (
    <div style={{ maxWidth: "500px", fontWeight: "500" }}>
      {vendorDetailData?.name}
    </div>
  );

  const tasksDataForTable: any = [];

  vendorTasksData?.map((task: any) => {
    tasksDataForTable.push({
      task: task?.name,
      event: task?.event?.name,
      eventId: task?.event?.id,
      function: task?.function?.name,
      venue: task?.function?.venue?.name,
      status:
        task?.status === "complete" ? (
          <div className="completed-icon">
            <MdCheckCircle className="green-check" color="green" />
          </div>
        ) : (
          task?.status
        ),
      dueDate: task?.due_date
        ? moment(task?.due_date)?.format("YYYY-MM-DD")
        : "N/A",
    });
  });

  return (
    <div>
      <div
        className="card vendor-details"
        // style={{ border: "solid 1px black" }}
      >
        <div
          className="vendor-details-header"
          // style={{ border: "solid 1px black" }}
        >
          <div className="card">
            <Divider orientationMargin="0" orientation="left">
              <Popover content={eventNameContent} title="Vendor Name">
                <div className="divider-title">{vendorDetailData?.name}</div>
              </Popover>
            </Divider>
            <Descriptions
              // title={vendorDetailData?.name}
              className="vendorProfile"
              size="small"
            >
              <Descriptions.Item label="Company Name">
                {vendorDetailData?.company_name === "null" || undefined
                  ? "N/A"
                  : vendorDetailData?.company_name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {vendorDetailData?.phone_number === "null" || undefined
                  ? "N/A"
                  : vendorDetailData?.phone_number}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {vendorDetailData?.category === "null" || undefined
                  ? "N/A"
                  : vendorDetailData?.category}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {vendorDetailData?.address === "null" || undefined
                  ? "N/A"
                  : vendorDetailData?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile Number">
                {vendorDetailData?.mobile === "null" || undefined
                  ? "N/A"
                  : vendorDetailData?.mobile}
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                {vendorDetailData?.email === "null" || undefined
                  ? "N/A"
                  : vendorDetailData?.email}
              </Descriptions.Item>
            </Descriptions>
            <Divider orientationMargin="0" orientation="left">
              <span className="divider-title">Assigned Tasks</span>
            </Divider>

            <Descriptions className="vendorProfile" size="small">
              <Descriptions.Item label="Total">
                <span className="tasks-count-value">
                  {vendorDetailData?.tasks_count}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Completed">
                <span className="tasks-count-value">
                  {vendorDetailData?.complete_tasks_count}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Incomplete">
                <span className="tasks-count-value">
                  {vendorDetailData?.incomplete_tasks_count}
                </span>
              </Descriptions.Item>
            </Descriptions>

            <Divider orientationMargin="0" orientation="left">
              <span className="divider-title">Notes</span>
            </Divider>
            <div className="note-section">
              <div>
                {vendorDetailData?.notes
                  ? parse(
                      vendorDetailData?.notes === "null" || undefined
                        ? "N/A"
                        : vendorDetailData?.notes
                    )
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* .........................................................................................TABLE */}
        <div>
          <div className="events__filters" style={{ marginTop: "50px" }}>
            <Form name="basic" onFinish={handleFilter} form={filterForm}>
              <Row gutter={15}>
                <Col span={5}>
                  <Form.Item name="task_name">
                    <Input
                      placeholder="Task Name"
                      onChange={debounce(() => {
                        filterForm.submit();
                      }, 300)}
                    />
                  </Form.Item>
                </Col>

                <Col span={5}>
                  <Form.Item name="event_name">
                    <Select
                      // loading={loading}
                      // onSelect={handleOnSelect}
                      onSelect={(val: any) => {
                        filterForm.submit();
                      }}
                      onClick={() => {
                        handleKeywordChange(" ");
                      }}
                      defaultActiveFirstOption={false}
                      placeholder="Select Events"
                      showSearch
                      onSearch={debounce((val) => {
                        handleKeywordChange(val);
                        // const re = /^[0-9\b]+$/;
                        // if (val === '' || re.test(val)) {
                        //   handleKeywordChange(val)
                        // } else {
                        //   message.warning('Invalid mobile number')
                        // }
                      }, 300)}
                      filterOption={false}
                      notFoundContent={null}
                      allowClear
                      // onClear={handleClear}
                    >
                      {/* ............. */}

                      {eventsData?.length !== 0 ? (
                        eventsData?.map((c: any) => {
                          return (
                            <Select.Option value={c?.name} key={c?.id}>
                              {c?.name}
                            </Select.Option>
                          );
                        })
                      ) : (
                        <Select.Option>No Events Found</Select.Option>
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Form.Item name="filter">
                    <Select
                      defaultValue=""
                      onChange={(val) => {
                        filterForm.submit();
                      }}
                      options={[
                        {
                          value: "",
                          label: "All",
                        },
                        {
                          value: "incomplete",
                          label: "Incomplete",
                        },
                        {
                          value: "complete",
                          label: "Complete",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="dueDate">
                    <RangePicker
                      onChange={(val?: any) => {
                        filterForm.submit();
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button
                    // onClick={handleClear}
                    onClick={() => {
                      filterForm.resetFields();
                      fetchVendorTasks();
                      setFilters();
                      setCurrentPage(1);
                    }}
                  >
                    Clear
                  </Button>
                </Col>
                <Col span={2}>
                  <Button
                    type="dashed"
                    onClick={(e) => {
                      window.open(
                        `/vendors/${id}/print?page=${page}&pageSize=${pageSize}&startDate=${filters?.start_date}&endDate=${filters?.end_date}&taskName=${filters?.task_name}&status=${filters?.status}&eventName=${filters?.event_name}`
                      );
                      e.stopPropagation();
                    }}
                    className="print-button"
                  >
                    <IoMdPrint className="icon" />
                    Print
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <Table
            size="small"
            columns={columns}
            dataSource={tasksDataForTable}
            pagination={{
              current: currentPage ?? undefined,
              total: total,
              showQuickJumper: true,
              showSizeChanger: true,

              defaultPageSize: 5,
              pageSizeOptions: ["5", "10", "15", "20", "50", "100"],
              onChange: (page, pageSize, sorter?: any) => {
                setCurrentPage(undefined);
                setPage(page);
                setPageSize(pageSize);
                // need this for VendorDetailPrint

                fetchVendorTasks({
                  page: page,
                  pageSize: pageSize,
                  data: {
                    task_name: filterForm.getFieldValue("task_name"),
                    event_name: filterForm.getFieldValue("event_name"),
                    status: filterForm.getFieldValue("filter"),
                    start_date:
                      filterForm.getFieldValue("dueDate") &&
                      moment(filterForm.getFieldValue("dueDate")?.[0]).format(
                        "YYYY-MM-DD"
                      ),
                    end_date:
                      filterForm.getFieldValue("dueDate") &&
                      moment(filterForm.getFieldValue("dueDate")?.[1]).format(
                        "YYYY-MM-DD"
                      ),
                  },
                });
              },
              showTotal: (total?: any) => `Total ${total} entries`,
              position: ["bottomRight"],
              className: "table-pagination",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsComponent;
