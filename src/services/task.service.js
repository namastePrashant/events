import { message } from "antd";
import { TASK } from "../constants/url";
import { catchErrors } from "../utils/catchErrors";
import { getEncodedParams } from "../utils/generateFormData";
import { genericApiCall, getApiCall } from "../utils/servicesBaseUtil";

export const createTaskApi = ({ data, finalCallback, successCallback }) => {
  return dispatch => {
    let url = `${TASK}/create`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message)
          successCallback(responseJson?.data)
        } else {
          message.error(responseJson?.message)
        }
      })
      .catch((error) => {
        catchErrors(error, url)
      })
      .finally(() => {
        finalCallback();
      })

  }
}

export const updateTaskApi = ({ data, finalCallback, successCallback }) => {
  return dispatch => {
    let url = `${TASK}/${data?.id}/update`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message)
          successCallback(responseJson?.data)
        } else {
          message.error(responseJson?.message)
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

export const deleteTaskApi = ({ id, finalCallback, successCallback }) => {
  return dispatch => {
    let url = `${TASK}/${id}/delete`;
    genericApiCall({ url: url, method: "DELETE" })
      .then((responseJson) => {
        if (responseJson?.success) {
          message.success(responseJson?.message)
          successCallback()
        } else {
          message.error(responseJson?.message)
        }
      })
      .catch(error => {
        catchErrors(error, url)
      })
      .finally(() => {
        finalCallback()
      })
  }
}

export const changeTaskPriorityApi = ({ data, successCallback, finalCallback }) => {
  return dispatch => {
    let url = `${TASK}/change-priority`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson?.data)
          message.success(responseJson?.message)
        } else {
          message.error(responseJson?.message)
        }
      })
      .catch(error => {
        catchErrors(error, url)
      })
      .finally(() => {
        finalCallback();
      })
  }
}

export const changeStatusApi = ({ data, successCallback, finalCallback }) => {
  return dispatch => {
    let url = `${TASK}/change-status`;
    let formData = getEncodedParams(data);
    genericApiCall({ url: url, method: "POST", data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson?.data)
          message.success(responseJson?.message)
        } else {
          message.error(responseJson?.message)
        }
      })
      .catch(error => {
        catchErrors(error, url)
      })
      .finally(() => {
        finalCallback();
      })
  }
}

export const reorderTaskApi = ({ data, finalCallback, successCallback, failureCallback }) => {
  return dispatch => {
    let url = `${TASK}/order`;
    let formData = new FormData();
    data.forEach((item, index) => {
      formData.append(`tasks[${index}][id]`, item.id);
      formData.append(`tasks[${index}][order]`, item.order);
    });
    genericApiCall({ url: url, method: 'POST', data: formData })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback()
        } else {
          message.error(responseJson?.message)
          failureCallback()
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

export const getDashboardTasksApi = ({ day, finalCallback, successCallback }) => {
  return dispatch => {
    let url = `${TASK}/dashboard?type=${day}`;
    getApiCall({ url: url })
      .then((responseJson) => {
        if (responseJson?.success) {
          successCallback(responseJson?.data)
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
  }
}