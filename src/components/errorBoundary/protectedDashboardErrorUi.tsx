import React from "react";
import AppButton from "../common/buttons/button";
import { useNavigate } from "react-router-dom";

import BugSvg from "../../assets/images/bug.svg";

interface ProtectedDashboardErrorUiInterface {}

const ProtectedDashboardErrorUi: React.FC<
  ProtectedDashboardErrorUiInterface
> = () => {
  return (
    <div className="container-error">
      <img src={BugSvg} className="illustration-img" />
      <h2>Oops!</h2>
      <h3>Something Went Wrong</h3>
      <div className="AppButton-Wrapper">
        <AppButton
          type="primary"
          size="small"
          title="Home"
          onClick={() => window.location.replace("/")}
        />
        <AppButton
          type="link"
          size="small"
          title="Reload Page"
          onClick={() => window.location.reload()}
        />
      </div>
    </div>
  );
};

export default ProtectedDashboardErrorUi;
