import React, { useState } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AppButton from "../../components/common/buttons/button";

interface RegisterComponentInterface {
  onFinish?: any;
  submitting?: boolean;
  handleBackButton?: any;
  registerErrors?: any;
}

const RegisterComponent: React.FC<RegisterComponentInterface> = (props) => {
  const { submitting, handleBackButton, registerErrors, onFinish } = props;

  return (
    <div className="wrapper-register">
      <div className="register-container">
        <div className="backButton">
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            size="large"
            onClick={handleBackButton}
          />
        </div>
        <Row>
          <Col span={24}>
            <div className="register-form-wrapper">
              <div className="register-form">
                <h2>Sign Up</h2>
                <p>Please fill in this form to create an account!</p>
                <Form
                  name="normal_login"
                  layout="vertical"
                  size="large"
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Full Name!",
                      },
                    ]}
                    help={registerErrors?.name}
                  >
                    <Input placeholder="Full Name" disabled={submitting} />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                      { type: "email", message: "Please input a valid Email!", }
                    ]}
                    help={registerErrors?.email}
                  >
                    <Input placeholder="Email Address" disabled={submitting} />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input a password!",
                      },
                      { min: 8 },
                    ]}
                    help={registerErrors?.password}
                  >
                    <Input.Password placeholder="Password*" />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="password_confirmation"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input a password!",
                      },

                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords that you entered does not match."
                          );
                        },
                      }),
                    ]}
                    help={registerErrors?.password_confirmation}
                  >
                    <Input.Password placeholder="Password*" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Phone number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Phone Number!",
                      },
                    ]}
                    help={registerErrors?.phone}
                  >
                    <Input
                      placeholder="Phone Number"
                      disabled={submitting}
                      type="number"
                    />
                  </Form.Item>

                  <Form.Item className="form-submit-btn">
                    <AppButton
                      htmlType="submit"
                      title="Sign Up"
                      loading={submitting}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RegisterComponent;
