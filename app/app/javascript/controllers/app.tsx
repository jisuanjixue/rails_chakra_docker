import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { Fonts } from "../theme/foundations/fonts";
// import "../charts/ChartjsConfig";

// import Sidebar from "../components/Sidebar";
// import Sidebar from "../components/SidebarNew";
// import Header from "../components/Header";
// import SmallWithLogoLeft from "../components/Footer";
// import Dashboard from "../pages/dashboard";
// import Login from "../pages/login";
// import Market from "../pages/market";
// import Signup from "../pages/signup";
// import Category from "../pages/category";
import handInterceptor from "../apis/axios";
import UserProvider from "../context";
import AuthLayout from "../layouts/Auth";
import AdminLayout from "../layouts/Admin";

const App = () => {
  // const bg = useColorModeValue("white", "gray.800");
  handInterceptor();

  // const getRoutes = routes =>
  //   routes.map((route, key) => {
  //     if (route.category === "account") getRoutes(route.views);

  //     if (route.category === "admin") getRoutes(route.views);

  //     return (
  //       <Route
  //         path={route.layout + route.path}
  //         element={route.component}
  //         key={key}
  //       />
  //     );
  //   });

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Fonts />
      <UserProvider>
        <HashRouter>
          <Switch>
            <Route path={`/auth`} component={AuthLayout} />
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from={`/`} to="/admin/dashboard" />
          </Switch>
        </HashRouter>
        ,
      </UserProvider>
    </ChakraProvider>

    // <UserProvider>
    //   <Box
    //     as="section"
    //     minH="100vh"
    //     className="flex h-screen overflow-hidden"
    //     bg={bg}
    //   >
    //     <Sidebar />
    //     <Box className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
    //       <Header />
    //       <Routes>
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/markets/list" element={<Market />} />
    //         <Route path="/" element={<Dashboard />} />
    //         <Route path="/dashboard" element={<Dashboard />} />
    //         <Route path="/signup" element={<Signup />} />
    //         <Route path="/category/list" element={<Category />} />
    //       </Routes>
    //       <SmallWithLogoLeft />
    //     </Box>
    //   </Box>
    // </UserProvider>
  );
};

export default App;
