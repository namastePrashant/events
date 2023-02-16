import React, { useState } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import AppButton from "../../components/common/buttons/button";

interface ChangePasswordComponentInterface {
  onFinish?: any;
  submitting?: boolean;
  handleImageChange?: any;
  loading?: any;
  handleBackButton?: any;
  changePasswordErrors?: any;
}

const ChangePasswordComponent: React.FC<ChangePasswordComponentInterface> = (
  props
) => {
  const { onFinish, loading, handleBackButton, changePasswordErrors } = props;

  const [form] = Form.useForm();

  return (
    <div className="wrapper-changePassword">
      <div className="changePassword-container">
        <div className="backButton">
          <Button
            icon={<ArrowLeftOutlined />}
            type="text"
            size="large"
            onClick={handleBackButton}
          />
        </div>
        <div className="changePassword-form-wrapper">
          <div className="changePassword-form">
            <h2>Change Password</h2>
            <Form
              name="changePassword"
              layout="vertical"
              size="large"
              className="form--onboarding form--onboarding--settings"
              form={form}
              onFinishFailed={(err: any) => {
                console.log("on finish failed", err);
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Old Password"
                name="current_password"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
                help={changePasswordErrors?.current_password}
              >
                <Input.Password placeholder="Old Password*" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="new_password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                  { min: 8 },
                ]}
                help={changePasswordErrors?.new_password}
              >
                <Input.Password placeholder="New Password*" />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="new_password_confirmation"
                dependencies={["new_password"]}
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },

                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("new_password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "The two passwords that you entered does not match."
                      );
                    },
                  }),
                ]}
                help={changePasswordErrors?.new_password_confirmation}
              >
                <Input.Password placeholder="New Password*" />
              </Form.Item>
              <Form.Item className="form-submit-btn">
                <AppButton
                  title="Change Password"
                  htmlType="submit"
                  loading={loading}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
