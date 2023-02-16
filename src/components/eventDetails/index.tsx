import React, { useState } from "react";
import { MdBookmark, MdMoreVert, MdOutlineAdd } from "react-icons/md";

import { IoMdHeartDislike, IoMdHeartEmpty, IoMdPrint } from "react-icons/io";

import { Button, Divider, Popover, Skeleton, Popconfirm, List } from "antd";
import { useNavigate, NavLink } from "react-router-dom";

import { useAppDispatch } from "../../hooks/reduxHooks";
import FunctionsComponent from "./sections/functions.eventDetails";
import CreateFunctionModal from "../common/modals/createFunctions.modal";
import FunctionNoteModal from "../common/modals/functionNote.modal";
import AssignVendorModal from "../common/modals/assignVendor.modal";
import {
  toggleFunctionCreateModal,
  storeEditFunctionData,
} from "../../store/slice/togglers.slice";

import { defaultEventColors } from "../../constants/colorPalette.constant";

import EventNoteModal from "../common/modals/eventNote.modal";

import moment from "moment";

interface EventDetailsComponentInterface {
  data?: any;
  functionData?: any;
  loading?: boolean;
  loading2?: boolean;
  loadingFunctions?: boolean;
  handleFavorite?: any;
  handleDeleteFunction?: any;
  handleFunctionCreateSubmit?: any;
  handleFunctionDateSelection?: any;
  id?: any;
  handleUpdateNote?: any;
  handleCreateNewTask?: any;
  setHasAddNewTask?: any;
  hasAddNewTask?: any;
  handleTaskInputChange?: any;
  handleDeleteTask?: any;
  handleReorderFunction?: any;
  handleTaskStatusChange?: any;
  handleTaskPriorityChange?: any;
  handleMoveUp?: any;
  handleMoveDown?: any;
  handleVendorSelection?: any;
  handleSubTaskInputChange?: any;
  setHasAddNewSubTask?: any;
  hasAddNewSubTask?: boolean;
  taskForm?: any;
  handleDeleteEvent?: any;
  handleFunctionStatusChange?: any;
  newTaskFunctionId?: any;
  submittingSubtask?: boolean;
  submittingTask?: boolean;
  setNewTaskFunctionId?: any;
  createFunctionErrors?: any;
  updateFunctionErrors?: any;
  open?: boolean;
}

const EventDetailsComponent: React.FC<EventDetailsComponentInterface> = (
  props
) => {
  const {
    data,
    loading,
    loadingFunctions,
    functionData,
    handleFavorite,
    handleDeleteFunction,
    handleFunctionCreateSubmit,
    id,
    handleFunctionDateSelection,
    handleUpdateNote,
    handleCreateNewTask,
    setHasAddNewTask,
    hasAddNewTask,
    handleTaskInputChange,
    handleDeleteTask,
    handleReorderFunction,
    handleTaskStatusChange,
    handleTaskPriorityChange,
    handleMoveDown,
    handleMoveUp,
    handleVendorSelection,
    handleSubTaskInputChange,
    hasAddNewSubTask,
    setHasAddNewSubTask,
    taskForm,
    handleDeleteEvent,
    handleFunctionStatusChange,
    newTaskFunctionId,
    submittingSubtask,
    submittingTask,
    setNewTaskFunctionId,
    createFunctionErrors,
    updateFunctionErrors,
  } = props;
  const dispatch = useAppDispatch();
  const [showPopover, setPopover] = useState(false);
  const [expandAll, setExpandAll] = useState<any>(false);

  const navigate = useNavigate();

  const handleVisibleChange = () => {
    setPopover(!showPopover);
  };

  const listData = Array.from({ length: 5 }).map((_, i) => ({}));

  const eventNameContent = (
    <div style={{ maxWidth: "500px", fontWeight: "500" }}>{data?.name}</div>
  );

  const content = () => {
    return (
      <>
        <div className="event-details__content">
          <a
            onClick={() => {
              navigate(`/events/${id}/edit`, { state: data });
            }}
          >
            Edit Event
          </a>
        </div>
        <div>
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              handleDeleteEvent(id);
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <>
          <div event-details__loadingWrapper>
            <div event-details__skeleton>
              <Skeleton.Input size="small" />
              <Skeleton.Input size="small" />
              <Skeleton.Input size="small" />
            </div>

            <div>
              <Skeleton.Button />
            </div>
          </div>
          <Divider />
          <List
            itemLayout="vertical"
            size="small"
            dataSource={listData}
            renderItem={() => (
              <List.Item>
                <Skeleton avatar paragraph={{ rows: 1 }}></Skeleton>
                <Divider />
              </List.Item>
            )}
          />
        </>
      ) : (
        <div className="card event-details">
          <div className="header">
            <div className="left-section">
              <MdBookmark
                className="bookmark-icon"
                color={data?.color_code ?? defaultEventColors}
              />
              <Popover content={eventNameContent} title="Event Name">
                <span className="name">{data?.name}</span>
              </Popover>

              <Popover
                content={content}
                placement="bottom"
                trigger="click"
                visible={showPopover}
                onVisibleChange={handleVisibleChange}
              >
                <MdMoreVert className="more" />
              </Popover>

              <div className="event-details__buttons">
                <span className="event-details__buttons__button">
                  {functionData?.length ?? 0} Functions
                </span>
                <Button
                  type="link"
                  onClick={(e) => {
                    window.open(`/events/${id}/print`);
                    e.stopPropagation();
                  }}
                  className="event-details__buttons__button"
                >
                  <IoMdPrint />
                  Print
                </Button>
                <Button
                  type="link"
                  onClick={(e) => {
                    handleFavorite();
                    e.stopPropagation();
                  }}
                  className="event-details__buttons__button"
                >
                  {data?.is_favourite ? (
                    <IoMdHeartDislike />
                  ) : (
                    <IoMdHeartEmpty />
                  )}
                  {data?.is_favourite ? "Unfavorite" : "Favorite"}
                </Button>

                <EventNoteModal data={data} />
                <Button
                  type="link"
                  onClick={(e) => {
                    setExpandAll(!expandAll);
                    e.stopPropagation();
                  }}
                  className="event-details__buttons__button"
                >
                  {expandAll ? "Collapse" : "Expand"} All
                </Button>
              </div>
            </div>

            <div>
              <Button
                type="primary"
                icon={<MdOutlineAdd />}
                onClick={() => {
                  dispatch(
                    toggleFunctionCreateModal({
                      showModal: true,
                    })
                  );
                  dispatch(storeEditFunctionData({}));
                }}
                className="mr-5 add-function-btn"
              >
                Add Function
              </Button>
            </div>
          </div>

          <div className="eventDate">
            {data?.start_date
              ? moment(data?.start_date).format("MMM D YYYY")
              : undefined}{" "}
            {"-"}{" "}
            {data?.end_date
              ? moment(data?.end_date).format("MMM D YYYY")
              : undefined}
          </div>

          {/* ...............................................BODY */}
          {functionData ? (
            <FunctionsComponent
              loading={loading}
              data={functionData}
              handleFunctionDateSelection={handleFunctionDateSelection}
              handleDeleteFunction={handleDeleteFunction}
              handleCreateNewTask={handleCreateNewTask}
              setHasAddNewTask={setHasAddNewTask}
              hasAddNewTask={hasAddNewTask}
              handleTaskInputChange={handleTaskInputChange}
              handleDeleteTask={handleDeleteTask}
              handleReorderFunction={handleReorderFunction}
              handleTaskStatusChange={handleTaskStatusChange}
              handleTaskPriorityChange={handleTaskPriorityChange}
              handleMoveDown={handleMoveDown}
              handleMoveUp={handleMoveUp}
              handleSubTaskInputChange={handleSubTaskInputChange}
              setHasAddNewSubTask={setHasAddNewSubTask}
              hasAddNewSubTask={hasAddNewSubTask}
              taskForm={taskForm}
              handleFunctionStatusChange={handleFunctionStatusChange}
              newTaskFunctionId={newTaskFunctionId}
              submittingSubtask={submittingSubtask}
              submittingTask={submittingTask}
              setNewTaskFunctionId={setNewTaskFunctionId}
              setExpandAll={setExpandAll}
              expandAll={expandAll}
              eventData={data}
              handleVendorSelection={handleVendorSelection}
            />
          ) : (
            <></>
          )}

          <CreateFunctionModal
            handleCreateSubmit={handleFunctionCreateSubmit}
            eventId={id}
            formReset={true}
            createFunctionErrors={createFunctionErrors}
            updateFunctionErrors={updateFunctionErrors}
          />
          <FunctionNoteModal
            data={functionData}
            handleUpdateNote={handleUpdateNote}
          />
          <AssignVendorModal handleVendorSelection={handleVendorSelection} />
        </div>
      )}
    </>
  );
};

export default EventDetailsComponent;
