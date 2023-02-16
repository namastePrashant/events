import React from "react";
import { Result, Button } from "antd";
import AppButton from "../../components/common/buttons/button";
import { useNavigate } from "react-router-dom";

interface PageNotFoundInterface {}

const PageNotFound: React.FC<PageNotFoundInterface> = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<AppButton title="Go Back" onClick={() => navigate(-1)} />}
    />
  );
};

export default PageNotFound;
