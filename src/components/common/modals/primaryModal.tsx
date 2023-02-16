import React from 'react';
import { Modal } from "antd";

interface PrimaryModalInterface {
  visible?: boolean;
  onCancel?: any;
  onOk?: any;
  title?: any;
  footer?: any;
  header?: any;
  width?: any;
  className?: any;
  destroyOnClose?: boolean;
  children?: any;
  okText?: string
}

const PrimaryModal: React.FC<PrimaryModalInterface> = (props) => {
  const { footer } = props;
  return <Modal
    destroyOnClose={true}
    {...props}
  >
    {props.children}
  </Modal>;
};

export default PrimaryModal;
