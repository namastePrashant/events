import React, { useState, useEffect } from "react";
import { PageHeader, Avatar, Popover } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAllProfilesApi } from "../../services/profile.service";

import profilePlaceholder from "../../assets/images/profilePlaceholder.webp";

interface PageHeaderInterface {
  title?: string;
}

const PageHeaderComponent: React.FC<PageHeaderInterface> = (props) => {
  const { title } = props;
  const navigate = useNavigate();
  const [showPopover, setPopover] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const fetchAllProfiles = () => {
    dispatch(
      getAllProfilesApi({
        finalCallback: () => {},
        data: undefined,
      })
    );
  };
  const state = useAppSelector((state) => state);
  const { profile_pic } = state.profile;

  const handleVisibleChange = () => {
    setPopover(!showPopover);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const content = () => {
    return (
      <>
        <div className="PageHeader-content">
          <NavLink to="/editProfile">Edit Profile</NavLink>
          <div>
            <NavLink to="/changePassword">Change Password</NavLink>
          </div>
        </div>
        <div>
          <a onClick={handleLogout}>Logout</a>
        </div>
      </>
    );
  };

  return (
    <div>
      <PageHeader
        className="page-header"
        title={title}
        extra={[
          <Popover
            content={content}
            trigger="click"
            visible={showPopover}
            onVisibleChange={handleVisibleChange}
          >
            <Avatar
              size={35}
              src={profile_pic ?? profilePlaceholder}
              className="avatar"
            />
          </Popover>,
        ]}
      />
    </div>
  );
};

export default PageHeaderComponent;
