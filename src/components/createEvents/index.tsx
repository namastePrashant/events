import React from "react";
import { Form, Input, Row, Col, DatePicker, Select } from "antd";
import moment from "moment";
import debounce from "lodash/debounce";

import FormHeader from "../../layouts/headers/formHeader";
import { ethnicity } from "../../constants/events.constant";
import { eventColors } from "../../constants/colorPalette.constant";
import AppCkeditor from "../common/editor/ckeditor";

const { Option } = Select;

const { RangePicker } = DatePicker;

interface CreateEventsComponentInterface {
  onFinish?: any;
  form?: any;
  submitting?: boolean;
  isEditPage?: boolean;
  initialData?: any;
  categories?: any;
  clients?: any;
  handleOnSelect?: any;
  handleOnFocus?: any;
  handleKeywordChange?: any;
  handleClear?: any;
  value?: any;
  newValue?: any;
  infos?: any;
  fetchAllClients?: any;
  createEventsErrors?: any;
  updateEventsErrors?: any;
  loading?: boolean;
  isClientSearchFocused?: boolean;
  setClientSearchFocused?: any;
}

const CreateEventsComponent: React.FC<CreateEventsComponentInterface> = (
  props
) => {
  const {
    onFinish,
    form,
    submitting,
    isEditPage,
    initialData,
    categories,
    clients,
    handleOnSelect,
    handleKeywordChange,
    loading,
    handleClear,
    newValue,
    createEventsErrors,
    updateEventsErrors,
    isClientSearchFocused,
    setClientSearchFocused,
  } = props;

  return (
    <div className="card">
      <FormHeader
        title={`${isEditPage ? "Edit" : "Create"} Event`}
        button1Title={isEditPage ? "Update" : "Create"}
        button1Action={form.submit}
        button1Loading={submitting}
      />
      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        form={form}
        initialValues={
          isEditPage
            ? {
                ...initialData,
                datePicker: [
                  moment(initialData?.start_date),
                  moment(initialData?.end_date),
                ],
                start_date: undefined,
                end_date: undefined,
              }
            : {}
        }
      >
        <Row gutter={60}>
          <Col span={13}>
            <Form.Item
              label="Event Name"
              name="name"
              rules={[
                { required: true, message: "Please input the event name" },
                {
                  max: 250,
                  message: "You cannot input more than 250 characters!",
                },
              ]}
              help={createEventsErrors?.name ?? updateEventsErrors?.name}
            >
              <Input placeholder="Enter event name" />
            </Form.Item>

            <Form.Item
              label="Ethnicity"
              name="ethnicity"
              rules={[{ required: true, message: "Please select ethnicity" }]}
              help={
                createEventsErrors?.ethnicity ?? updateEventsErrors?.ethnicity
              }
            >
              <Select placeholder="Select Ethnicity">
                {ethnicity?.map((e: any, eIndex: Number) => {
                  return (
                    <Select.Option value={e?.name} key={e?.id}>
                      {e?.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Search Clients"
              name="mobile_number"
              rules={[
                {
                  required: true,
                  message: "Please select a Client!",
                },
                {
                  min: 10,
                  message: "Mobile Number must be at least of 10 characters",
                },
              ]}
              help={
                createEventsErrors?.mobile_number ??
                updateEventsErrors?.mobile_number
              }
            >
              <Select
                loading={loading}
                onSelect={handleOnSelect}
                onClick={() => {
                  handleKeywordChange("");
                }}
                defaultActiveFirstOption={false}
                placeholder="Search Clients"
                showSearch
                onDropdownVisibleChange={(val?: any) => {
                  setClientSearchFocused(val);
                }}
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
                onClear={handleClear}
              >
                {clients?.length !== 0 ? (
                  clients?.map((c: any) => {
                    return (
                      <Select.Option value={c?.mobile} key={c?.id}>
                        {c?.mobile}-{c?.name}
                        {/* {isClientSearchFocused ? "- " + c?.name : ""} */}
                      </Select.Option>
                    );
                  })
                ) : (
                  <Select.Option disabled style={{ color: "grey" }}>
                    No Match Found!
                  </Select.Option>
                )}
                {/* ) : newValue ? (
                  <Select.Option value={newValue}>{newValue}</Select.Option>
                ) : (
                  <></>
                )} */}
              </Select>
            </Form.Item>

            <Form.Item
              label="Notes"
              name="note"
              help={createEventsErrors?.note ?? updateEventsErrors?.note}
            >
              <AppCkeditor
                value={initialData?.notes}
                onChange={(data?: any) => {
                  form.setFieldValue("note", data);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={11}>
            <div>
              {/* <div className="client-form"> */}
              <Form.Item
                label="Event Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select event category",
                  },
                ]}
                help={
                  createEventsErrors?.category ?? updateEventsErrors?.category
                }
              >
                <Select placeholder="Select Event">
                  {categories?.map((event: any, eventIndex: Number) => {
                    return (
                      <Select.Option value={event} key={event}>
                        {event}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Event Duration"
                name="datePicker"
                rules={[
                  {
                    required: true,
                    message: "Please select Start Date and End Date",
                  },
                ]}
                help={
                  createEventsErrors?.start_date ??
                  updateEventsErrors?.datePicker
                }
              >
                <RangePicker />
              </Form.Item>

              <Form.Item
                label="Color"
                name="color_code"
                help={
                  createEventsErrors?.color_code ??
                  updateEventsErrors?.color_code
                }
              >
                <Select>
                  {eventColors?.map((color, coloItem) => {
                    return (
                      <Option value={color}>
                        <div
                          style={{
                            height: 10,
                            width: "100%",
                            background: color,
                          }}
                        />
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateEventsComponent;
