import React, { useState } from "react";
import { PageHeader } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface ForgotPasswordHeaderInterface {
  title?: string;
  hasBackBtn?: boolean;
}

const ForgotPasswordHeaderComponent: React.FC<ForgotPasswordHeaderInterface> = (
  props
) => {
  const { title, hasBackBtn } = props;
  const navigate = useNavigate();
  const [showPopover, setPopover] = useState(false);

  const handleVisibleChange = () => {
    setPopover(!showPopover);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <PageHeader
        className="forgotPassword-page-header"
        onBack={() => {
          if (hasBackBtn) {
            window.history.back();
          }
        }}
        backIcon={hasBackBtn ? <ArrowLeftOutlined /> : false}
        extra={[]}
      />
    </div>
  );
};

export default ForgotPasswordHeaderComponent;
