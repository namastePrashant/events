import { PROFILE } from "../constants/url";
import { message } from "antd";
import { catchErrors } from "../utils/catchErrors";
import { getEncodedParams } from "../utils/generateFormData";
import { genericApiCall, getApiCall } from "../utils/servicesBaseUtil";
import { getAllProfilesSuccess } from "../store/slice/profile.slice";

export const getAllProfilesApi = ({ data, finalCallback }) => {
  return (dispatch) => {
    let url = PROFILE;

    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(getAllProfilesSuccess(responseJson?.data));
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

export const createProfileApi = ({ data, finalCallback, successCallback }) => {
  return (dispatch) => {
    let url = `${PROFILE}/create`;
    let formData = formData.append(data);

    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback(responseJson?.data?.id);
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

export const updateProfileApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${PROFILE}/update`;

    let formData = new FormData();
    formData.append("name", data?.name);
    formData.append("phone", data?.phone);
    formData.append("profile_pic", data?.profile_pic);
    formData.append("email", data?.email);
    formData.append("_method", data?._method);

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

export const changePasswordApi = ({
  data,

  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${PROFILE}/change-password`;
    let formData = getEncodedParams(data);
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
