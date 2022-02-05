"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_dom_1 = require("react-dom");
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
const react_query_1 = require("react-query");
const react_router_dom_1 = require("react-router-dom");
const devtools_1 = require("react-query/devtools");
const react_3 = require("@chakra-ui/react");
const app_1 = require("./app");
const theme_1 = require("./theme");
// Create a client
const queryClient = new react_query_1.QueryClient();
react_dom_1.default.render((0, jsx_runtime_1.jsx)(react_2.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(react_3.ChakraProvider, Object.assign({ theme: theme_1.default }, { children: (0, jsx_runtime_1.jsxs)(react_query_1.QueryClientProvider, Object.assign({ client: queryClient }, { children: [(0, jsx_runtime_1.jsxs)(react_router_dom_1.BrowserRouter, { children: [(0, jsx_runtime_1.jsx)(react_1.ColorModeScript, { initialColorMode: theme_1.default.config.initialColorMode }, void 0), (0, jsx_runtime_1.jsx)(app_1.default, {}, void 0)] }, void 0), (0, jsx_runtime_1.jsx)(devtools_1.ReactQueryDevtools, { initialIsOpen: true }, void 0)] }), void 0) }), void 0) }, void 0), document.getElementById("app"));
//# sourceMappingURL=index.js.map