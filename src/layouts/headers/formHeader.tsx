import React from "react";

import { Row, Button } from "antd";

interface FormHeaderInterface {
  title?: string;
  button1Title?: string;
  button1Action?: any;
  button1Loading?: boolean;
}

const FormHeader: React.FC<FormHeaderInterface> = (props) => {
  const { title, button1Title, button1Action, button1Loading } = props;

  return (
    <div className="form-header">
      <Row justify="space-between">
        <h4>{title}</h4>
        <Button type="primary" onClick={button1Action} loading={button1Loading}>
          {button1Title ?? "Create"}
        </Button>
      </Row>
    </div>
  );
};

export default FormHeader;
