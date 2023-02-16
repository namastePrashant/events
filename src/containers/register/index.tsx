import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RegisterComponent from "../../components/register";
import { registerApi } from "../../services/auth.service";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface RegisterContainerInterface {}

const RegisterContainer: React.FC<RegisterContainerInterface> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("aioToken");

  const [registerErrors, setRegisterErrors] = useState();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleBackButton = () => {
    window.history.back();
  };

  const onFinish = (val: any) => {
    setSubmitting(true);

    dispatch(
      registerApi({
        data: val,

        finalCallback: () => {
          setSubmitting(false);
        },
        successCallback: () => {
          navigate("/");
        },
        failureCallback: (val: any) => {
          setRegisterErrors(val);
        },
      })
    );
  };

  return (
    <RegisterComponent
      onFinish={onFinish}
      submitting={submitting}
      handleBackButton={handleBackButton}
      registerErrors={registerErrors}
    />
  );
};

export default RegisterContainer;
