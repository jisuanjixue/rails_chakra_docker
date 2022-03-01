// Chakra imports
import React, { useState, useRef, useContext } from "react";
import {
  Portal,
  useDisclosure,
  IconButton,
  useColorModeValue,
  useControllableState,
} from "@chakra-ui/react";
import {
  useQuery,
  // useMutation
} from "react-query";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Configurator from "@components/configurator/Configurator";
import Footer from "@components/Footer";
// Layout components
import AdminNavbar from "@components/navbars/AdminNavbar";
import Sidebar from "@components/sidebar/Sidebar";
import routes from "../controllers/routes";
// Custom Chakra theme
// import theme from "theme/theme.js";
import FixedPlugin from "@components/fixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "@components/layout/MainPanel";
import PanelContainer from "@components/layout/PanelContainer";
import PanelContent from "@components/layout/PanelContent";
import { AiFillFastBackward } from "react-icons/ai";
import userApi from "../apis/user";
import { UserContext } from "../controllers/ContextManager";

const AdminLayout = props => {
  const { dispatch } = useContext(UserContext);
  const navigate = useHistory();
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
          if (err) navigate.push("/auth/signin");
        },
        initialData: initialUser,
      }
    );
  };

  fetchCurrentUser();
  const settingsRef: any = useRef();
  const { ...rest } = props;
  const navbarIcon = useColorModeValue("gray.500", "gray.200");
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  // ref for main panel div
  const mainPanel = React.createRef();
  // functions for changing the states from components
  const getRoute = () => {
    // console.log('2222', window.location.pathname)
    return window.location.pathname !== "/admin/full-screen-maps";
  };

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      if (prop.category === "account") {
        return getRoutes(prop.views);
      }

      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }

      return null;
    });
  };

  const getActiveRoute = routes => {
    const activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        const categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = routes => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [siderbarOpen, getSiderbarOpen] = useControllableState({
    defaultValue: true,
  });

  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  return (
    <>
      <Sidebar
        routes={routes}
        logoText={"PURITY UI DASHBOARD"}
        display="none"
        isOpen={siderbarOpen}
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={"PURITY UI DASHBOARD"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/dashboard" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Portal>
          <IconButton
            aria-label="respensve siderbar"
            icon={<AiFillFastBackward />}
            position="fixed"
            variant="no-hover"
            h="52px"
            w="52px"
            left="280px"
            cursor="pointer"
            ref={settingsRef}
            color={navbarIcon}
            bottom="30px"
            borderRadius="50px"
            boxShadow="0 2px 12px 0 rgb(0 0 0 / 16%)"
            onClick={() =>
              siderbarOpen ? getSiderbarOpen(false) : getSiderbarOpen(true)
            }
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={value => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </>
  );
};

export default AdminLayout;
