import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { Fonts } from "../theme/foundations/fonts";
// import "../charts/ChartjsConfig";
import handInterceptor from "../apis/axios";
import UserProvider from "../context";
import AuthLayout from "../layouts/Auth";
import AdminLayout from "../layouts/Admin";

const App = () => {
  // const bg = useColorModeValue("white", "gray.800");
  handInterceptor();

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
  );
};

export default App;
