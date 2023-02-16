import React from 'react';
import loginsideimg from "../../img/img1.png";

interface AuthenticationSideNavInterface {

}

const AuthenticationSideNav: React.FC<AuthenticationSideNavInterface> = (props) => {
  return (
    <div className="login-sidebar">
      <img src={loginsideimg} alt="" className="loginsidebar-img" />
    </div>
  )
}

export default AuthenticationSideNav;
