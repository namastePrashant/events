import React, { useState } from "react";
import { Form } from "antd";
import moment from "moment";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import {
  createEventApi,
  getAllEventsApi,
  updateEventApi,
} from "../../services/events.service";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import CreateEventsComponent from "../../components/createEvents";

import { getAllClientsApi } from "../../services/clients.service";

interface CreateEventsContainerInterface {
  isEditPage?: boolean;
}

const CreateEventsContainer: React.FC<CreateEventsContainerInterface> = (
  props
) => {
  const { isEditPage } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);
  const { setup }: { setup: any } = state?.setup;
  const [isClientSearchFocused, setClientSearchFocused] = useState(false);
  const { clients }: { clients: any } = state?.clients;

  const [clientID, setClientID] = useState();
  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState<any>(false);

  const [newValue, setNewValue] = useState<string>();

  const initialData: any = isEditPage ? location?.state : "";

  const [createEventsErrors, setCreateEventsErrors] = useState();
  const [updateEventsErrors, setUpdateEventsErrors] = useState();

  const onFinish = (val?: any) => {
    let subObj = {
      name: val?.name === null ? "" : val?.name,
      category: val?.category === null ? "" : val?.category,
      ethnicity: val?.ethnicity === null ? "" : val?.ethnicity,
      note: val?.note === "" ? "<p></p>" : val?.note,
      color_code: val?.color_code === null ? "" : val?.color_code,
      client_id: clientID ?? undefined,

      mobile_number: val?.mobile_number === null ? "" : val?.mobile_number,
      // client_name: val?.client_name === null ? "" : val?.client_name,
      // address: val?.address === null ? "" : val?.address,
      // email: val?.email === null ? "" : val?.email,

      start_date: val?.datePicker
        ? moment(val?.datePicker[0]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,

      end_date: val?.datePicker
        ? moment(val?.datePicker[1]).format("YYYY-MM-DD HH:mm:ss")
        : undefined,
    };

    setSubmitting(true);
    if (isEditPage) {
      let editSubObj = {
        id: id,
        _method: "PUT",
        ...subObj,
        note: val?.note === "" ? "<p></p>" : val?.note,
      };

      dispatch(
        updateEventApi({
          data: editSubObj,
          finalCallback: () => {
            setSubmitting(false);
          },
          successCallback: () => {
            fetchEvents();
            navigate(-1);
          },
          failureCallback: (val: any) => {
            setUpdateEventsErrors(val);
          },
        })
      );
      return;
    }
    dispatch(
      createEventApi({
        data: subObj,
        finalCallback: () => {
          setSubmitting(false);
        },
        successCallback: (id: any) => {
          form.resetFields();
          fetchEvents();
          navigate(`/events/${id}`);
        },
        failureCallback: (val: any) => {
          setCreateEventsErrors(val);
        },
      })
    );
  };

  const fetchEvents = () => {
    dispatch(
      getAllEventsApi({
        finalCallback: () => {},
        successCallback: () => {},
        data: undefined,
        page: undefined,
        pageSize: 15,
        orderBy: undefined,
        order: undefined,
      })
    );
  };

  const handleOnSelect = (val: number) => {
    if (clients?.length !== 0) {
      let selectedClient = clients?.find((obj?: any) => {
        return obj.mobile === val;
      });
      setClientID(selectedClient?.id);
    }
  };

  const fetchAllClients = (obj?: any) => {
    dispatch(
      getAllClientsApi({
        page: undefined,
        pageSize: undefined,
        search: obj?.search,
        finalCallback: () => {
          setLoading(false);
        },
        successCallback: () => {},
      })
    );
  };

  const handleKeywordChange = (val: any) => {
    let isText = isNaN(val);
    setLoading(true);
    fetchAllClients({ search: val });
    if (!isText) {
      setNewValue(val);
    }
  };

  const handleClear = () => {
    form.setFieldsValue({ address: undefined });
    form.setFieldsValue({ client_name: undefined });
    form.setFieldsValue({ email: undefined });
  };

  return (
    <CreateEventsComponent
      onFinish={onFinish}
      form={form}
      submitting={submitting}
      isEditPage={isEditPage}
      initialData={initialData}
      categories={setup?.categories}
      clients={clients}
      handleOnSelect={handleOnSelect}
      handleKeywordChange={handleKeywordChange}
      fetchAllClients={fetchAllClients}
      loading={loading}
      handleClear={handleClear}
      newValue={newValue}
      createEventsErrors={createEventsErrors}
      updateEventsErrors={updateEventsErrors}
      setClientSearchFocused={setClientSearchFocused}
      isClientSearchFocused={isClientSearchFocused}
      // clientID={clientID}
    />
  );
};

export default CreateEventsContainer;
