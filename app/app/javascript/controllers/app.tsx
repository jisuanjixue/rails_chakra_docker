import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "../charts/ChartjsConfig";

import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Market from "../pages/market";
import Signup from "../pages/signup";
import Category from "../pages/category";
import handInterceptor from "../apis/axios";
import UserProvider from "../context";

const App = () => {
  const { pathname } = useLocation();
  handInterceptor();
  useEffect(() => {}, [pathname]);

  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/markets" element={<Market />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/list" element={<Category />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
