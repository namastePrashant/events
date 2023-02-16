import { SETUP } from "../constants/url";
import { catchErrors } from "../utils/catchErrors";
import { getApiCall } from "../utils/servicesBaseUtil";
import { getSetupSuccess } from "../store/slice/setup.slice";

export const getAllSetupApi = () => {
  return (dispatch) => {
    let url = `${SETUP}`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(getSetupSuccess(responseJson?.data));
        }
      })
      .catch((error) => {
        catchErrors(error, url);
      })
      .finally(() => {});
  };
};
