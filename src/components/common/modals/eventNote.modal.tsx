import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

interface EventNoteModalInterface {
  data: any;
}

const EventNoteModal: React.FC<EventNoteModalInterface> = (props) => {
  const { data } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const EditModal = () => {
    return (
      <>
        <div className="eventDetail-noteTitle">
          <div className="eventDetail-noteEdit">{data?.name ?? "Note"}</div>
          <Button
            className="app-btn"
            onClick={() => {
              navigate(`/events/${data?.id}/edit`, { state: data });
            }}
          >
            Edit
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="eventDetailNoteSection">
      <Button
        type="link"
        onClick={showModal}
        className="event-details__buttons__button"
      >
        Notes
      </Button>
      <Modal
        title={<EditModal />}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div className="parsed-html">
          {data?.note ? (
            parse(data?.note === "null" || undefined ? "N/A" : data?.note)
          ) : (
            <i>Note N/A</i>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EventNoteModal;
