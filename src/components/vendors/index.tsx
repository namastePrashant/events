import { Table, Form, Input, Row, Col, Button, Select } from "antd";
import React from "react";
import debounce from "lodash/debounce";

interface VendorsComponentInterface {
  data?: any;
  loading?: boolean;
  columns: any;
  total?: any;
  pageSize?: any;
  fetchAllVendors?: any;
  categories?: any;

  handleFilter?: any;
  handleClear?: any;
  filters?: any;
  filterForm?: any;
  setCurrentPage?: any;
  currentPage?: any;
}

const VendorsComponent: React.FC<VendorsComponentInterface> = (props) => {
  const {
    data,
    loading,
    columns,
    total,
    fetchAllVendors,
    pageSize,

    categories,
    handleFilter,
    filterForm,
    handleClear,
    filters,
    setCurrentPage,
    currentPage,
  } = props;

  return (
    <div className="card page-card vendor-table">
      <div className="events__filters">
        <Form name="basic" onFinish={handleFilter} form={filterForm}>
          <Row gutter={15}>
            <Col span={15}>
              <Form.Item name="name">
                <Input
                  placeholder="Vendor Name"
                  onChange={debounce(() => {
                    filterForm.submit();
                  }, 300)}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item name="category">
                <Select
                  placeholder="Select Category"
                  onSelect={() => {
                    filterForm.submit();
                  }}
                >
                  {categories?.map((vendor: any, vendorIndex: Number) => {
                    return (
                      <Select.Option value={vendor} key={vendor}>
                        {vendor}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button onClick={handleClear} disabled={filters ? false : true}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Table
        size="small"
        columns={columns}
        dataSource={data}
        loading={loading}
        onChange={(pagination, filters, sorter?: any) => {
          // console.log("PAGINATION", pagination);
          // console.log("filters", filters);
          // console.log("sorter", sorter);

          setCurrentPage(undefined);

          fetchAllVendors({
            data: {
              name: filterForm.getFieldValue("name"),
              category: filterForm.getFieldValue("category"),
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

export default VendorsComponent;
