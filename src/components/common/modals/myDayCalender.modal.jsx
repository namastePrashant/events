import { Table } from "antd";
import AppModal from "./primaryModal";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { toggleMyDayCalenderModal } from "../../../store/slice/togglers.slice";
import { MdOutlineOpenInNew } from "react-icons/md";
import moment from "moment";

const MyDayCalenderModal = (props) => {
  const { data, singleFunctionData } = props;

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const showMyDayCalenderModal = state.togglers.showMyDayCalenderModal;

  const closeModal = () => {
    dispatch(toggleMyDayCalenderModal(false));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Assignee",
      // dataIndex: "name",
      render: (name, data) => {
        return <div className="event_eventName">{data?.vendor?.name}</div>;
      },
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "20%",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      width: "20%",
    },
    {
      title: "Due Date ",
      // dataIndex: "due_date",
      render: (name, data) => {
        return (
          <div className="event_eventName">
            {data?.due_date
              ? moment(data?.due_date).format("YYYY-MM-DD")
              : "N/A"}
          </div>
        );
      },
      width: "20%",
    },
  ];

  // console.log("data", data);
  // console.log("singleFunctionData", singleFunctionData);

  return (
    <AppModal
      visible={showMyDayCalenderModal}
      title={
        <div
          onClick={() => {
            window.open(`/events/${singleFunctionData?.event_id}`);
          }}
          className="day-info-modal__title"
        >
          {data?.title} <MdOutlineOpenInNew />
        </div>
      }
      onCancel={closeModal}
      width={1000}
      destroyOnClose={true}
      onOk={closeModal}
    >
      {showMyDayCalenderModal ? (
        <>
          <h4>Tasks</h4>
          <div className="card page-card">
            <Table
              size="small"
              columns={columns}
              dataSource={singleFunctionData?.tasks}
              pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                position: ["bottomRight"],
                className: "table-pagination",
                pageSizeOptions: ["5", "10", "15", "20", "50", "100"],
                showTotal: () =>
                  `Total ${singleFunctionData?.tasks?.length} entries`,
              }}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </AppModal>
  );
};

export default MyDayCalenderModal;
