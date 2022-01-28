import React, { useState, useContext } from "react";
import {
  useQuery,
  // useMutation
} from "react-query";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardCard01 from "../../components/dashboard/DashboardCard01";
import Banner from "../../components/Banner";
import userApi from "../../apis/user";
import { UserContext } from "../../controllers/ContextManager";

const Dashboard = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const initialUser = { name: "", email: "" };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fetchCurrentUser = () => {
    return useQuery(
      "currentUser",
      async () => {
        const { data } = await userApi.queryMe();
        return data;
      },
      {
        refetchOnWindowFocus: false,
        onSuccess: data => {
          dispatch({ type: "getUser", payload: data });
        },
        onError: err => {
          if (err) navigate("/login");
        },
        initialData: initialUser,
      }
    );
  };

  fetchCurrentUser();
  return (
    <>
      {
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content area */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
              <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome banner */}
                <WelcomeBanner />
                {/* Cards */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Line chart (Acme Plus) */}
                  <DashboardCard01 />
                </div>
              </div>
            </main>
            <Banner />
          </div>
        </div>
      }
    </>
  );
};

export default Dashboard;
