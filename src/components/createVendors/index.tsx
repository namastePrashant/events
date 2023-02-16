import React from "react";
import { Form, Input, Row, Col, Select } from "antd";
import _ from "lodash";

import FormHeader from "../../layouts/headers/formHeader";
import { vendorGrade } from "../../constants/vendors.constant";
import AppCkeditor from "../common/editor/ckeditor";

interface CreateVendorComponentInterface {
  onFinish?: any;
  form?: any;
  submitting?: boolean;
  isEditPage?: boolean;
  initialData?: any;
  categories?: any;
  editVendorErrors?: any;
}

const CreateVendorComponent: React.FC<CreateVendorComponentInterface> = (
  props
) => {
  const {
    onFinish,
    form,
    submitting,
    isEditPage,
    initialData,
    categories,
    editVendorErrors,
  } = props;

  // console.log("initial values", initialData, _.pickBy(initialData, _.identity));

  return (
    <div className="card">
      <FormHeader
        title={`${isEditPage ? "Edit" : "Create"} Vendor`}
        button1Title={isEditPage ? "Update" : "Create"}
        button1Action={form.submit}
        button1Loading={submitting}
      />
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={
          isEditPage
            ? {
                ..._.pickBy(initialData, _.identity),
              }
            : {}
        }
        onFinish={onFinish}
        form={form}
      >
        <Row>
          <Col span={14}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input the vendor name!" },
                {
                  max: 255,
                  message: "You cannot input more than 255 characters!",
                },
              ]}
              help={editVendorErrors?.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                { required: true, message: "Please select vendor category!" },
              ]}
              help={editVendorErrors?.category}
            >
              <Select placeholder="Select Vendor">
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
              help={editVendorErrors?.grade}
            >
              <Select
                placeholder="Select Grade"
                onSelect={(val: any) => {
                  console.log("on select", val);
                }}
              >
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
              help={editVendorErrors?.notes}
            >
              <AppCkeditor
                value={initialData?.notes}
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
              help={editVendorErrors?.phone_number}
            >
              <Input type="number" />
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
                  message: "Mobile Number must be at least of 10 characters",
                },
              ]}
              help={editVendorErrors?.mobile}
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
              help={editVendorErrors?.company_name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email Address"
              name="email"
              help={editVendorErrors?.email}
              rules={[
                { type: "email", message: "Please input a valid Email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              help={editVendorErrors?.address}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateVendorComponent;
