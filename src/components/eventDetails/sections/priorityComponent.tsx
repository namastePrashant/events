import React from 'react';
import { Button } from 'antd';
import {
  MdOutlinedFlag,
  MdFlag,
} from "react-icons/md";

import { showStatusCompleteMsg } from '../../../utils/utilities';


interface PriorityComponentInterface {
  handleTaskPriorityChange?: any
  data?: any
  isSubTask?: boolean
  disabled?: boolean
}

const PriorityComponent: React.FC<PriorityComponentInterface> = (props) => {
  const { handleTaskPriorityChange, data, isSubTask, disabled } = props;

  return (
    <Button
      type="text"
      onClick={(e) => {
        if (disabled) {
          showStatusCompleteMsg()
          e.stopPropagation()
          return
        }
        handleTaskPriorityChange({
          task_id: data?.id,
          priority: data?.priority === 'high' ? 'low' : 'high'
        })
        e.stopPropagation();
      }}
    >
      {data?.priority === 'high' ?
        <MdFlag color="#FFA803" />
        :
        <MdOutlinedFlag />
      }
    </Button>
  )
}

export default PriorityComponent;
