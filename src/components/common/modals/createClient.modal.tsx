import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Select } from "antd";
import AppModal from "./primaryModal";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { toggleClientCreateModal } from "../../../store/slice/togglers.slice";
import { getClientInfoSuccess } from "../../../store/slice/clientInfo.slice";
import {
  updateClientApi,
  getAllClientsApi,
} from "../../../services/clients.service";

interface CreateClientModalInterface {
  title?: string;
  handleCreateSubmit?: any;
  eventId?: any;
  form?: any;
  vendorCreateErrors?: any;
  initialValues?: any;
  handleClientUpdate?: any;
  clientCreateErrors?: any;
}

const CreateClientModal: React.FC<CreateClientModalInterface> = (props) => {
  const {
    handleCreateSubmit,
    form,
    clientCreateErrors,
    vendorCreateErrors,
    initialValues,
    handleClientUpdate,
  } = props;

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const clientInfo: any = state?.clientInfo?.clientInfo;

  const [updateClientsErrors, setUpdateClientsErrors]: any = useState();

  useEffect(() => {
    form.setFieldsValue({
      name: clientInfo?.name,
      company_name: clientInfo?.company_name,
      address: clientInfo?.address,
      email: clientInfo?.email,
      mobile: clientInfo?.mobile,
    });
  }, [clientInfo]);

  const {
    showClientCreateModal,
    isClientEditModal,
    editClientData,
  }: {
    showClientCreateModal: boolean;
    isClientEditModal?: boolean;
    editClientData?: any;
  } = state.togglers;

  const closeModal = () => {
    dispatch(
      toggleClientCreateModal({
        showModal: false,
        isEditClient: false,
      })
    );
    dispatch(getClientInfoSuccess({}));
  };

  const clientId = state?.updateClientId?.clientId;

  // fetchAllClients

  const fetchAllClients = () => {
    dispatch(
      getAllClientsApi({
        page: undefined,
        pageSize: undefined,
        search: undefined,
        successCallback: () => {},

        finalCallback: () => {},
      })
    );
  };

  const onFinish = (val?: any) => {
    if (isClientEditModal) {
      let obj = {
        id: clientId,
        _method: "PUT",
        ...val,
      };
      dispatch(
        updateClientApi({
          data: obj,
          finalCallback: () => {
            // setSubmitting(false);
          },
          successCallback: () => {
            fetchAllClients();

            dispatch(toggleClientCreateModal(false));
            // navigate(-1);
          },
          failureCallback: (val: any) => {
            setUpdateClientsErrors(val);
          },
        })
      );
    } else {
      let obj = {
        ...val,
      };
      handleCreateSubmit(obj);
    }
  };

  return (
    <AppModal
      visible={showClientCreateModal}
      title={`${isClientEditModal ? "Edit" : "Add"} Client`}
      onCancel={closeModal}
      width={1000}
      destroyOnClose={true}
      onOk={() => form.submit()}
    >
      {showClientCreateModal ? (
        <Form
          className="createVendor-Modal"
          name="basic"
          layout="vertical"
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          form={form}
          // initialValues={
          //   isEditPage
          //     ? {
          //         ..._.pickBy(initialData, _.identity),
          //       }
          //     : {}
          // }
        >
          <Row>
            <Col span={14}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the Client name!",
                  },
                ]}
                help={
                  isClientEditModal
                    ? updateClientsErrors?.name
                    : clientCreateErrors?.name
                }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Company Name"
                name="company_name"
                help={
                  isClientEditModal
                    ? updateClientsErrors?.company_name
                    : clientCreateErrors?.company_name
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mobile Number"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input your Mobile Number!",
                  },
                  {
                    min: 10,
                    message: "Mobile Number should be of atleast 10 digits!",
                  },
                  {
                    max: 15,
                    message:
                      "Mobile Number should not be longer than 15 digits!",
                  },
                ]}
                help={
                  isClientEditModal
                    ? updateClientsErrors?.mobile
                    : clientCreateErrors?.mobile
                }
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={10}>
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { type: "email", message: "Please input a valid Email!" },
                ]}
                help={
                  isClientEditModal
                    ? updateClientsErrors?.email
                    : clientCreateErrors?.email
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                help={
                  isClientEditModal
                    ? updateClientsErrors?.address
                    : clientCreateErrors?.address
                }
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ) : (
        <></>
      )}
    </AppModal>
  );
};

export default CreateClientModal;
