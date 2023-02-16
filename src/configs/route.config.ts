import React from "react";
import * as Async from "../app/asyncComponents";

interface routeInterface {
  name: string;
  path: string;
  element: React.FC | undefined;
  layout: React.FC | undefined;
  isEditPage?: boolean;
  doTypeExist?: boolean;
}

export const routes: Array<routeInterface> = [
  {
    name: "Login",
    path: "/login",
    element: Async.Login,
    layout: Async.PublicLayout,
  },
  {
    name: "EditProfile",
    path: "/editProfile",
    element: Async.EditProfile,
    layout: Async.PublicLayout,
  },
  {
    name: "ChangePassword",
    path: "/changePassword",
    element: Async.ChangePassword,
    layout: Async.PublicLayout,
  },
  {
    name: "ForgotPassword",
    path: "/forgotPassword",
    element: Async.ForgotPassword,
    layout: Async.PublicLayout,
  },
  {
    name: "NotFound",
    path: "*",
    layout: Async.PublicLayout,
    element: Async.PageNotFound,
  },
  {
    name: "Dashboard",
    path: "/",
    layout: Async.ProtectedLayout,
    element: Async.Dashboard,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    layout: Async.ProtectedLayout,
    element: Async.Dashboard,
  },
  {
    name: "My Day View",
    path: "/my-day",
    layout: Async.ProtectedLayout,
    element: Async.MyDayView,
  },
  {
    name: "Notifications",
    path: "/notifications",
    layout: Async.ProtectedLayout,
    element: Async.Notifications,
  },
  {
    name: "Vendors",
    path: "/vendors",
    layout: Async.ProtectedLayout,
    element: Async.Vendors,
  },
  {
    name: "Clients",
    path: "/clients",
    layout: Async.ProtectedLayout,
    element: Async.Clients,
  },
  {
    name: "Create Vendors",
    path: "/vendors/create",
    layout: Async.ProtectedLayout,
    element: Async.CreateVendors,
  },
  {
    name: "Edit Vendor",
    path: "/vendors/:id/edit",
    layout: Async.ProtectedLayout,
    element: Async.CreateVendors,
    isEditPage: true,
  },
  {
    name: "Vendor Details",
    path: "/vendors/:id",
    layout: Async.ProtectedLayout,
    element: Async.VendorDetails,
  },
  {
    name: "Vendor Details Print",
    path: "/vendors/:id/print",
    layout: Async.ProtectedLayout,
    element: Async.VendorDetailsPrint,
  },
  {
    name: "Events",
    path: "/events",
    layout: Async.ProtectedLayout,
    element: Async.Events,
  },
  {
    name: "Events",
    path: "/events/type=:filter",
    layout: Async.ProtectedLayout,
    element: Async.Events,
    doTypeExist: true,
  },
  {
    name: "Create Events",
    path: "/events/create",
    layout: Async.ProtectedLayout,
    element: Async.CreateEvents,
  },
  {
    name: "Edit Event",
    path: "/events/:id/edit",
    layout: Async.ProtectedLayout,
    element: Async.CreateEvents,
    isEditPage: true,
  },
  {
    name: "Event Details",
    path: "/events/:id",
    layout: Async.ProtectedLayout,
    element: Async.EventDetails,
  },
  {
    name: "Event Details Print",
    path: "/events/:id/print",
    layout: Async.ProtectedLayout,
    element: Async.EventDetailsPrint,
  },
  {
    name: "Event Details Print",
    path: "/events/:id/print/:functionId",
    layout: Async.ProtectedLayout,
    element: Async.EventDetailsPrint,
  },
];
