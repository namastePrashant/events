import React, { useEffect, useState } from "react";
import { Form } from "antd";
import parse from "html-react-parser";

import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { toggleFunctionNoteModal } from "../../../store/slice/togglers.slice";
import AppModal from "./primaryModal";
import AppCkEditor from "../../common/editor/ckeditor";

interface FunctionNoteModalInterface {
  data?: any;
  title?: string;
  handleUpdateNote?: any;
}

const FunctionNoteModal: React.FC<FunctionNoteModalInterface> = (props) => {
  const { handleUpdateNote } = props;
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const {
    showFunctionNoteModal,
    editFunctionData,
  }: { showFunctionNoteModal?: boolean; editFunctionData?: any } =
    state.togglers;
  const [form] = Form.useForm();
  const [notes, setNotes] = useState(editFunctionData?.note);
  const isTask = editFunctionData?.isTask;
  const isSubTask = editFunctionData?.isSubTask;
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      note: editFunctionData?.note,
    });
    setNotes(editFunctionData?.note);
    setIsEdit(editFunctionData?.note ? false : true);
  }, [editFunctionData]);

  const closeModal = () => {
    dispatch(toggleFunctionNoteModal(false));
    setIsEdit(false);
  };

  const onFinish = (val?: any) => {
    handleUpdateNote({ note: notes }, editFunctionData);
  };

  return (
    <AppModal
      visible={showFunctionNoteModal}
      title={
        <>
          {`${isTask ? "Task" : isSubTask ? "Subtask" : "Function"} Notes - ${
            editFunctionData?.name
          }`}
        </>
      }
      onCancel={closeModal}
      onOk={() => {
        if (isEdit) {
          form.submit();
          setIsEdit(false);
        } else {
          setIsEdit(true);
          return;
        }
      }}
      okText={isEdit ? "Update" : "Edit"}
      width={1000}
    >
      <div className="note_modal">
        {showFunctionNoteModal && isEdit ? (
          <Form
            name="normal_login"
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{
              note: editFunctionData?.note,
            }}
          >
            <AppCkEditor
              value={notes}
              onChange={(data?: any) => {
                setNotes(data);
              }}
            />
          </Form>
        ) : notes ? (
          <div className="parsed-html">
            <div className="ck-content">{parse(notes)}</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </AppModal>
  );
};

export default FunctionNoteModal;
