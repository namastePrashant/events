import React from "react";
import { Popover, DatePicker, Button } from "antd";
import moment from "moment";

import { showStatusCompleteMsg } from "../../../utils/utilities";

interface DueDateComponentInterface {
  handleTaskInputChange?: any;
  data?: any;
  isSubTask?: boolean;
  disabled?: boolean;
  disabledDate?: any
}

const DueDateComponent: React.FC<DueDateComponentInterface> = (props) => {
  const { handleTaskInputChange, data, isSubTask, disabled, disabledDate } = props;

  const DueDatePopOverContent = ({ data }: { data?: any }) => {
    return (
      <>
        <DatePicker
          placeholder="Select due date"
          onSelect={(val) =>
            handleTaskInputChange({
              name: "due_date",
              value: moment(val)?.format("YYYY-MM-DD HH:mm:ss"),
              data: data,
            })
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabledDate={disabledDate}
        // ref={datePickerRef}
        />
      </>
    );
  };

  return (
    <Popover
      content={disabled ? <></> : <DueDatePopOverContent data={data} />}
      trigger="click"
      placement="top"
    >
      <Button
        type="link"
        onClick={(e) => {
          if (disabled) {
            showStatusCompleteMsg();
            e.stopPropagation();
            return;
          }
          e.stopPropagation();
        }}
        className="btn-duedate"
      >
        {data?.due_date ? moment(data?.due_date).format("D MMM") : "Set"}
      </Button>
    </Popover>
  );
};

export default DueDateComponent;
