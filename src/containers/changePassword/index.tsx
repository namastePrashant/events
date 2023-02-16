import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePasswordComponent from "../../components/changePassword";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { changePasswordApi } from "../../services/profile.service";

interface ChangePasswordContainerInterface {}

const ChangePasswordContainer: React.FC<
  ChangePasswordContainerInterface
> = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [loading, setLoading] = useState<any>(false);

  const [changePasswordErrors, setChangePasswordErrors] = useState();

  const handleBackButton = () => {
    window.history.back();
  };

  const onFinish = (val?: any) => {
    setLoading(true);

    setSubmitting(true);

    dispatch(
      changePasswordApi({
        data: val,

        finalCallback: () => {
          setSubmitting(false);
          setLoading(false);
        },
        successCallback: () => {
          navigate("/");
        },
        failureCallback: (val: any) => {
          setChangePasswordErrors(val);
        },
      })
    );
  };

  return (
    <ChangePasswordComponent
      onFinish={onFinish}
      submitting={submitting}
      loading={loading}
      handleBackButton={handleBackButton}
      changePasswordErrors={changePasswordErrors}
    />
  );
};

export default ChangePasswordContainer;
