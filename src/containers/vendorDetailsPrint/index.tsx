import React, { useState, useEffect } from "react";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import _ from "lodash";

import VendorDetailsPrintComponent from "../../components/vendorDetailsPrint";
import {
  getAllTasksApi,
  getSingleVendorApi,
} from "../../services/vendors.service";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface VendorDetailPrintInterface {}

const VendorDetailPrint: React.FC<VendorDetailPrintInterface> = () => {
  const params = useParams();
  const id = params?.id;
  const [vendorLoading, setVendorLoading] = useState(true);
  const [taskLoading, setTaskLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [data, setData] = useState();
  const [vendorDetails, setVendorDetails] = useState();
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const pageSize = searchParams.get("pageSize");
  const page = searchParams.get("page");
  const status = searchParams.get("status");
  const taskName = searchParams.get("taskName");
  const eventName = searchParams.get("eventName");

  useEffect(() => {
    fetchVendorTasks();
    fetchVendorDetail();
  }, []);

  const fetchVendorTasks = (obj?: any) => {
    setTaskLoading(true);
    dispatch(
      getAllTasksApi({
        id: id,
        successCallback: (response: any) => {
          setData(response?.data?.data);
        },
        finalCallback: () => {
          setTaskLoading(false);
        },
        pageSize: pageSize ?? window.DEFAULT_PAGE_SIZE,
        page: page ?? 1,
        data: {
          start_date: startDate === "undefined" ? undefined : startDate,
          end_date: endDate === "undefined" ? undefined : endDate,
          status: status === "undefined" ? undefined : status,
          task_name: taskName === "undefined" ? undefined : taskName,
          event_name: eventName === "undefined" ? undefined : eventName,
          per_page: pageSize === "undefined" ? undefined : pageSize,
          page: page === "undefined" ? undefined : page,
        },
      })
    );
  };

  const fetchVendorDetail = () => {
    setVendorLoading(true);
    dispatch(
      getSingleVendorApi({
        id: id,
        successCallback: (response: any) => {
          setVendorDetails(response?.data);
        },
        finalCallback: () => {
          setVendorLoading(false);
        },
      })
    );
  };

  if (vendorLoading && taskLoading) {
    return <>Loading print...</>;
  }
  return (
    <VendorDetailsPrintComponent data={data} vendorDetails={vendorDetails} />
  );
};

export default VendorDetailPrint;
