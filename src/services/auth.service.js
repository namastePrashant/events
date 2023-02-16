import { message } from "antd";

import { setLocalStorage } from "../utils/localStorage";
import { LOGIN, REGISTER } from "../constants/url";
import { FORGOT_PASSWORD } from "../constants/url";
import { catchErrors } from "../utils/catchErrors";
import { genericApiCall } from "../utils/servicesBaseUtil";
import { getEncodedParams } from "../utils/generateFormData";
import { storeUserDetails, storeToken } from "../store/slice/profile.slice";

export const loginApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = LOGIN;
    let formData = getEncodedParams(data);
    genericApiCall({
      url: url,
      method: "POST",
      data: formData,
    })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          dispatch(storeUserDetails(responseJson?.data?.user));
          dispatch(storeToken(responseJson?.data?.token));
          setLocalStorage("aioToken", responseJson?.data?.token);
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

export const forgotPasswordApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return () => {
    let url = FORGOT_PASSWORD;
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

export const registerApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${REGISTER}`;
    let formData = getEncodedParams(data);

    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          setLocalStorage("aioToken", responseJson?.data?.token);
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
