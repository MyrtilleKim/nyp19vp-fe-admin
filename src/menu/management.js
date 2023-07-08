// assets
import { faUser, faBoxes, faUsers } from "@fortawesome/free-solid-svg-icons";

// icons
const icons = { faUser, faBoxes, faUsers };

// ==============================|| MENU - MANAGEMENT ||============================== //

const management = {
  id: "group-management",
  title: "Management",
  type: "group",
  children: [
    {
      id: "userMgmt",
      title: "User",
      type: "item",
      url: "/users",
      icon: icons.faUser,
      target: true,
    },
    {
      id: "packageMgmt",
      title: "Package",
      type: "item",
      url: "/packages",
      icon: icons.faBoxes,
      target: true,
    },
    {
      id: "groupMgmt",
      title: "Group",
      type: "item",
      url: "/groups",
      icon: icons.faUsers,
      target: true,
    },
  ],
};

export default management;