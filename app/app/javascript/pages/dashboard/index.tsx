import React, { useContext } from "react";
import {
  useQuery,
  // useMutation
} from "react-query";
import { useNavigate } from "react-router-dom";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardCard01 from "../../components/dashboard/DashboardCard01";
import Banner from "../../components/Banner";
import userApi from "../../apis/user";
import { UserContext } from "../../controllers/ContextManager";

const Dashboard = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const initialUser = { name: "", email: "" };
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
          <main>
            <div className="w-full px-4 py-8 mx-auto max-w-9xl sm:px-6 lg:px-8">
              <WelcomeBanner />
              <div className="grid grid-cols-12 gap-6">
                {/* Line chart (Acme Plus) */}
                <DashboardCard01 />
              </div>
            </div>
          </main>
          <Banner />
          {/* </div> */}
        </div>
      }
    </>
  );
};

export default Dashboard;
