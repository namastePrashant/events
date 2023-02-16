import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import { Form } from "antd";

import EventDetailComponent from "../../components/eventDetails";
import {
  getSingleEventApi,
  favoriteEventApi,
  getAllFavoriteEventsApi,
  deleteEventsApi,
} from "../../services/events.service";
import {
  deleteFunctionApi,
  createFunctionApi,
  updateFunctionApi,
  getSingleFunctionApi,
  reorderFunctionApi,
  changeFunctionStatusApi,
} from "../../services/function.service";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  toggleFunctionCreateModal,
  toggleFunctionNoteModal,
} from "../../store/slice/togglers.slice";
import {
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
  changeTaskPriorityApi,
  changeStatusApi,
  reorderTaskApi,
} from "../../services/task.service";

interface EventDetailsInterface {}

const EventDetails: React.FC<EventDetailsInterface> = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params?.id;
  const [data, setData] = useState<any>();
  const [functionData, setFunctionData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingFunctions, setLoadingFunctions] = useState(false);
  const [hasAddNewTask, setHasAddNewTask] = useState(false);
  const [hasAddNewSubTask, setHasAddNewSubTask] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [newTaskFunctionId, setNewTaskFunctionId] = useState<any>();
  const [submittingSubtask, setSubmittingSubtask] = useState<boolean>(false);
  const [submittingTask, setSubmittingTask] = useState<boolean>(false);

  const [createFunctionErrors, setCreateFunctionErrors] = useState(undefined);

  const [updateFunctionErrors, setUpdateFunctionErrors] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    fetchEventDetail();
  }, [id]);

  const fetchEventDetail = () => {
    dispatch(
      getSingleEventApi({
        id: id,
        successCallback: (response: any) => {
          setData(response?.data);
          setFunctionData(response?.data?.functions);
        },
        finalCallback: () => {
          setLoading(false);
        },
      })
    );
  };

  const fetchSingleFunction = (id: any) => {
    dispatch(
      getSingleFunctionApi({
        id: id,
        finalCallback: () => {},
        successCallback: (data: any) => {
          updateEventData(data);
        },
      })
    );
  };

  const updateEventData = (newFunctionObj: any) => {
    let newData = [newFunctionObj];
    let newArr = functionData?.map(
      (obj?: any) =>
        newData?.find((nData?: any) => nData?.id === obj?.id) || obj
    );
    setFunctionData(newArr);
  };

  const fetchAllFavoriteEvents = () => {
    dispatch(
      getAllFavoriteEventsApi({
        finalCallback: () => {},
      })
    );
  };

  const handleFavorite = () => {
    dispatch(
      favoriteEventApi({
        id: id,
        finalCallback: () => {},
        successCallback: () => {
          fetchEventDetail();
          fetchAllFavoriteEvents();
        },
      })
    );
  };

  const handleDeleteFunction = (val: any) => {
    dispatch(
      deleteFunctionApi({
        id: val,
        finalCallback: () => {},
        successCallback: () => {
          fetchEventDetail();
        },
      })
    );
  };

  const handleFunctionCreateSubmit = (val: any) => {
    if (val?.id) {
      let obj = {
        ...val,
        _method: "PUT",
      };
      updateFunction(obj);
      return;
    }
    dispatch(
      createFunctionApi({
        data: val,
        finalCallback: () => {},
        successCallback: () => {
          fetchEventDetail();
          dispatch(toggleFunctionCreateModal(false));
        },
        failureCallback: (val: any) => {
          setCreateFunctionErrors(val);
        },
      })
    );
  };

  const updateFunction = (data: any) => {
    dispatch(
      updateFunctionApi({
        data: data,
        finalCallback: () => {},
        successCallback: () => {
          fetchEventDetail();
          dispatch(toggleFunctionCreateModal(false));
          dispatch(toggleFunctionNoteModal(false));
        },
        failureCallback: (val: any) => {
          setUpdateFunctionErrors(val);
        },
      })
    );
  };

  const handleFunctionDateSelection = (val?: any, data?: any) => {
    let obj = {
      ...data,
      _method: "PUT",
      start_date: moment(val[0]).format("YYYY-MM-DD hh:mm:ss"),
      end_date: moment(val[1]).format("YYYY-MM-DD hh:mm:ss"),
    };
    updateFunction(obj);
  };

  const handleUpdateNote = (val?: any, data?: any) => {
    let obj = {
      ...data,
      _method: "PUT",
      note: val?.note === "" ? "<p></p>" : val?.note,
    };
    if (data?.isTask || data?.isSubTask) {
      updateTask(obj);
      return;
    }
    updateFunction(obj);
  };

  const handleCreateNewTask = (functionId?: any, index?: number) => {
    setNewTaskFunctionId(functionId);
    setHasAddNewTask(!hasAddNewTask);
    return;
  };

  const handleTaskInputChange = (data?: any) => {
    //for old tasks
    if (data?.data?.id) {
      let obj = {
        ...data?.data,
        _method: "PUT",
        [data?.name]: data?.value,
      };
      let subObj = _.omit(obj, [
        "created_at",
        "deleted_at",
        "order",
        "status",
        "subTasks",
        "updated_at",
        "vendor",
      ]);
      updateTask(subObj);
      return;
    }

    //for new tasks
    let createObj = {
      function_id: data?.data?.function_id,
      [data?.name]: data?.value,
    };
    setSubmittingTask(true);
    dispatch(
      createTaskApi({
        data: createObj,
        finalCallback: () => {
          setSubmittingTask(false);
        },
        successCallback: (data: any) => {
          fetchSingleFunction(data?.function_id);
          form.resetFields();
        },
      })
    );
  };

  const updateTask = (obj?: any) => {
    dispatch(
      updateTaskApi({
        data: obj,
        finalCallback: () => {},
        successCallback: (data: any) => {
          fetchSingleFunction(data?.parent?.function_id ?? data?.function_id);
          dispatch(toggleFunctionNoteModal(false));
        },
      })
    );
  };

  const handleSubTaskInputChange = (data?: any) => {
    let obj = {
      parent_id: data?.data?.parent_id,
      [data?.name]: data?.value,
    };
    setSubmittingSubtask(true);
    dispatch(
      createTaskApi({
        data: obj,
        finalCallback: () => {
          setSubmittingSubtask(false);
        },
        successCallback: (data: any) => {
          fetchSingleFunction(data?.parent?.function_id);
          setHasAddNewSubTask(false);
          form.resetFields();
        },
      })
    );
  };

  const handleDeleteTask = (taskId: any) => {
    dispatch(
      deleteTaskApi({
        id: taskId,
        finalCallback: () => {},
        successCallback: () => {
          fetchEventDetail();
        },
      })
    );
  };

  const handleReorderFunction = (data: any) => {
    let newArr: any = [];
    data?.forEach((d: any, dIndex: any) => {
      newArr.push({
        id: d?.id,
        order: dIndex,
      });
    });
    dispatch(
      reorderFunctionApi({
        data: newArr,
        finalCallback: () => {},
        successCallback: () => {},
        failureCallback: () => {},
      })
    );
  };

  const handleReorderTask = (data: any, functionId?: any) => {
    let newArr: any = [];
    data?.forEach((d: any, dIndex: any) => {
      newArr.push({
        id: d?.id,
        order: dIndex,
      });
    });
    dispatch(
      reorderTaskApi({
        data: newArr,
        finalCallback: () => {},
        successCallback: () => {
          fetchSingleFunction(functionId);
        },
        failureCallback: () => {},
      })
    );
  };

  const handleTaskPriorityChange = (data?: any) => {
    dispatch(
      changeTaskPriorityApi({
        data: data,
        finalCallback: () => {},
        successCallback: (responseData: any) => {
          fetchSingleFunction(
            responseData?.parent?.function_id ?? responseData?.function_id
          );
        },
      })
    );
  };

  const handleTaskStatusChange = (data?: any) => {
    dispatch(
      changeStatusApi({
        data: data,
        finalCallback: () => {},
        successCallback: (responseData: any) => {
          fetchSingleFunction(
            responseData?.parent?.function_id ?? responseData?.function_id
          );
        },
      })
    );
  };

  const arraymove = (arr?: any, fromIndex?: any, toIndex?: any) => {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  };

  const handleMoveDown = (currentIndex: number, tasks?: any) => {
    let newArr = arraymove(tasks, currentIndex, currentIndex + 1);
    handleReorderTask(newArr, tasks[0]?.function_id);
  };

  const handleMoveUp = (currentIndex: number, tasks?: any) => {
    let newArr = arraymove(tasks, currentIndex, currentIndex - 1);
    handleReorderTask(newArr, tasks[0]?.function_id);
  };

  const handleVendorSelection = (val?: any, data?: any) => {
    handleTaskInputChange({
      name: "vendor_id",
      value: val ?? " ",
      data: data,
    });
  };

  const handleDeleteEvent = (id: number) => {
    dispatch(
      deleteEventsApi({
        id: id,
        finalCallback: () => {},
        successCallback: () => {
          navigate("/events");
        },
      })
    );
  };

  const handleFunctionStatusChange = (obj: any) => {
    dispatch(
      changeFunctionStatusApi({
        data: obj,
        finalCallback: () => {},
        successCallback: () => {
          fetchSingleFunction(obj?.function_id);
        },
      })
    );
  };

  return (
    <div>
      <EventDetailComponent
        data={data}
        functionData={functionData}
        loading={loading}
        loadingFunctions={loadingFunctions}
        handleFavorite={handleFavorite}
        handleDeleteFunction={handleDeleteFunction}
        handleFunctionCreateSubmit={handleFunctionCreateSubmit}
        id={id}
        handleFunctionDateSelection={handleFunctionDateSelection}
        handleUpdateNote={handleUpdateNote}
        handleCreateNewTask={handleCreateNewTask}
        setHasAddNewTask={setHasAddNewTask}
        hasAddNewTask={hasAddNewTask}
        handleTaskInputChange={handleTaskInputChange}
        handleDeleteTask={handleDeleteTask}
        handleReorderFunction={handleReorderFunction}
        handleTaskPriorityChange={handleTaskPriorityChange}
        handleTaskStatusChange={handleTaskStatusChange}
        handleMoveDown={handleMoveDown}
        handleMoveUp={handleMoveUp}
        handleVendorSelection={handleVendorSelection}
        handleSubTaskInputChange={handleSubTaskInputChange}
        setHasAddNewSubTask={setHasAddNewSubTask}
        hasAddNewSubTask={hasAddNewSubTask}
        taskForm={form}
        handleDeleteEvent={handleDeleteEvent}
        handleFunctionStatusChange={handleFunctionStatusChange}
        newTaskFunctionId={newTaskFunctionId}
        submittingSubtask={submittingSubtask}
        submittingTask={submittingTask}
        setNewTaskFunctionId={setNewTaskFunctionId}
        createFunctionErrors={createFunctionErrors}
        updateFunctionErrors={updateFunctionErrors}
      />
    </div>
  );
};

export default EventDetails;
