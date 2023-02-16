import React from 'react';
import { Button } from 'antd';
import {
  MdCheckCircleOutline,
  MdCheckCircle
} from "react-icons/md";

interface StatusComponentInterface {
  data?: any;
  handleTaskStatusChange?: any
  isSubTask?: boolean
  disabled?: boolean
}

const StatusComponent: React.FC<StatusComponentInterface> = (props) => {
  const { data, handleTaskStatusChange, isSubTask, disabled } = props;

  return (
    <Button
      type="text"
      onClick={(e) => {
        handleTaskStatusChange({
          task_id: data?.id,
          status: data?.status === "complete" ? "incomplete" : "complete"
        })
        e.stopPropagation();
      }}
    >
      {data?.status == 'complete' ?
        <MdCheckCircle color="green" />
        :
        <MdCheckCircleOutline />
      }
    </Button>
  )
}

export default StatusComponent;
