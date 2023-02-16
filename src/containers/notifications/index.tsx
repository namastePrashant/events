import React from "react";

import NotifiationComponent from "../../components/notifications";

interface NotificationContainerInterface {}

const NotificationContainer: React.FC<NotificationContainerInterface> = () => {
  return <NotifiationComponent />;
};

export default NotificationContainer;
