import { lazy } from "react";

export const ProtectedLayout = lazy(() => import("../layouts/protectedLayout"));
export const PublicLayout = lazy(() => import("../layouts/publicLayout"));

export const PageNotFound = lazy(() => import("../containers/pageNotFound"));

export const Register = lazy(() => import("../../src/containers/register"));
export const Login = lazy(() => import("../../src/containers/login"));

export const EditProfile = lazy(
  () => import("../../src/containers/editProfile")
);

export const ChangePassword = lazy(
  () => import("../../src/containers/changePassword")
);

export const ForgotPassword = lazy(
  () => import("../../src/containers/forgotPassword")
);

export const Dashboard = lazy(() => import("../../src/containers/dashboard"));

export const MyDayView = lazy(() => import("../../src/containers/myDayView"));

export const Notifications = lazy(
  () => import("../../src/containers/notifications")
);

export const Vendors = lazy(() => import("../../src/containers/vendors"));
export const Clients = lazy(() => import("../../src/containers/clients"));
export const CreateVendors = lazy(
  () => import("../../src/containers/createVendors")
);
export const VendorDetails = lazy(
  () => import("../../src/containers/vendorDetails")
);
export const VendorDetailsPrint = lazy(
  () => import("../../src/containers/vendorDetailsPrint")
);

export const Events = lazy(() => import("../containers/events"));
export const CreateEvents = lazy(() => import("../containers/createEvents"));
export const EventDetails = lazy(() => import("../containers/eventDetails"));
export const EventDetailsPrint = lazy(
  () => import("../containers/eventDetailsPrint")
);
