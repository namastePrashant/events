import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Button, Layout, Menu, Form, message, Row, Col } from "antd";
import { MdQueue } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import _ from "lodash";

import { getAllSetupApi } from "../../services/setup.service";
import { sideNavPrimaryMenu } from "../../configs/sideNav.config";
import EventsSidenav from "./sections/events.sidenav";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  toggleVendorCreateModal,
  toggleClientCreateModal,
} from "../../store/slice/togglers.slice";
import CreateVendorModal from "../../components/common/modals/createVendor.modal";
import CreateClientModal from "../../components/common/modals/createClient.modal";
import {
  updateVendorApi,
  getAllVendorsApi,
  createVendorApi,
} from "../../services/vendors.service";

import {
  createClientApi,
  updateClientApi,
  getAllClientsApi,
} from "../../services/clients.service";

import { changeActiveMenu } from "../../store/slice/setup.slice";

const { Sider } = Layout;

interface ProtectedSideNavInterface {}

const ProtectedSideNav: React.FC<ProtectedSideNavInterface> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState();
  const location = useLocation();
  const state = useAppSelector((state) => state);
  const { activeMenu } = state.setup;
  const params = useParams();

  const [clientCreateErrors, setClientCreateErrors] = useState();

  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const [vendorCreateErrors, setVendorCreateErrors] = useState(undefined);

  useEffect(() => {
    fetchSetup();
  }, []);

  useEffect(() => {
    changeMenu(location?.pathname);
  }, [location]);

  const changeMenu = (key?: string) => {
    dispatch(changeActiveMenu(key));
  };

  const fetchSetup = () => {
    dispatch(getAllSetupApi());
  };

  const handleVendorCreateSubmit = (val: any) => {
    setSubmitting(true);

    dispatch(
      createVendorApi({
        data: val,
        finalCallback: () => {},
        successCallback: () => {
          fetchAllVendors();
          form.resetFields();
          dispatch(toggleVendorCreateModal(false));
        },
        failureCallback: (val: any) => {
          setVendorCreateErrors(val);
        },
      })
    );
  };

  const fetchAllClients = () => {
    dispatch(
      getAllClientsApi({
        page: undefined,
        pageSize: undefined,
        search: undefined,
        successCallback: () => {},

        finalCallback: () => {},
      })
    );
  };

  const handleClientCreateSubmit = (val: any) => {
    setSubmitting(true);

    dispatch(
      createClientApi({
        data: val,
        finalCallback: () => {},
        successCallback: (response: any) => {
          setInitialValues(response);
          dispatch(toggleClientCreateModal(false));
          fetchAllClients();
        },
        failureCallback: (val: any) => {
          setClientCreateErrors(val);
        },
      })
    );
  };

  const fetchAllVendors = () => {
    dispatch(
      getAllVendorsApi({
        finalCallback: () => {},
        page: undefined,
        data: undefined,
        pageSize: window.DEFAULT_PAGE_SIZE,
        successCallback: () => {},
        order: undefined,
        orderBy: undefined,
      })
    );
  };

  return (
    <div>
      <Sider className="sidebar" width={240}>
        <div className="sidebar__header">
          <h2>AIO Event Managment</h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["0"]}
          className="sidebar__menu"
          onClick={(e?: any) => {
            changeMenu(e.key);
          }}
          selectedKeys={[activeMenu]}
        >
          {sideNavPrimaryMenu?.map((menu, menuIndex) => {
            const { icon: Icon } = menu;
            return (
              <Menu.Item key={menu?.slug} className="sidebar__menu__item">
                <NavLink to={menu?.slug} className="sidebar__menu__item__link">
                  <Icon className="icon" />
                  {menu?.name}
                  {menu?.hasAddButton ? (
                    <button
                      className="btn-vendor-create"
                      onClick={() => {
                        menu?.vendorModal
                          ? dispatch(
                              toggleVendorCreateModal({
                                showModal: true,
                                isEditClient: false,
                              })
                            )
                          : dispatch(
                              toggleClientCreateModal({
                                showModal: true,
                                isEditClient: false,
                              })
                            );
                        form.resetFields();
                      }}
                    >
                      <MdQueue className="addbtn plus-icon" />
                    </button>
                  ) : (
                    <></>
                  )}
                </NavLink>
              </Menu.Item>
            );
          })}
        </Menu>

        <CreateVendorModal
          handleCreateSubmit={handleVendorCreateSubmit}
          form={form}
          vendorCreateErrors={vendorCreateErrors}
        />

        <CreateClientModal
          handleCreateSubmit={handleClientCreateSubmit}
          form={form}
          vendorCreateErrors={vendorCreateErrors}
          initialValues={initialValues}
          clientCreateErrors={clientCreateErrors}
          // handleClientUpdate={handleClientUpdate}
        />

        <div className="events">
          <div className="events__title">
            <NavLink
              to="/events"
              onClick={() => {
                changeMenu("");
              }}
            >
              <h4
                className={`event-title ${
                  activeMenu.includes("events") ? "active-menu" : ""
                }`}
              >
                Events
              </h4>
            </NavLink>
            <MdQueue
              className="plus-icon"
              onClick={() => navigate("/events/create")}
            />
          </div>
          <EventsSidenav />
        </div>
        <div className="sidebar__footer">
          <span>
            <span>Powered by: </span>
            <a
              href="https://www.imarkdigital.com/"
              target="blank"
              className="imark"
            >
              <span className="underline">iMark</span> <span>| v1.0</span>
            </a>
          </span>
        </div>
      </Sider>
    </div>
  );
};

export default ProtectedSideNav;
