import { message } from "antd";
import { VENDOR } from "../constants/url";
import { catchErrors } from "../utils/catchErrors";
import { genericApiCall, getApiCall } from "../utils/servicesBaseUtil";
import { getAllVendorsSuccess } from "../store/slice/vendors.slice";
import { getEncodedParams, generateFormData } from "../utils/generateFormData";

export const getAllVendorsApi = ({
  data,
  page,
  pageSize,
  finalCallback,
  successCallback,
  order,
  orderBy,
}) => {
  return (dispatch) => {
    let url = `${VENDOR}?page=${page ?? 1}`;
    if (pageSize) {
      url = `${url}&per_page=${pageSize ?? window.DEFAULT_PAGE_SIZE}`;
    }
    if (data) {
      if (data?.name) {
        url = `${url}&name=${data?.name}`;
      }
      if (data?.category) {
        url = `${url}&category=${data?.category}`;
      }
    }
    if (orderBy && order) {
      url = `${url}&order=${order}&orderby=${orderBy}`;
    }

    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(
            getAllVendorsSuccess({
              vendors: responseJson?.data?.data,
              pageSize: responseJson?.data?.per_page,
              total: responseJson?.data?.total,
            })
          );
          successCallback();
        } else {
        }
      })
      .catch((error) => {
        catchErrors(error, url);
      })
      .finally(() => {
        if (finalCallback) {
          finalCallback();
        }
      });
  };
};

export const getAllTasksApi = ({
  data,
  id,
  page,
  pageSize,
  finalCallback,
  successCallback,
}) => {
  return (dispatch) => {
    let url = `${VENDOR}/${id}/task?page=${page ?? 1}`;

    if (pageSize) {
      url = `${url}&per_page=${pageSize ?? window.DEFAULT_PAGE_SIZE}`;
    }

    if (data) {
      if (data?.task_name) {
        url = `${url}&name=${data?.task_name}`;
      }
      if (data?.event_name) {
        url = `${url}&event_name=${data?.event_name}`;
      }
      if (data?.status) {
        url = `${url}&status=${data?.status}`;
      }
      if (data?.start_date && data?.end_date) {
        url = `${url}&start_date=${data?.start_date}&end_date=${data?.end_date}`;
      }
    }

    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson);
        } else {
        }
      })
      .catch((error) => {
        catchErrors(error, url);
      })
      .finally(() => {
        if (finalCallback) {
          finalCallback();
        }
      });
  };
};

export const getSingleVendorApi = ({ id, successCallback, finalCallback }) => {
  return (dispatch) => {
    let url = `${VENDOR}/${id}`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson);
        }
      })
      .catch((error) => {
        catchErrors(error, url);
      })
      .finally(() => {
        finalCallback();
      });
  };
};

export const createVendorApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${VENDOR}/create`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback(responseJson?.data?.id);
        } else {
          failureCallback(responseJson?.data?.errors);
        }
      })
      .catch((error) => {
        catchErrors(error, url);
      })
      .finally(() => {
        finalCallback();
      });
  };
};

export const updateVendorApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${VENDOR}/${data?.id}/update`;

    // let formData = getEncodedParams(data);
    let formData = generateFormData(data);
    // let formData = new FormData();
    // formData.append("name", data?.name);
    // formData.append("address", data?.address);
    // formData.append("category", data?.category);
    // formData.append("company_name", data?.company_name);
    // formData.append("email", data?.email);
    // formData.append("grade", data?.grade);
    // formData.append("mobile", data?.mobile);
    // formData.append("notes", data?.notes);
    // formData.append("phone_number", data?.phone_number);
    // formData.append("_method", data?._method);

    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback();
        } else {
          failureCallback(responseJson?.data?.errors);
        }
      })
      .catch((error) => {
        catchErrors(error, url);
      })
      .finally(() => {
        finalCallback();
      });
  };
};

export const deleteVendorsApi = ({ id, finalCallback, successCallback }) => {
  return (dispatch) => {
    let url = `${VENDOR}/${id}/delete`;
    genericApiCall({ url: url, method: "DELETE" })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback();
        } else {
          message.error(responseJson?.message);
        }
      })
      .catch((error) => {
        catchErrors(error, url);
      })
      .finally(() => {
        finalCallback();
      });
  };
};
