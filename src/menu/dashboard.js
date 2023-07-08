// assets
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

// icons
const icons = {
  faChartPie,
};

// ==============================|| MENU - DASHBOARD ||============================== //

const dashboard = {
  id: "group-dashboard",
  title: "Overview",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.faChartPie,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
