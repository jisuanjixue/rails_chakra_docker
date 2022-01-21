import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { themeChange } from "theme-change";

import "./charts/ChartjsConfig";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Category from "./pages/category";
import "./app.css";
import handInterceptor from "./apis/axios";


const App = () => {
  const { pathname } = useLocation();
  handInterceptor()

  useEffect(() => {
    themeChange(false);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/category/list" element={<Category />} />
    </Routes>
  );
};

export default App;
