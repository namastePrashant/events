import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, Form } from "antd";
import { MdAdd } from 'react-icons/md';

interface NewTaskComponentInterface {
  functionId?: any,
  newTaskFunctionId?: any,
  handleTaskInputChange?: any
  hasAddNewTaskParent?: any
  handleCreateNewTask?: any
  submittingTask?: any

}

const NewTaskComponent: React.FC<NewTaskComponentInterface> = (props) => {
  const {
    functionId,
    handleTaskInputChange,
    hasAddNewTaskParent,
    handleCreateNewTask,
    submittingTask
  } = props;

  const [taskNameValue, setTaskNameValue] = useState("");
  const [hasAddNewTask, setHasAddNewTask] = useState<boolean>(false);


  useEffect(() => {
    if (submittingTask == false) {
      setHasAddNewTask(false)
      setTaskNameValue("")
    }
  }, [submittingTask])

  return (
    <div>
      {hasAddNewTask ? (
        <div className="task__new-task mt-15">
          <Form >
            <Row>
              <Col span={12}>
                <Form.Item name="name">
                  <Input
                    placeholder="New Tasks"
                    value={taskNameValue}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setTaskNameValue(e.target.value)}
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
                    handleTaskInputChange({
                      name: "name",
                      value: taskNameValue,
                      data: {
                        function_id: functionId,
                      },
                    });
                    handleCreateNewTask();
                    e.stopPropagation();
                  }}
                  loading={submittingTask}
                >
                  Save
                </Button>
                <Button
                  onClick={(e) => {
                    handleCreateNewTask();
                    setHasAddNewTask(false);
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
      )
      }

      {
        hasAddNewTask ?
          <></>
          :
          <Button
            type="dashed"
            onClick={(e) => {
              setHasAddNewTask(true)
              // handleCreateNewTask(functionItem?.id, functionIndex);
              // setActiveKey(functionItem?.id)
              // if (newTaskFunctionId === functionItem?.id) {
              //   setNewTaskFunctionId()
              // } else {
              //   setNewTaskFunctionId(functionItem?.id)
              // }
              e.stopPropagation();
            }}
            className="mt-15"
          >
            <MdAdd />
            Add New Task
          </Button>
      }
    </div>
  )
}

export default NewTaskComponent;
