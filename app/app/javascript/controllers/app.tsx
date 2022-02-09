import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";
import "../charts/ChartjsConfig";

// import Sidebar from "../components/Sidebar";
import Sidebar from "../components/SidebarNew";
import Header from "../components/Header";
import SmallWithLogoLeft from "../components/Footer";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Market from "../pages/market";
import Signup from "../pages/signup";
import Category from "../pages/category";
import handInterceptor from "../apis/axios";
import UserProvider from "../context";

const App = () => {
  const { pathname } = useLocation();
  const bg = useColorModeValue("white", "gray.800");
  handInterceptor();
  useEffect(() => { }, [pathname]);

  return (
    <UserProvider>
      <Box
        as="section"
        minH="100vh"
        className="flex h-screen overflow-hidden"
        bg={bg}
      >
        <Sidebar />
        <Box className="flex-col flex flex-1 overflow-x-hidden overflow-y-auto">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/markets/list" element={<Market />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/category/list" element={<Category />} />
          </Routes>
          <SmallWithLogoLeft />
        </Box>
      </Box>
    </UserProvider>
  );
};

export default App;
