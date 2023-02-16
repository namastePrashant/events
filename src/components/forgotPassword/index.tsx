import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Row, Col, Form, Input } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import AppButton from "../common/buttons/button";
import AuthenticationSidebar from "../../layouts/sideNavs/authenticationSideNav";
import AppPageHeader from "../../layouts/headers/forgotPasswordHeader";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface ForgotPasswordComponentInterface {
  onFinish?: any;
  submitting?: boolean;
  handleBackButton?: any;
  forgotPasswordErrors?: any;
}

const ForgotPasswordComponent: React.FC<ForgotPasswordComponentInterface> = (
  props
) => {
  const { onFinish, submitting, handleBackButton, forgotPasswordErrors } =
    props;

  return (
    <div className="wrapper">
      <div className="login-container">
        <Row>
          <Col span={13}>
            <div className="backButton">
              <Button
                icon={<ArrowLeftOutlined />}
                type="text"
                size="large"
                onClick={handleBackButton}
              />
            </div>
            <div className="login-form-wrapper">
              <div className="login-form">
                <h2>Forgot Password</h2>

                <Form
                  name="normal_login"
                  layout="vertical"
                  initialValues={
                    {
                      // remember: true,
                    }
                  }
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="email"
                    label="Enter your Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                      { type: "email", message: "Please input a valid Email!" },
                    ]}
                    help={forgotPasswordErrors?.email}
                  >
                    <Input placeholder="Email Address*" disabled={submitting} />
                  </Form.Item>

                  <Form.Item className="form-submit-btn">
                    <AppButton
                      htmlType="submit"
                      title="Continue"
                      loading={submitting}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
          <Col span={11}>
            <AuthenticationSidebar />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
