import React, { useEffect, useState } from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { Spin, Row, Button } from "antd";
import { Link } from "react-router-dom";

import { getDashboardTasksApi } from "../../../services/task.service";
import { useAppDispatch } from "../../../hooks/reduxHooks";

interface NewTasklistSectionInterface {
  day?: string;
  onSeeMoreClick?: any;
}

const NewTasklistSection: React.FC<NewTasklistSectionInterface> = (props) => {
  const { day, onSeeMoreClick } = props;
  const dispatch = useAppDispatch();
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasklist();
  }, []);

  const fetchTasklist = () => {
    setLoading(true);
    dispatch(
      getDashboardTasksApi({
        day: day,
        finalCallback: () => {
          setLoading(false);
        },
        successCallback: (data?: any) => {
          setTaskData(data);
        },
      })
    );
  };

  return (
    <div className="card task-list">
      <h3 className="dashboard-card-title">Task List ({day})</h3>
      {loading ? (
        <Row align="middle" justify="center" className="mt-15">
          <Spin />
        </Row>
      ) : (
        <>
          {taskData?.length === 0 ? <i>No task available</i> : <></>}
          {taskData?.map((tData?: any, tDataIndex?: any) => {
            return (
              <div className="task-list__task">
                <BsFillCircleFill
                  color="#53575E"
                  size={8}
                  style={{ marginRight: 5 }}
                />{" "}
                {tData?.name} ({tData?.function?.name}) -{" "}
                <Link to={`events/${tData?.event?.id}`}>
                  {tData?.event?.name}
                </Link>
              </div>
            );
          })}
          {taskData?.length === 0 ? (
            <></>
          ) : (
            <Row justify="end">
              <Button type="link" onClick={onSeeMoreClick}>
                See more
              </Button>
            </Row>
          )}
        </>
      )}
    </div>
  );
};

export default NewTasklistSection;
