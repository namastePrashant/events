import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginComponent from "../../components/login";
import { loginApi } from "../../services/auth.service";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { message } from "antd";

interface LoginContainerInterface {}

const LoginContainer: React.FC<LoginContainerInterface> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("aioToken");

  const [loginErrors, setLoginErrors] = useState();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const onFinish = (val: any) => {
    setSubmitting(true);
    dispatch(
      loginApi({
        data: val,
        finalCallback: () => {
          setSubmitting(false);
        },
        successCallback: () => {
          navigate("/");
        },
        failureCallback: (val: any) => {
          setLoginErrors(val);
        },
      })
    );
  };

  return (
    <LoginComponent
      onFinish={onFinish}
      submitting={submitting}
      loginErrors={loginErrors}
    />
  );
};

export default LoginContainer;
