// import
import React from "react";
import Dashboard from "../pages/dashboard";
import Category from "../pages/category";
import Market from "../pages/market";
// import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
// import RTLPage from "views/RTL/RTLPage.js";
import Profile from "../pages/profile";
import SignIn from "../pages/login";
import SignUp from "../pages/signup";
import Error from "../pages/error";
// import AdminLayout from "../layouts/Admin";

import {
  HomeIcon,
  StatsIcon,
  // CreditIcon,
  PersonIcon,
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
  //   name: "用户管理",
  //   category: "user",
  //   rtlName: "",
  //   state: "pageCollapse",
  // },
  {
    path: "/category/list",
    name: "系统分类",
    rtlName: "",
    icon: <StatsIcon color="inherit" />,
    component: Category,
    layout: "/admin",
  },
  {
    path: "/markets/list",
    name: "市场管理",
    rtlName: "",
    icon: <StatsIcon color="inherit" />,
    component: Market,
    layout: "/admin",
  },
  {
    path: "/forbidden/page",
    name: "403",
    rtlName: "",
    icon: <StatsIcon color="inherit" />,
    component: Error,
    layout: "/admin",
    show: false,
  },
  {
    name: "登录注册",
    category: "account",
    rtlName: "",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: " ",
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
