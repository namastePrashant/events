import { CLIENT } from "../constants/url";
import { message } from "antd";
import { getEncodedParams, generateFormData } from "../utils/generateFormData";
import { genericApiCall, getApiCall } from "../utils/servicesBaseUtil";
import { catchErrors } from "../utils/catchErrors";
import { getClientsSuccess } from "../store/slice/clients.slice";

export const getAllClientsApi = ({
  search,
  finalCallback,
  page,
  pageSize,
  successCallback,
}) => {
  return (dispatch) => {
    let url = `${CLIENT}?page=${page ?? 1}`;
    if (search) {
      url = `${url}&search=${search}`;
    }
    if (pageSize) {
      url = `${url}&per_page=${pageSize ?? window.DEFAULT_PAGE_SIZE}`;
    }
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson);
          dispatch(getClientsSuccess(responseJson?.data));
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

export const createClientApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${CLIENT}/create`;
    let formData = getEncodedParams(data);

    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback(responseJson?.data);
        } else {
          // message.error(responseJson?.message);
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

export const updateClientApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${CLIENT}/${data?.id}/update`;

    let formData = generateFormData(data);

    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback();
        } else {
          message.error(responseJson?.message);
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

export const deleteClientsApi = ({ id, finalCallback, successCallback }) => {
  return (dispatch) => {
    let url = `${CLIENT}/${id}/delete`;
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
