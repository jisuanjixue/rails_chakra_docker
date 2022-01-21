import React, { useEffect, useState, useContext, useReducer } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  // useMutation
} from "react-query";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import DashboardCard01 from "../../components/dashboard/DashboardCard01";
import Banner from "../../components/Banner";
import userApi from "../../apis/user";
import { UserInfo } from '../../types/user';

import { MyContext } from "../../ContextManager";

const Dashboard = () => {
  const queryClient = useQueryClient();
  // const [userInfo, setUserInfo] = useState<UserInfo>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const navigate = useNavigate();
  const fetchCurrentUser = () => {
    return useQuery("currentUser", async () => {
      const { data } = await userApi.queryMe()
      return data;
    }, {
      refetchOnWindowFocus: false,
    });
  };

  const { status, data, error, isFetching, isRefetching } = fetchCurrentUser()
  console.log( status, data, error, isFetching, isRefetching)
  // console.log("🚀 ~ file: index.tsx ~ line 35 ~ Dashboard ~ isSuccess, data", isSuccess, data)
  // const userInfo = isSuccess ? data : null;
  const initialState = { userInfo: {} }

  const updateUserInfo = useMutation((user: UserInfo) => userApi.update(user), {
    mutationKey: "editUser",
    onMutate: async user => {
      await queryClient.cancelQueries(['currentUser', user.id])
      const previousValue = queryClient.getQueryData(['currentUser', user.id])
      queryClient.setQueryData(['currentUser', user.id], user)
      return { previousValue, user }
    },
    onError: (_err, _user, context: any) => {
      queryClient.setQueryData(
        ['currentUser', context.user.id],
        context.previousValue
      )
    },
    // Always refetch after error or success:
    onSettled: (user: any) => {
      queryClient.invalidateQueries(['currentUser', user.id])
    },

  })

  const reducer = (state, action) => {
    switch (action.type) {
      case 'updateUser': return updateUserInfo.mutate(state.userInfo);
      default: return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MyContext.Provider value={{ state, dispatch }} >
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
    </MyContext.Provider>

  );
}

export default Dashboard;
