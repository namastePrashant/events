import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Row, Col, Form, Input } from "antd";

import { NavLink } from "react-router-dom";
import AppButton from "../../components/common/buttons/button";
import AuthenticationSidebar from "../../layouts/sideNavs/authenticationSideNav";

interface LoginComponentInterface {
  onFinish?: any;
  loginErrors?: any;
  submitting?: boolean;
}

const LoginComponent: React.FC<LoginComponentInterface> = (props) => {
  const { onFinish, submitting, loginErrors } = props;

  return (
    <div className="wrapper">
      <div className="login-container">
        <Row>
          <Col span={13}>
            <div className="login-form-wrapper">
              <div className="login-form">
                <h2>Login</h2>
                <p>Welcome Back ! Please sign in to your Account</p>
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
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Email!",
                      },
                      { type: "email", message: "Please input a valid Email!" },
                    ]}
                    help={loginErrors?.email}
                  >
                    <Input placeholder="Email Address" disabled={submitting} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                    help={loginErrors?.password}
                  >
                    <Input.Password
                      placeholder="Password"
                      disabled={submitting}
                    />
                  </Form.Item>

                  <div>
                    <NavLink to={"/forgotPassword"}>Forgot Password?</NavLink>
                  </div>

                  <Form.Item className="form-submit-btn">
                    <AppButton
                      htmlType="submit"
                      title="Login"
                      loading={submitting}
                    />
                  </Form.Item>
                </Form>
              </div>
              <div className="powered-by">
                <span>
                  <span>Powered by: </span>
                  <a
                    href="https://www.imarkdigital.com/"
                    target="blank"
                    className="imark"
                  >
                    <span className="underline">iMark</span> <span>| v1.0</span>
                  </a>
                </span>
                {/* <span>
                  <span>Powered by: </span>
                  <a href="https://www.imarkdigital.com/" target="blank">
                    <span className="imark">iMark | v1.0</span>
                  </a>
                </span> */}
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

export default LoginComponent;
