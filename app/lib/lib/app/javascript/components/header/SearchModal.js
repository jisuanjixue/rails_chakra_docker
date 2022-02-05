"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Transition_js_1 = require("../../utils/Transition.js");
function SearchModal() {
    const [searchOpen, setSearchOpen] = (0, react_1.useState)(false);
    const trigger = (0, react_1.useRef)(null);
    const searchContent = (0, react_1.useRef)(null);
    const searchInput = (0, react_1.useRef)(null);
    // close on click outside
    (0, react_1.useEffect)(() => {
        const clickHandler = ({ target }) => {
            if (!searchOpen ||
                searchContent.current.contains(target) ||
                trigger.current.contains(target)) {
                return;
            }
            setSearchOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    // close if the esc key is pressed
    (0, react_1.useEffect)(() => {
        const keyHandler = ({ keyCode }) => {
            if (!searchOpen || keyCode !== 27)
                return;
            setSearchOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("button", Object.assign({ ref: trigger, className: `ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition duration-150 hover:bg-gray-200 ${searchOpen && "bg-gray-200"}`, onClick: () => {
                    setSearchOpen(!searchOpen);
                    setImmediate(() => searchInput.current.focus());
                }, "aria-controls": "search-modal" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Search" }), void 0), (0, jsx_runtime_1.jsxs)("svg", Object.assign({ className: "h-4 w-4", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, { children: [(0, jsx_runtime_1.jsx)("path", { className: "fill-current text-gray-500", d: "M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" }, void 0), (0, jsx_runtime_1.jsx)("path", { className: "fill-current text-gray-400", d: "M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" }, void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Transition_js_1.default, { className: "fixed inset-0 z-50 bg-gray-900 bg-opacity-30 transition-opacity", show: searchOpen, enter: "transition ease-out duration-200", enterStart: "opacity-0", enterEnd: "opacity-100", leave: "transition ease-out duration-100", leaveStart: "opacity-100", leaveEnd: "opacity-0", "aria-hidden": "true" }, void 0), (0, jsx_runtime_1.jsx)(Transition_js_1.default, Object.assign({ id: "search-modal", className: "fixed inset-0 top-20 z-50 mb-4 flex transform items-start justify-center overflow-hidden px-4 sm:px-6", role: "dialog", "aria-modal": "true", show: searchOpen, enter: "transition ease-in-out duration-200", enterStart: "opacity-0 translate-y-4", enterEnd: "opacity-100 translate-y-0", leave: "transition ease-in-out duration-200", leaveStart: "opacity-100 translate-y-0", leaveEnd: "opacity-0 translate-y-4" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "max-h-full w-full max-w-2xl overflow-auto rounded bg-white shadow-lg", ref: searchContent }, { children: [(0, jsx_runtime_1.jsx)("form", Object.assign({ className: "border-b border-gray-200" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "modal-search", className: "sr-only" }, { children: "Search" }), void 0), (0, jsx_runtime_1.jsx)("input", { id: "modal-search", className: "w-full appearance-none border-0 py-3 pl-10 pr-4 placeholder-gray-400 focus:ring-transparent", type: "search", placeholder: "Search Anything\u2026", ref: searchInput }, void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "group absolute inset-0 right-auto", type: "submit", "aria-label": "Search" }, { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ className: "ml-4 mr-2 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-gray-500", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" }, void 0), (0, jsx_runtime_1.jsx)("path", { d: "M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" }, void 0)] }), void 0) }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "py-4 px-2", onFocus: () => setSearchOpen(true), onBlur: () => setSearchOpen(false) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3 last:mb-0" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-2 px-2 text-xs font-semibold uppercase text-gray-400" }, { children: "Recent searches" }), void 0), (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "text-sm" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: "Form Builder - 23 hours on-demand video" }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: "Access Mosaic on mobile and TV" }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: "Product Update - Q4 2021" }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: "Master Digital Marketing Strategy course" }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: "Dedicated forms for products" }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: "Product Update - Q4 2021" }, void 0)] }), void 0) }, void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-3 last:mb-0" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-2 px-2 text-xs font-semibold uppercase text-gray-400" }, { children: "Recent pages" }), void 0), (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "text-sm" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium text-gray-800 group-hover:text-white" }, { children: "Messages" }), void 0), " ", "- Conversation / \u2026 / Mike Mills"] }, void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "group flex items-center rounded p-2 text-gray-800 hover:bg-indigo-500 hover:text-white", to: "#0", onClick: () => setSearchOpen(!searchOpen) }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-3 h-4 w-4 shrink-0 fill-current text-gray-400 group-hover:text-white group-hover:text-opacity-50", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" }, void 0) }), void 0), (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium text-gray-800 group-hover:text-white" }, { children: "Messages" }), void 0), " ", "- Conversation / \u2026 / Eva Patrick"] }, void 0)] }), void 0) }, void 0)] }), void 0)] }), void 0)] }), void 0)] }), void 0) }), void 0)] }, void 0));
}
exports.default = SearchModal;
//# sourceMappingURL=SearchModal.js.map