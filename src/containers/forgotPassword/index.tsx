import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ForgotPasswordComponent from "../../components/forgotPassword";
import { forgotPasswordApi } from "../../services/auth.service";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface ForgotPasswordContainerInterface {}

const ForgotPasswordContainer: React.FC<
  ForgotPasswordContainerInterface
> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [forgotPasswordErrors, setForgotPasswordErrors] = useState();

  const onFinish = (val: any) => {
    setSubmitting(true);
    dispatch(
      forgotPasswordApi({
        data: val,
        finalCallback: () => {
          setSubmitting(false);
        },
        successCallback: () => {
          navigate("/");
        },
        failureCallback: (val: any) => {
          setForgotPasswordErrors(val);
        },
      })
    );
  };

  const handleBackButton = () => {
    window.history.back();
  };

  return (
    <ForgotPasswordComponent
      onFinish={onFinish}
      submitting={submitting}
      handleBackButton={handleBackButton}
      forgotPasswordErrors={forgotPasswordErrors}
    />
  );
};

export default ForgotPasswordContainer;
