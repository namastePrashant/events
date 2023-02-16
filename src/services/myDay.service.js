import { MYDAY, EVENT } from "../constants/url";
import { catchErrors } from "../utils/catchErrors";
import { getApiCall } from "../utils/servicesBaseUtil";

export const getAllWorkListApi = ({ data, finalCallback, successCallback }) => {
  return (dispatch) => {
    let url = `${MYDAY}/worklist`;
    if (data?.date) {
      url = `${url}?date=${data?.date}`;
    }

    if (data?.type) {
      url = `${url}&type=${data?.type}`;
    }

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

export const getTaskSummaryApi = ({ data, finalCallback, successCallback }) => {
  return (dispatch) => {
    let url = `${EVENT}/task-summary`;

    if (data?.date) {
      url = `${url}?date=${data?.date}`;
    }
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

export const getCalendarViewApi = ({
  finalCallback,
  successCallback,
  data,
}) => {
  return (dispatch) => {
    let url = `${MYDAY}/calender-new?year=${data?.year}&month=${data?.month}`;
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
