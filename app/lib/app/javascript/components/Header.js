"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SearchModal_1 = require("./header/SearchModal");
const Notifications_1 = require("./header/Notifications");
const ChangeTheme_1 = require("./header/ChangeTheme");
const Help_1 = require("./header/Help");
const UserMenu_1 = require("./header/UserMenu");
const react_1 = require("@chakra-ui/react");
function Header({ sidebarOpen, setSidebarOpen }) {
    return ((0, jsx_runtime_1.jsx)("header", Object.assign({ className: "sticky top-0 z-30 bg-white border-b border-gray-200" }, { children: (0, jsx_runtime_1.jsx)(react_1.Box, Object.assign({ className: "px-4 sm:px-6 lg:px-8" }, { children: (0, jsx_runtime_1.jsxs)(react_1.Box, Object.assign({ className: "flex items-center justify-between h-16 -mb-px" }, { children: [(0, jsx_runtime_1.jsx)(react_1.Box, Object.assign({ className: "flex" }, { children: (0, jsx_runtime_1.jsxs)("button", Object.assign({ className: "text-gray-500 hover:text-gray-600 lg:hidden", "aria-controls": "sidebar", "aria-expanded": sidebarOpen, onClick: () => setSidebarOpen(!sidebarOpen) }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Open sidebar" }), void 0), (0, jsx_runtime_1.jsxs)("svg", Object.assign({ className: "w-6 h-6 fill-current", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" }, { children: [(0, jsx_runtime_1.jsx)("rect", { x: "4", y: "5", width: "16", height: "2" }, void 0), (0, jsx_runtime_1.jsx)("rect", { x: "4", y: "11", width: "16", height: "2" }, void 0), (0, jsx_runtime_1.jsx)("rect", { x: "4", y: "17", width: "16", height: "2" }, void 0)] }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsxs)(react_1.Box, Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)(ChangeTheme_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(SearchModal_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(Notifications_1.default, {}, void 0), (0, jsx_runtime_1.jsx)(Help_1.default, {}, void 0), (0, jsx_runtime_1.jsx)("hr", { className: "w-px h-6 mx-3 bg-gray-200" }, void 0), (0, jsx_runtime_1.jsx)(UserMenu_1.default, {}, void 0)] }), void 0)] }), void 0) }), void 0) }), void 0));
}
exports.default = Header;
//# sourceMappingURL=Header.js.map