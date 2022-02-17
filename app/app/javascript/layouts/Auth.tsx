// chakra imports
import React, { createRef, useEffect, useRef } from "react";
import { Box, Portal } from "@chakra-ui/react";
import Footer from "@components/Footer";
// core components
import AuthNavbar from "@components/navbars/AuthNavbar";
import { Route, Routes } from "react-router-dom";
import routes from "../controllers/routes";

const AuthLayout = () => {
  // const { ...rest } = props;
  // ref for the wrapper div
  const wrapper: any = createRef();
  useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  // eslint-disable-next-line no-unused-vars
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
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }

      if (prop.category === "account") {
        return getRoutes(prop.views);
      }

      if (prop.layout === "/auth") {
        return (
          <Route
            element={prop.component}
            path={prop.layout + prop.path}
            key={key}
          />
        );
      }

      return null;
    });
  };
  const navRef: any = useRef();
  document.documentElement.dir = "ltr";
  return (
    <Box ref={navRef} w="100%">
      <Portal containerRef={navRef}>
        <AuthNavbar
          secondary={getActiveNavbar(routes)}
          logoText="PURITY UI DASHBOARD"
        />
      </Portal>
      <Box w="100%">
        <Box ref={wrapper} w="100%">
          <Routes>
            {getRoutes(routes)}
            <Route path={`/auth`} />
          </Routes>
        </Box>
      </Box>
      <Box px="24px" mx="auto" width="1044px" maxW="100%">
        <Footer />
      </Box>
    </Box>
  );
};

export default AuthLayout;
