import React from "react";
import { Button } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";

interface ButtonComponentInterface {
  size?: SizeType;
  title: string;
  path?: string;
  onClick?: any;
  className?: string;
  htmlType?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  outline?: boolean;
  icon?: any;
  isModal?: any;
  type?: any;
}

const ButtonComponent: React.FC<ButtonComponentInterface> = (props) => {
  const {
    size,
    title,
    path,
    onClick,
    className,
    htmlType,
    loading,
    outline,
    icon,
    type,
  } = props;
  return (
    <Button
      // shape="round"
      block
      size={size}
      className={`button ${className}`}
      onClick={onClick}
      htmlType={htmlType}
      loading={loading}
      icon={icon}
      type={type ?? "primary"}
      {...props}
    >
      {title}
    </Button>
  );
};

export default ButtonComponent;
