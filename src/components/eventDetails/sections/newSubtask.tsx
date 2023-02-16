import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form } from "antd";
import { MdAdd } from "react-icons/md";

interface NewSubtaskInterface {
  taskItem?: any
  handleSubTaskInputChange?: any
  subtaskNameValue?: any
  setSubtaskNameValue?: any
  submittingSubtask?: boolean
}

const NewSubtask: React.FC<NewSubtaskInterface> = (props) => {
  const {
    taskItem,
    handleSubTaskInputChange,
    subtaskNameValue,
    setSubtaskNameValue,
    submittingSubtask } = props;
  const [hasAddNewSubTask, setHasAddNewSubTask] = useState(false)


  useEffect(() => {
    if (submittingSubtask == false) {
      setHasAddNewSubTask(false)
    }
  }, [submittingSubtask])


  return (
    <>
      {hasAddNewSubTask ? (
        <div className="task__new-sub-task">
          <Form >
            <Row align="middle">
              {/* <MdInbox color="#B4BCC7" className="icon" size={16} /> */}

              <Col span={12}>
                <Form.Item name="name">
                  <Input
                    placeholder="New Sub Task"
                    value={subtaskNameValue}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      setSubtaskNameValue(e.target.value)
                    }
                    onFocus={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Button
                  htmlType="submit"
                  onClick={(e) => {
                    handleSubTaskInputChange({
                      name: "name",
                      value: subtaskNameValue,
                      data: {
                        parent_id: taskItem?.id,
                      },
                    });
                    e.stopPropagation();
                  }}
                  loading={submittingSubtask}
                >
                  Save
                </Button>
                <Button
                  onClick={(e) => {
                    setHasAddNewSubTask(false);
                    e.stopPropagation();
                  }}
                  type="dashed"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <></>
      )}
      {(hasAddNewSubTask) ? (
        <></>
      ) : (
        <Button
          type="dashed"
          onClick={() => {
            setHasAddNewSubTask(!hasAddNewSubTask)
          }}
        >
          <MdAdd />
          Add New SubTask
        </Button>
      )}
    </>
  )
}

export default NewSubtask;
