import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useLocation
} from "react-router-dom";
import { setAuthHeaders } from "./apis/axios";

import "./charts/ChartjsConfig";

import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

const App = () => {
  const [loading, setLoading] = useState(true);
  // previous code if any

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // const location = useLocation();
  // console.log("🚀 ~ file: app.tsx ~ line 16 ~ App ~ location", location)

  // useEffect(() => {
  //     const node: any = document.querySelector('html')
  //     node.style.scrollBehavior = 'auto'
  //     window.scroll({ top: 0 })
  //     node.style.scrollBehavior = ''
  // }, [location]); // triggered on route change

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
