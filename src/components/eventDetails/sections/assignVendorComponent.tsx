import React from "react";
import { Button, Tooltip } from "antd";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

import { useAppDispatch } from "../../../hooks/reduxHooks";
import { toggleAssignVendorModal } from "../../../store/slice/togglers.slice";
import { showStatusCompleteMsg } from "../../../utils/utilities";

interface AssignVendorComponentInterface {
  data?: any;
  isSubTask?: boolean;
  disabled?: boolean;
  handleVendorSelection?: any;
}

const AssignVendorComponent: React.FC<AssignVendorComponentInterface> = (
  props
) => {
  const { data, isSubTask, disabled, handleVendorSelection } = props;
  const dispatch = useAppDispatch();

  return (
    <>
      <Button
        onClick={(e) => {
          if (disabled) {
            showStatusCompleteMsg();
            e.stopPropagation();
            return;
          }
          dispatch(
            toggleAssignVendorModal({
              showModal: true,
              data: data,
            })
          );
          e.stopPropagation();
        }}
        type="link"
      >
        {data?.vendor?.name ?? "Assign"}
        {data?.vendor?.name ? (
          <Tooltip title="Remove assignee">
            <MdOutlineRemoveCircleOutline
              size={24}
              color="red"
              className="ml-5"
              onClick={(e) => {
                handleVendorSelection(null, data);
                e.stopPropagation();
              }}
            />
          </Tooltip>
        ) : (
          <></>
        )}
      </Button>
    </>
  );
};

export default AssignVendorComponent;
