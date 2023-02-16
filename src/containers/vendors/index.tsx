import React, { useState, useEffect } from "react";
import { Space, Popconfirm, Form } from "antd";

import {
  EditFilled,
  DeleteFilled,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { BsShopWindow, BsPinMap, BsPhone } from "react-icons/bs";
import { useNavigate, NavLink } from "react-router-dom";

import VendorsComponent from "../../components/vendors";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getAllVendorsApi,
  deleteVendorsApi,
} from "../../services/vendors.service";

interface VendorsContainerInterface {
  data?: any;
}

const VendorsContainer: React.FC<VendorsContainerInterface> = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [currentPage, setCurrentPage] = React.useState<Number>();

  const state = useAppSelector((state) => state);
  const { setup }: { setup: any } = state?.setup;
  const { vendors } = state.vendors;
  const { pageSize } = state.vendors;
  const { total } = state.vendors;
  const navigate = useNavigate();
  const [filters, setFilters] = useState<any | undefined>();

  const columns = [
    {
      title: "Vendor",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: true,
      render: (vendor: any, data: any) => {
        return (
          <>
            <NavLink to={`/vendors/${data?.id}`}>{data?.name}</NavLink>
          </>
        );
      },
    },
    {
      title: "Company",
      dataIndex: "company_name",
      sorter: true,
      key: "company_name",
      width: "25%",
      render: (company_name: any, data: any) => {
        return (
          <>
            {data?.company_name ? (
              <strong>
                <BsShopWindow />{" "}
                {data?.company_name === "null" || undefined
                  ? "N/A"
                  : data?.company_name}
              </strong>
            ) : (
              <></>
            )}
            {data?.address ? (
              <p>
                <BsPinMap />{" "}
                {data?.address === "null" || undefined ? "N/A" : data?.address}
              </p>
            ) : (
              <></>
            )}
          </>
        );
      },
    },

    {
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
      width: "25%",
      render: (contact: any, data: any) => {
        return (
          <>
            {data?.phone_number ? (
              <li>
                <PhoneOutlined /> {data?.phone_number}
              </li>
            ) : (
              <></>
            )}
            {data?.mobile ? (
              <li>
                <BsPhone /> {data?.mobile}
              </li>
            ) : (
              <></>
            )}
            {data?.email ? (
              <li>
                <MailOutlined /> {data?.email}
              </li>
            ) : (
              <></>
            )}
          </>
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
      title: "Grade",
      dataIndex: "grade",
      sorter: true,
      key: "grade",
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      width: "5%",
      render: (text: any, record: any) => {
        return (
          <Space size="middle">
            <EditFilled
              onClick={() => {
                navigate(`/vendors/${text?.id}/edit`, { state: record });
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

  useEffect(() => {
    fetchAllVendors();
  }, []);

  const handleDelete = (id: number, val?: any) => {
    dispatch(
      deleteVendorsApi({
        id: id,
        finalCallback: () => {},
        successCallback: () => {
          fetchAllVendors();
        },
      })
    );
  };

  const fetchAllVendors = (obj?: any) => {
    setLoading(true);
    dispatch(
      getAllVendorsApi({
        data: obj ? obj?.data : undefined,
        page: obj ? obj?.page : undefined,
        pageSize: obj?.pageSize ?? window.DEFAULT_PAGE_SIZE,
        orderBy: obj ? obj?.orderBy : undefined,
        order: obj ? obj?.order : undefined,
        finalCallback: () => {
          setLoading(false);
        },
        successCallback: () => {},
      })
    );
  };

  const handleFilter = (val?: any) => {
    let obj = {
      name: val?.name,
      category: val?.category,
    };

    setFilters(obj);

    fetchAllVendors({
      data: obj,
    });
  };

  const handleClear = () => {
    setFilters(undefined);
    form.resetFields();
    fetchAllVendors({
      data: undefined,
    });
    setCurrentPage(1);
  };

  return (
    <VendorsComponent
      data={vendors}
      columns={columns}
      loading={loading}
      handleFilter={handleFilter}
      handleClear={handleClear}
      filters={filters}
      filterForm={form}
      fetchAllVendors={fetchAllVendors}
      pageSize={pageSize}
      total={total}
      categories={setup?.vendor_categories}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    />
  );
};

export default VendorsContainer;
