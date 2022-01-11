import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { themeChange } from 'theme-change'

import "./charts/ChartjsConfig";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Category from "./pages/category";
import "./app.css";
import { setAuthHeaders } from "./apis/axios";

const App = () => {
  useEffect(() => {
    setAuthHeaders();
    themeChange(false)
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/category/list" element={<Category />} />
      </Routes>
    </Router>
  );
};

export default App;
