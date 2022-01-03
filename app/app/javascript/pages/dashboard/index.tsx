import React, { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardCard01 from "../../components/dashboard/DashboardCard01";
import Banner from "../../components/Banner";

import "./index.css";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
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
  );
}

export default Dashboard;
