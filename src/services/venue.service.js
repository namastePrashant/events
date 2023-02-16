import { message } from "antd";
import { VENUE } from "../constants/url";
import { catchErrors } from '../utils/catchErrors';
import { getEncodedParams } from '../utils/generateFormData';
import { genericApiCall, getApiCall } from '../utils/servicesBaseUtil';



export const getAllVenuesApi = ({ finalCallback, keyword, successCallback }) => {
  return dispatch => {
    let url = `${VENUE}?name=${keyword}`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson?.data)
        } else {

        }
      })
      .catch((error) => {
        catchErrors(error, url)
      })
      .finally(() => {
        finalCallback()
      })
  }
}

export const createVenueApi = ({
  data, finalCallback, successCallback, failureCallback
}) => {
  return dispatch => {
    let url = `${VENUE}/create`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson.success) {
          successCallback(responseJson?.data)
        } else {
          message.error(responseJson?.message);
          failureCallback(responseJson?.data?.errors);
        }
      })
      .catch((error) => {
        catchErrors(error, url)
      })
      .finally(() => {
        finalCallback()
      })
  }
}