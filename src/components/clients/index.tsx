import React, { useState } from "react";
import { Table, Form, Col, Row, Input, Button, Space, Popconfirm } from "antd";
import {
  EditFilled,
  DeleteFilled,
  PhoneOutlined,
  MobileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate, NavLink } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import debounce from "lodash/debounce";

import {
  toggleVendorCreateModal,
  toggleClientCreateModal,
} from "../../store/slice/togglers.slice";
import { getClientIdSuccess } from "../../store/slice/updateClientId";

import { getClientInfoSuccess } from "../../store/slice/clientInfo.slice";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  email: string;
}

interface ClientsComponentInterface {
  clients?: any;
  handleFilter?: any;
  filterForm?: any;
  handleClear?: any;
  total?: any;
  per_page?: any;
  fetchAllClients?: any;
  handleDelete?: any;
  handleClientUpdate?: any;
  setCurrentPage?: any;
  currentPage?: any;
}
const ClientsComponent: React.FC<ClientsComponentInterface> = (props) => {
  const {
    clients,
    handleFilter,
    filterForm,
    handleClear,
    total,
    per_page,
    fetchAllClients,
    handleDelete,
    handleClientUpdate,
    setCurrentPage,
    currentPage,
  } = props;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      width: "20%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Action",
      // dataIndex: "action",
      key: "x",
      width: "5%",
      render: (text: any, record: any) => {
        return (
          <Space size="middle">
            <EditFilled
              onClick={() => {
                // navigate(`/vendors/${text?.id}/edit`, { state: record });
                dispatch(
                  toggleClientCreateModal({
                    showModal: true,
                    isEditClient: true,
                  })
                );

                dispatch(getClientIdSuccess(text?.id));

                dispatch(getClientInfoSuccess(text));
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

  return (
    <div className="card page-card">
      <div className="events__filters">
        <Form name="basic" onFinish={handleFilter} form={filterForm}>
          <Row gutter={15}>
            <Col span={22}>
              <Form.Item name="mobile_number">
                <Input
                  placeholder="Client Name / Mobile Number"
                  onChange={debounce(() => {
                    filterForm.submit();
                  }, 300)}
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
        dataSource={clients}
        pagination={{
          total: total,
          current: currentPage ?? undefined,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSize: per_page,
          pageSizeOptions: ["5", "10", "15", "20", "50", "100"],

          onChange: (page, pageSize?: any) => {
            setCurrentPage(undefined);
            fetchAllClients({
              page: page,
              pageSize: pageSize,
              search: filterForm.getFieldValue("mobile_number"),
            });
          },

          showTotal: (total?: any) => `Total ${total} entries`,
          position: ["bottomRight"],
          className: "table-pagination",
        }}
      />
    </div>
  );
};

export default ClientsComponent;
