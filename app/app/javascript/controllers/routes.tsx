// import
import React from "react";
import Dashboard from "../pages/dashboard";
import Category from "../pages/category";
// import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
// import RTLPage from "views/RTL/RTLPage.js";
import Profile from "../pages/profile";
import SignIn from "../pages/login";
import SignUp from "../pages/signup";
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
  {
    name: "用户管理",
    category: "user",
    rtlName: "",
    state: "pageCollapse",
    views: [
      {
        path: "/list",
        name: "Sign In",
        rtlName: " ",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/user",
      },
      {
        path: "/profile",
        name: "Profile",
        rtlName: "",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/user",
      },
    ],
  },
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
    component: Category,
    layout: "/admin",
  },
  {
    name: "登录注册",
    category: "account",
    rtlName: "",
    state: "pageCollapse",
    views: [
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
