import React from "react";
import { Helmet } from "react-helmet";
import { Layout } from "antd";
import { Navigate } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import SideNavErrorUi from "../components/errorBoundary/sideNavErrorUi";

import SideNav from "./sideNavs/protectedSideNav";
import ProtectedDashboardErrorUi from "../components/errorBoundary/protectedDashboardErrorUi";

import PageHeader from "./headers/pageHeader";
import { getItem } from "../utils/localStorage";

const { Content } = Layout;

interface ProtectedLayoutInterface {
  pageTitle?: string;
  children?: any;
}

const ProtectedLayout: React.FC<ProtectedLayoutInterface> = (props) => {
  const { children, pageTitle } = props;

  let token = localStorage.getItem("aioToken");
  const isAuthenticated = token ? true : false;

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <Layout id="app-layout">
      <Helmet>
        <title>{pageTitle} | AIO Event Management</title>
      </Helmet>

      <ErrorBoundary FallbackComponent={SideNavErrorUi} onReset={() => {}}>
        <SideNav />
      </ErrorBoundary>

      <ErrorBoundary
        FallbackComponent={ProtectedDashboardErrorUi}
        onReset={() => {}}
      >
        <Layout className="main-app-layout">
          <PageHeader title={pageTitle} />
          <Content className="main-content">
            <div className="main-content-wrapper">{children}</div>
          </Content>
        </Layout>
      </ErrorBoundary>
    </Layout>
  );
};

export default ProtectedLayout;
