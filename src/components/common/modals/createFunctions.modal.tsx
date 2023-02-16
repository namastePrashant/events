import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Row, Col, Select } from "antd";
import moment from "moment";
import debounce from "lodash/debounce";

import AppModal from "./primaryModal";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import {
  toggleFunctionCreateModal,
  storeEditFunctionData,
} from "../../../store/slice/togglers.slice";
import { functionColors } from "../../../constants/colorPalette.constant";
import {
  getAllVenuesApi,
  createVenueApi,
} from "../../../services/venue.service";
import { getEachEventSuccess } from "../../../store/slice/events.slice";

interface CreateFunctionsModalInterface {
  title?: string;
  handleCreateSubmit?: any;
  eventId?: any;
  formReset?: any;
  createFunctionErrors?: any;
  updateFunctionErrors?: any;
}

const { Option } = Select;

const { RangePicker } = DatePicker;

const CreateFunctionsModal: React.FC<CreateFunctionsModalInterface> = (
  props
) => {
  const {
    handleCreateSubmit,
    eventId,
    createFunctionErrors,
    updateFunctionErrors,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const { start_date } = state.events;
  const { end_date } = state.events;

  const {
    showFunctionCreateModal,
    isFunctionEditModal,
    editFunctionData,
  }: {
    showFunctionCreateModal: boolean;
    isFunctionEditModal?: boolean;
    editFunctionData?: any;
  } = state.togglers;
  const [form] = Form.useForm();
  const [loadingVenue, setLoadingVenue] = useState(false);
  const [venue, setVenue] = useState([]);
  const [venueKeyword, setVenueKeyword] = useState<any | undefined>();
  const [selectedVenue, setSelectedVenue] = useState();

  const closeModal = () => {
    form.resetFields();
    dispatch(storeEditFunctionData({}));
    dispatch(
      toggleFunctionCreateModal({
        showModal: false,
      })
    );
  };

  useEffect(() => {
    let colors: any = editFunctionData?.color_code;

    let colorIndex = functionColors.findIndex((object) => {
      return object.color1 === colors?.[0] && object.color2 === colors?.[1];
    });

    form.setFieldsValue({
      id: editFunctionData?.id,
      name: editFunctionData?.name,
      venue_id: editFunctionData?.venue?.id,

      color_code: editFunctionData?.color_code
        ? colorIndex.toString()
        : undefined,

      date: editFunctionData?.start_date && [
        moment(editFunctionData?.start_date),
        moment(editFunctionData?.end_date),
      ],

      note: editFunctionData?.note,
    });
    if (editFunctionData?.venue?.name) {
      fetchAllVendors(editFunctionData?.venue?.name);
    }
  }, [editFunctionData]);

  const onFinish = (val?: any) => {
    let colors: any = functionColors[val?.color_code];
    let obj = {
      start_date: moment(val?.date[0]).format("YYYY-MM-DD HH:mm:ss"),
      end_date: moment(val?.date[1]).format("YYYY-MM-DD HH:mm:ss"),
      note: val?.note,
      name: val?.name,
      venue_id: val?.venue_id,
      event_id: eventId,
      id: editFunctionData?.id,
      color_code: val?.color_code
        ? [colors?.color1, colors?.color2]
        : undefined,
    };
    handleCreateSubmit(obj);
    dispatch(
      getEachEventSuccess({
        color_code: val?.color_code,
      })
    );
  };

  const handleVenueSelect = (val?: any) => {
    let value = val?.toString()?.split("+");
    let selecedValue = value[0];
    if (value?.length > 1) {
      selecedValue = value[1];
      createVenue(selecedValue);
    }
    setSelectedVenue(selecedValue);
  };

  const createVenue = (venue?: string) => {
    dispatch(
      createVenueApi({
        data: {
          name: venue,
        },
        finalCallback: () => {},
        successCallback: (data?: any) => {
          setSelectedVenue(data?.id);
          form.setFieldValue("venue_id", data?.id);
          fetchAllVendors(data?.name);
        },
        failureCallback: () => {},
      })
    );
  };

  const handleVenueKeywordChange = (keyword?: string) => {
    setVenueKeyword(keyword);
    fetchAllVendors(keyword);
    setSelectedVenue(undefined);
  };

  const fetchAllVendors = (keyword?: string) => {
    setLoadingVenue(true);
    dispatch(
      getAllVenuesApi({
        keyword: keyword,
        finalCallback: () => {
          setLoadingVenue(false);
        },
        successCallback: (data?: any) => {
          setVenue(data?.data);
        },
      })
    );
  };

  return (
    <AppModal
      visible={showFunctionCreateModal}
      title={`${isFunctionEditModal ? "Edit" : "Add"} Function  ${
        isFunctionEditModal ? "- " + editFunctionData?.name : ""
      }`}
      onCancel={closeModal}
      okText={isFunctionEditModal ? "Update" : "Add"}
      destroyOnClose={true}
      onOk={() => form.submit()}
    >
      {showFunctionCreateModal ? (
        <Form
          name="normal_login"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Function name!",
              },
            ]}
            help={createFunctionErrors?.name ?? updateFunctionErrors?.name}
          >
            <Input placeholder="Function name" disabled={submitting} />
          </Form.Item>

          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="date"
                label="Function Duration"
                rules={[
                  {
                    required: true,
                    message: "Please input function's start date and end date!",
                  },
                ]}
                help={createFunctionErrors?.date ?? updateFunctionErrors?.date}
              >
                <RangePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  disabledDate={(current?: any) => {
                    let startDate: any = moment(start_date)?.startOf("day");
                    let endDate: any = moment(end_date).endOf("day");

                    return !(
                      startDate.isSameOrBefore(current) &&
                      endDate.isAfter(current)
                    );
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Venue"
                name="venue_id"
                help={
                  createFunctionErrors?.venue ?? updateFunctionErrors?.venue
                }
              >
                <Select
                  loading={loadingVenue}
                  onSelect={handleVenueSelect}
                  onFocus={() => handleVenueKeywordChange("")}
                  placeholder="Select Vendor"
                  defaultActiveFirstOption={false}
                  showSearch
                  onSearch={debounce(
                    (val) => handleVenueKeywordChange(val),
                    300
                  )}
                  filterOption={false}
                  notFoundContent={null}
                  allowClear
                >
                  {venue?.length !== 0 ? (
                    venue?.map((c: any) => {
                      return (
                        <Select.Option value={c?.id} key={c?.id}>
                          {c?.name}
                        </Select.Option>
                      );
                    })
                  ) : (
                    <>
                      <Select.Option value={"add+" + venueKeyword}>
                        {selectedVenue
                          ? venueKeyword
                          : "Create new & select - " + venueKeyword}
                      </Select.Option>
                    </>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item
                name="color_code"
                label="Color"
                help={
                  createFunctionErrors?.color_code ??
                  updateFunctionErrors?.color_code
                }
              >
                <Select placeholder="Select Color">
                  {functionColors?.map((color, colorIndex) => {
                    return (
                      <Option value={colorIndex?.toString()}>
                        <div
                          style={{
                            height: "100%",
                            width: "100%",
                            background: `linear-gradient(to right, ${color?.color1}, ${color?.color2})`,
                          }}
                        />
                      </Option>
                    );
                  })}
                </Select>
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

export default CreateFunctionsModal;
