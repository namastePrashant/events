import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { routes } from "../src/configs/route.config";

import "antd/dist/antd.min.css";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="fallback-container">
            <Spin indicator={antIcon} />
          </div>
        }
      >
        <Routes>
          {routes?.map((route, routeIndex) => {
            const {
              element: Element,
              path,
              layout: Layout,
              isEditPage,
              doTypeExist,
            } = route;
            return (
              <Route
                key={routeIndex}
                path={path}
                element={
                  <Layout pageTitle={route?.name}>
                    <Element
                      isEditPage={isEditPage}
                      doTypeExist={doTypeExist}
                    />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
