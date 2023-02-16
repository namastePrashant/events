import React from "react";

interface SideNavErrorUiInterface {}

const SideNavErrorUi: React.FC<SideNavErrorUiInterface> = () => {
  return (
    <div className="side-nav-error">
      <div className="side-nav-error_heading-wrapper">
        <h2>Oops!</h2>
        <h3>Something Went Wrong</h3>
      </div>
    </div>
  );
};

export default SideNavErrorUi;
