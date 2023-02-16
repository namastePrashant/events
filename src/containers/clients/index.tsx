import React, { useState, useEffect } from "react";

import { Form } from "antd";

import ClientsComponent from "../../components/clients";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import {
  getAllClientsApi,
  deleteClientsApi,
  updateClientApi,
} from "../../services/clients.service";

import { useParams, useNavigate } from "react-router-dom";

interface ClientsContainerInterface {}

type dataTable = {
  name: string;
  mobile: any;
  address: string;
  email: string;
  id: any;
  company_name: any;
};

const ClientsContainer: React.FC<ClientsContainerInterface> = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = React.useState<Number>();

  const [total, setTotal] = useState();
  const [per_page, setPer_page] = useState();

  const navigate = useNavigate();

  const fetchAllClients = (obj: any) => {
    dispatch(
      getAllClientsApi({
        page: obj?.page,
        pageSize: obj?.pageSize,

        search: obj?.search,
        successCallback: (response?: any) => {
          setTotal(response?.data?.total);
          setPer_page(response?.data?.per_page);
        },

        finalCallback: () => {},
      })
    );
  };

  useEffect(() => {
    fetchAllClients(undefined);
  }, []);

  const state = useAppSelector((state) => state);

  const { clients }: { clients: any } = state?.clients;

  const clientsDataForTable: dataTable[] = [];

  clients?.map((item: any) => {
    clientsDataForTable.push({
      name: item?.name ?? "N/A",
      mobile: item?.mobile ?? "N/A",
      address: item?.address ?? "N/A",
      email: item?.email ?? "N/A",
      id: item?.id ?? undefined,
      company_name: item?.company_name ?? undefined,
    });
  });

  const handleFilter = (val?: any) => {
    fetchAllClients({ search: val?.mobile_number });
  };

  const handleClear = () => {
    fetchAllClients({ search: undefined });
    form.resetFields();
    setCurrentPage(1);
  };

  const handleDeleteClient = (id?: any) => {
    dispatch(
      deleteClientsApi({
        id: id,
        finalCallback: () => {},
        successCallback: () => {
          // navigate("/clients");
          fetchAllClients(undefined);
        },
      })
    );
  };

  const handleClientUpdate = (val: any) => {
    // let obj = {
    //   id: val,
    //   _method: "PUT",
    // };
    // dispatch(
    //   updateClientApi({
    //     data: obj,
    //     finalCallback: () => {
    //       // setSubmitting(false);
    //     },
    //     successCallback: () => {
    //       fetchAllClients(undefined);
    //       navigate(-1);
    //     },
    //     failureCallback: (val: any) => {
    //       // setUpdateClientsErrors(val);
    //     },
    //   })
    // );
  };

  return (
    <ClientsComponent
      clients={clientsDataForTable}
      filterForm={form}
      handleFilter={handleFilter}
      handleClear={handleClear}
      total={total}
      per_page={per_page}
      fetchAllClients={fetchAllClients}
      handleDelete={handleDeleteClient}
      handleClientUpdate={handleClientUpdate}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
    />
  );
};

export default ClientsContainer;
