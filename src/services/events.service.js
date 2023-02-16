import { message } from "antd";
import { EVENT } from "../constants/url";
import { catchErrors } from "../utils/catchErrors";
import { getEncodedParams, generateFormData } from "../utils/generateFormData";
import { genericApiCall, getApiCall } from "../utils/servicesBaseUtil";
import {
  getAllEventsSuccess,
  getEachEventSuccess,
  getAllFavoriteEventsSuccess,
  updateSummary,
  getAllRecentEvent,
} from "../store/slice/events.slice";
import moment from "moment";

export const getAllEventsApi = ({
  data,
  page,
  finalCallback,
  pageSize,
  order,
  orderBy,
  successCallback,
}) => {
  return (dispatch) => {
    let url = `${EVENT}?page=${page ?? 1}`;
    if (pageSize) {
      url = `${url}&per_page=${pageSize ?? window.DEFAULT_PAGE_SIZE}`;
    }
    if (data) {
      if (data?.name) {
        url = `${url}&name=${data?.name}`;
      }
      if (data?.start_date) {
        url = `${url}&start_date=${moment(data?.start_date).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(data?.end_date).format("YYYY-MM-DD")}`;
      }
      if (data?.filter) {
        url = `${url}&type=${data?.filter}`;
      }
    }
    if (orderBy && order) {
      url = `${url}&order=${order}&orderby=${orderBy}`;
    }

    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(
            getAllEventsSuccess({
              events: responseJson?.data?.data,
              pageSize: responseJson?.data?.per_page,
              total: responseJson?.data?.total,
            })
          );
          successCallback(responseJson?.data?.data);
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

export const getSingleEventApi = ({ id, successCallback, finalCallback }) => {
  return (dispatch) => {
    let url = `${EVENT}/${id}`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(
            getEachEventSuccess({
              startDate: responseJson?.data?.start_date,
              endDate: responseJson?.data?.end_date,
            })
          );
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

export const createEventApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${EVENT}/create`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback(responseJson?.data?.id);
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

export const updateEventApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${EVENT}/${data?.id}/update`;

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

export const deleteEventsApi = ({ id, finalCallback, successCallback }) => {
  return (dispatch) => {
    let url = `${EVENT}/${id}/delete`;
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

export const getAllFavoriteEventsApi = ({ finalCallback }) => {
  return (dispatch) => {
    let url = `${EVENT}/favourite`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(getAllFavoriteEventsSuccess(responseJson?.data));
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

export const getEventDataApi = ({
  category,
  finalCallback,
  successCallback,
}) => {
  return (dispatch) => {
    let url = `${EVENT}/data?type=${category}`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson?.data?.function);
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

export const favoriteEventApi = ({ finalCallback, id, successCallback }) => {
  return (dispatch) => {
    let url = `${EVENT}/${id}/favourite`;
    genericApiCall({ url: url, method: "POST" })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message);
          successCallback(responseJson?.data?.function);
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

export const reorderEventApi = ({
  data,
  finalCallback,
  successCallback,
  failureCallback,
}) => {
  return (dispatch) => {
    let url = `${EVENT}/order`;
    let formData = new FormData();
    data.forEach((item, index) => {
      formData.append(`events[${index}][id]`, item.id);
      formData.append(`events[${index}][order]`, item.order);
    });
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback();
        } else {
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

export const getEventSummaryApi = ({ finalCallback }) => {
  return (dispatch) => {
    let url = `${EVENT}/summary`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(updateSummary(responseJson?.data));
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

export const getRecentEventApi = ({ finalCallback }) => {
  return (dispatch) => {
    let url = `${EVENT}/recent-events?per_page=5`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          dispatch(getAllRecentEvent(responseJson?.data?.data));
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
