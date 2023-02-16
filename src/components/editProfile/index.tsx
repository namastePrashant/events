import React, { useEffect } from "react";
import { Button, Row, Col, Form, Input, Upload, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import AppButton from "../../components/common/buttons/button";
import { useAppSelector } from "../../hooks/reduxHooks";

import profilePlaceholder from "../../assets/images/profilePlaceholder.webp";

interface EditProfileComponentInterface {
  onFinish?: any;
  submitting?: boolean;
  handleImageChange?: any;
  file_list?: any;
  file?: any;
  getFieldDecorator?: any;
  handleBackButton?: any;
  updateProfileErrors?: any;
}

const EditProfileComponent: React.FC<EditProfileComponentInterface> = (
  props
) => {
  const {
    onFinish,
    submitting,
    handleImageChange,
    file_list,
    handleBackButton,
    updateProfileErrors,
  } = props;

  const [form] = Form.useForm();

  const state = useAppSelector((state) => state);
  const { profile_pic, name, email, phone } = state.profile;

  useEffect(() => {
    form.setFieldsValue({ name: name });
    form.setFieldsValue({ email: email });
    form.setFieldsValue({ phone: phone });
  });

  return (
    <div className="wrapper">
      <div className="login-container">
        <Form
          name="normal_login"
          layout="vertical"
          form={form}
          // initialValues={profileInfo ? { ...profileInfo } : {}}
          onFinish={onFinish}
        >
          <div className="backButton-editProfile">
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              size="large"
              onClick={handleBackButton}
            />
          </div>
          <Row>
            <Col className="wrapper-form-col" span={11}>
              <Form.Item
                name="profile_pic"
                help={updateProfileErrors?.profile_pic}
              >
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1}
                  multiple={false}
                  onChange={handleImageChange}
                  // accept=".png, .jpeg"
                  iconRender={() => {
                    return <Spin />;
                  }}
                  itemRender={(existingComp, file) => {
                    return (
                      <>
                        <img
                          className="profile_pic-img"
                          src={file.thumbUrl}
                          width={"250px"}
                          height={"250px"}
                          alt=""
                        />
                      </>
                    );
                  }}
                >
                  {file_list?.length ? (
                    <></>
                  ) : (
                    <div className="profile_pic-img-2">
                      <img
                        src={profile_pic ?? profilePlaceholder}
                        width={"250px"}
                        height={"250px"}
                        alt=""
                      />

                      <Button type="primary" shape="round">
                        Upload image
                      </Button>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={13}>
              <div className="login-form-wrapper">
                <div className="login-form">
                  <h2>Edit Profile</h2>

                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Name!",
                      },
                    ]}
                    help={updateProfileErrors?.name}
                  >
                    <Input placeholder="Name" disabled={submitting} />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Phone Number!",
                      },
                      {
                        min: 10,
                        message:
                          "Mobile number should be of atleast 10 digits!",
                      },
                      {
                        max: 15,
                        message:
                          "Mobile number should not be more than 15 digits!",
                      },
                    ]}
                    help={updateProfileErrors?.phone}
                  >
                    <Input
                      placeholder="Phone Number"
                      disabled={submitting}
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                      { type: "email", message: "Please input a valid Email!" },
                    ]}
                    help={updateProfileErrors?.email}
                  >
                    <Input placeholder="Email Address" disabled />
                  </Form.Item>
                  <Form.Item>
                    <div className="flex-between"></div>
                  </Form.Item>

                  <Form.Item className="form-submit-btn">
                    <AppButton
                      htmlType="submit"
                      title="Submit"
                      loading={submitting}
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default EditProfileComponent;
