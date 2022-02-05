"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_2 = require("@chakra-ui/react");
require("../charts/ChartjsConfig");
const Sidebar_1 = require("../components/Sidebar");
const Header_1 = require("../components/Header");
const dashboard_1 = require("../pages/dashboard");
const login_1 = require("../pages/login");
const market_1 = require("../pages/market");
const signup_1 = require("../pages/signup");
const category_1 = require("../pages/category");
const axios_1 = require("../apis/axios");
const context_1 = require("../context");
const App = () => {
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(false);
    const { pathname } = (0, react_router_dom_1.useLocation)();
    (0, axios_1.default)();
    (0, react_1.useEffect)(() => { }, [pathname]);
    return ((0, jsx_runtime_1.jsx)(context_1.default, { children: (0, jsx_runtime_1.jsxs)(react_2.Box, Object.assign({ className: "flex h-screen overflow-hidden" }, { children: [(0, jsx_runtime_1.jsx)(Sidebar_1.default, { sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }, void 0), (0, jsx_runtime_1.jsxs)(react_2.Box, Object.assign({ className: "relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto" }, { children: [(0, jsx_runtime_1.jsx)(Header_1.default, { sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }, void 0), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(login_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/markets/list", element: (0, jsx_runtime_1.jsx)(market_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(dashboard_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/dashboard", element: (0, jsx_runtime_1.jsx)(dashboard_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(signup_1.default, {}, void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/category/list", element: (0, jsx_runtime_1.jsx)(category_1.default, {}, void 0) }, void 0)] }, void 0)] }), void 0)] }), void 0) }, void 0));
};
exports.default = App;
//# sourceMappingURL=app.js.map