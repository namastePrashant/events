import { message } from "antd";
import { FUNCTION } from "../constants/url";
import { catchErrors } from "../utils/catchErrors";
import { getEncodedParams, generateFormData } from "../utils/generateFormData";
import { genericApiCall, getApiCall } from "../utils/servicesBaseUtil";

export const createFunctionApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${FUNCTION}/create`;
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

export const updateFunctionApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${FUNCTION}/${data?.id}/update`;
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

export const deleteFunctionApi = ({ id, finalCallback, successCallback }) => {
  return (dispatch) => {
    let url = `${FUNCTION}/${id}/delete`;
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

export const getSingleFunctionApi = ({
  id,
  finalCallback,
  successCallback,
}) => {
  return (dispatch) => {
    let url = `${FUNCTION}/${id}`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson?.data);
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

export const reorderFunctionApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${FUNCTION}/order`;
    let formData = new FormData();
    data.forEach((item, index) => {
      formData.append(`functions[${index}][id]`, item.id);
      formData.append(`functions[${index}][order]`, item.order);
    });
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback();
        } else {
          message.error(responseJson?.message);
          failureCallback();
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

export const changeFunctionStatusApi = ({
  data,
  successCallback,
  finalCallback,
}) => {
  return (dispatch) => {
    let url = `${FUNCTION}/change-status`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson?.data);
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
