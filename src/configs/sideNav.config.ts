import {
  MdSpaceDashboard,
  MdAssignmentInd,
  MdAssignmentTurnedIn,
  MdPeopleAlt,
} from "react-icons/md";

interface SideNavConfigInterface {
  name: string;
  slug: string;
  icon: any;
  hasAddButton?: boolean;
  vendorModal?: boolean;
}

export const sideNavPrimaryMenu: Array<SideNavConfigInterface> = [
  {
    name: "Home",
    slug: "/",
    icon: MdSpaceDashboard,
    hasAddButton: false,
  },

  {
    name: "My Day View",
    slug: "/my-day",
    icon: MdAssignmentTurnedIn,
    hasAddButton: false,
  },

  {
    name: "Clients",
    slug: "/clients",
    icon: MdPeopleAlt,
    hasAddButton: true,
    vendorModal: false,
  },

  {
    name: "Vendors",
    slug: "/vendors",
    icon: MdAssignmentInd,
    hasAddButton: true,
    vendorModal: true,
  },
];
