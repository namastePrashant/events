import React, { useState } from "react";
import { Form } from "antd";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import {
  getAllVendorsApi,
  updateVendorApi,
} from "../../services/vendors.service";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import CreateVendorsComponent from "../../components/createVendors";

interface CreateVendorsContainerInterface {
  isEditPage?: boolean;
}

const CreateVendorsContainer: React.FC<CreateVendorsContainerInterface> = (
  props
) => {
  const { isEditPage } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();
  const state = useAppSelector((state) => state);

  const { setup }: { setup: any } = state?.setup;

  const [submitting, setSubmitting] = useState(false);
  const initialData: any = isEditPage ? location?.state : "";

  const [editVendorErrors, setEditVendorErrors] = useState(undefined);

  const onFinish = (val?: any) => {
    setSubmitting(true);
    if (isEditPage) {
      let editSubObj = {
        id: id,
        _method: "PUT",
        ...val,
        note: val?.note === "" ? "<p></p>" : val?.note,
      };

      dispatch(
        updateVendorApi({
          data: editSubObj,
          finalCallback: () => {
            setSubmitting(false);
          },
          successCallback: () => {
            form.resetFields();
            fetchAllVendors();
            navigate(-1);
          },
          failureCallback: (val: any) => {
            setEditVendorErrors(val);
          },
        })
      );
      return;
    }
  };

  const fetchAllVendors = () => {
    dispatch(
      getAllVendorsApi({
        finalCallback: () => {},
        page: undefined,
        data: undefined,
        pageSize: window.DEFAULT_PAGE_SIZE,
        successCallback: () => {},
        order: undefined,
        orderBy: undefined,
      })
    );
  };

  return (
    <div>
      <CreateVendorsComponent
        onFinish={onFinish}
        form={form}
        submitting={submitting}
        isEditPage={isEditPage}
        initialData={initialData}
        categories={setup?.vendor_categories}
        editVendorErrors={editVendorErrors}
      />
    </div>
  );
};

export default CreateVendorsContainer;
