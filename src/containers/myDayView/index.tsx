import React from "react";

import MyDayViewComponent from "../../components/myDayView";

import type { ColumnsType } from "antd/es/table";

interface MyDayViewContainerInterface {}

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  email: string;
}

const MyDayViewContainer: React.FC<MyDayViewContainerInterface> = () => {
  return <MyDayViewComponent />;
};

export default MyDayViewContainer;
