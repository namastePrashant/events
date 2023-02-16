import React, { useEffect, useState } from "react";

import { useAppDispatch } from "../../hooks/reduxHooks";
import DashboardComponent from "../../components/dashboard";
import {
  getEventSummaryApi,
  getRecentEventApi,
} from "../../services/events.service";
import { getCountSuccess } from "../../store/slice/count.slice";

import { getTaskSummaryApi } from "../../services/myDay.service";

interface DashboardContainerInterface { }

const DashboardContainer: React.FC<DashboardContainerInterface> = () => {
  const [counter, setCounter] = useState<any>({});

  const dispatch = useAppDispatch();

  dispatch(getCountSuccess(counter));

  useEffect(() => {
    fetchSummary();
    fetchRecentEvent();
    fetchTaskSummary();
  }, []);

  const fetchSummary = () => {
    dispatch(
      getEventSummaryApi({
        finalCallback: () => { },
      })
    );
  };

  const fetchTaskSummary = () => {
    dispatch(
      getTaskSummaryApi({
        finalCallback: () => {
        },
        successCallback: (data: any) => {
          setCounter(data);
        },
        data: undefined,
      })
    );
  };

  const fetchRecentEvent = () => {
    dispatch(
      getRecentEventApi({
        finalCallback: () => { },
      })
    );
  };

  return <DashboardComponent />;
};

export default DashboardContainer;
