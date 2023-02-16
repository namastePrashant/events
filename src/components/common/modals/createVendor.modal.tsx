import React from "react";
import { Form, Input, Row, Col, Select } from "antd";

import { vendorGrade } from "../../../constants/vendors.constant";
import AppModal from "./primaryModal";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { toggleVendorCreateModal } from "../../../store/slice/togglers.slice";
import AppCkeditor from "../editor/ckeditor";

interface CreateVendorModalInterface {
  title?: string;
  handleCreateSubmit?: any;
  eventId?: any;
  form?: any;
  vendorCreateErrors?: any;
}

const CreateVendorModal: React.FC<CreateVendorModalInterface> = (props) => {
  const { handleCreateSubmit, form, vendorCreateErrors } = props;

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { setup }: { setup: any } = state?.setup;
  const categories = setup?.vendor_categories;
  const {
    showVendorCreateModal,
    isVendorEditModal,
    editVendorData,
  }: {
    showVendorCreateModal: boolean;
    isVendorEditModal?: boolean;
    editVendorData?: any;
  } = state.togglers;

  const closeModal = () => {
    dispatch(
      toggleVendorCreateModal({
        showModal: false,
      })
    );
  };

  const onFinish = (val?: any) => {
    let obj = {
      ...val,
    };
    handleCreateSubmit(obj);
  };

  return (
    <AppModal
      visible={showVendorCreateModal}
      title={`${isVendorEditModal ? "Edit" : "Add"} Vendor  ${
        isVendorEditModal ? "- " + editVendorData?.name : ""
      }`}
      onCancel={closeModal}
      width={1000}
      destroyOnClose={true}
      onOk={() => form.submit()}
    >
      {showVendorCreateModal ? (
        <Form
          className="createVendor-Modal"
          name="basic"
          layout="vertical"
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          form={form}
        >
          <Row>
            <Col span={14}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the vendor name!",
                  },
                  {
                    max: 255,
                    message: "You cannot input more than 255 characters!",
                  },
                ]}
                help={vendorCreateErrors?.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  { required: true, message: "Please select vendor category!" },
                ]}
                help={vendorCreateErrors?.category}
              >
                <Select
                  placeholder="Select Category"
                  onSelect={(val: any) => {
                    console.log("on select", val);
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
              <Form.Item
                label="Grade"
                name="grade"
                rules={[
                  { required: true, message: "Please select vendor grade!" },
                ]}
                help={vendorCreateErrors?.grade}
              >
                <Select placeholder="Select Grade">
                  {vendorGrade?.map((grade: any, gradeIndex: Number) => {
                    return (
                      <Select.Option value={grade?.name} key={grade?.id}>
                        {grade?.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Notes"
                name="notes"
                help={vendorCreateErrors?.notes}
              >
                <AppCkeditor
                  onChange={(data?: any) => {
                    form.setFieldValue("notes", data);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    min: 6,
                    message: "Phone Number must be of 6 characters",
                  },
                  {
                    max: 16,
                    message:
                      "Phone Number should not be more than 16 characters",
                  },
                ]}
                help={vendorCreateErrors?.phone_number}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Mobile Number"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please input the mobile number!",
                  },
                  {
                    min: 10,
                    message: "Mobile Number must be of 10 characters",
                  },
                  {
                    max: 15,
                    message:
                      "Mobile Number should not be more than 15 characters",
                  },
                ]}
                help={vendorCreateErrors?.mobile}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="company_name"
                rules={[
                  {
                    max: 225,
                    message: "You cannot input more than 225 characters!",
                  },
                ]}
                help={vendorCreateErrors?.company_name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email Address"
                name="email"
                help={vendorCreateErrors?.email}
                rules={[
                  { type: "email", message: "Please input a valid Email!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    max: 300,
                    message: "You cannot input more than 300 characters!",
                  },
                ]}
                help={vendorCreateErrors?.address}
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

export default CreateVendorModal;
