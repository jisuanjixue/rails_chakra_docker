// import
import React from "react";
import Dashboard from "../pages/dashboard";
// import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
// import RTLPage from "views/RTL/RTLPage.js";
// import Profile from "views/Dashboard/Profile.js";
import SignIn from "../pages/login";
import SignUp from "../pages/signup";

import {
  HomeIcon,
  // StatsIcon,
  // CreditIcon,
  // PersonIcon,
  DocumentIcon,
  RocketIcon,
  // SupportIcon,
} from "../components/icons/Icons";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   rtlName: "",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "",
    state: "pageCollapse",
    views: [
      // {
      //   path: "/profile",
      //   name: "Profile",
      //   rtlName: "",
      //   icon: <PersonIcon color="inherit" />,
      //   secondaryNavbar: true,
      //   component: Profile,
      //   layout: "/admin",
      // },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: true,
        component: SignUp,

        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
