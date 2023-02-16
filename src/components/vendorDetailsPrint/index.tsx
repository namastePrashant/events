import React, { useEffect } from "react";
import { Descriptions, Row, Col } from "antd";
import _ from "lodash";
import moment from "moment";
import { BiRectangle, BiCheckSquare } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import parse from "html-react-parser";

interface VendorDetailsPrintComponentInterface {
  data?: any;
  vendorDetails?: any;
}

const VendorDetailsPrintComponent: React.FC<
  VendorDetailsPrintComponentInterface
> = (props) => {
  const { data, vendorDetails } = props;

  useEffect(() => {
    setTimeout(() => {
      window.print();
      window.close();
    }, 300);
  }, []);

  return (
    <div className="print-container">
      <div className="main-title"> Clover Event Management</div>
      <div className="print-container__vendor">
        <div className="vendor-info">
          <Descriptions className="vendorProfile" size="small">
            <Descriptions.Item label="Vendor Name">
              {vendorDetails?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Company Name">
              {vendorDetails?.company_name ?? <i>N/A</i>}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              {vendorDetails?.phone_number ?? <i>N/A</i>}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {vendorDetails?.category ?? <i>N/A</i>}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {vendorDetails?.address ?? <i>N/A</i>}
            </Descriptions.Item>
            <Descriptions.Item label="Mobile Number">
              {vendorDetails?.mobile ?? <i>N/A</i>}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {vendorDetails?.email ?? <i>N/A</i>}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div>
          <Row className="task-label">
            <Col span={19} className="label">
              {data?.length} tasks
            </Col>
            <Col span={3} className="label">
              Due Date
            </Col>
            <Col span={2} className="label">
              Priority
            </Col>
          </Row>
        </div>
        <div>
          {data?.map((taskItem?: any, taskIndex?: any) => {
            return (
              <div className="task-item">
                <Row className="task-value">
                  <Col span={19} className="value">
                    <Row align="middle">
                      {taskItem?.status === "complete" ? (
                        <BiCheckSquare size={22} className="checkbox" />
                      ) : (
                        <BiRectangle size={22} className="checkbox" />
                      )}
                      <span className="task-value__name">
                        {taskItem?.name} ({taskItem?.event?.name} |{" "}
                        {taskItem?.function?.name}){" "}
                        <span className="task-value__name__locationIcon">
                          <MdLocationOn />{" "}
                          {taskItem?.function?.venue?.name ?? "N/A"}
                        </span>
                      </span>
                    </Row>
                  </Col>
                  <Col span={3} className="value">
                    {taskItem?.due_date ? (
                      moment(taskItem?.due_date).format("YYYY-MM-DD")
                    ) : (
                      <i>N/A</i>
                    )}
                  </Col>
                  <Col span={2} className="value">
                    {taskItem?.priority}
                  </Col>
                </Row>
                <div className="task-item__notes">
                  <span className="task-item__notes__title">Note: </span>
                  <div className="task-item__parsed-html">
                    {taskItem?.note ? (
                      parse(taskItem?.note)
                    ) : (
                      <div className="empty-notes"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VendorDetailsPrintComponent;
