import React, { useState } from "react";
import { Select, Row, Col } from "antd";

import PrimaryModal from "./primaryModal";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { toggleAssignVendorModal } from "../../../store/slice/togglers.slice";
import { getAllVendorsApi } from "../../../services/vendors.service";
import debounce from "lodash/debounce";

interface AssignVendorModalInterface {
  handleVendorSelection?: any;
}

const { Option } = Select;

const AssignVendorModal: React.FC<AssignVendorModalInterface> = (props) => {
  const { handleVendorSelection } = props;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { showAssignVendorModal, assignVendorData } = state.togglers;
  const { vendors } = state.vendors;
  const [loading, setLoading] = useState<any>(false);

  const closeModal = () => {
    dispatch(toggleAssignVendorModal(false));
  };

  const fetchVendor = (val: any) => {
    setLoading(true);
    dispatch(
      getAllVendorsApi({
        finalCallback: () => { },
        page: undefined,
        pageSize: window.DEFAULT_PAGE_SIZE,
        data: val,
        successCallback: () => {
          setLoading(false);
        },
        order: undefined,
        orderBy: undefined
      })
    );
  };

  return (
    <PrimaryModal
      visible={showAssignVendorModal}
      onCancel={closeModal}
      title="Assign vendor"
      footer={false}
      className="assign-vendor-modal"
    >
      <Row>
        <Col span={24}>
          <Select
            showSearch
            placeholder="Select Vendor"
            optionFilterProp="children"
            className="vendor-select"
            autoFocus
            onFocus={() => {
              fetchVendor({ name: "" });
            }}
            onClick={(e) => e.stopPropagation()}
            onSelect={(val?: any) => {
              handleVendorSelection(val, assignVendorData);
              closeModal();
            }}
            // onChange={onChange}
            onSearch={debounce((val?: any) => {
              fetchVendor({ name: val });
            }, 300)}
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            loading={loading}
          >
            {vendors?.map((vendor: any) => {
              return <Option value={vendor?.id}>{vendor?.name}</Option>;
            })}
          </Select>
        </Col>
      </Row>
    </PrimaryModal>
  );
};

export default AssignVendorModal;
