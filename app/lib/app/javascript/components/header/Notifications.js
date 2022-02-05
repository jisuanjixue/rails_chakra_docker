"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Transition_1 = require("../../utils/Transition");
function Notifications() {
    const [dropdownOpen, setDropdownOpen] = (0, react_1.useState)(false);
    const trigger = (0, react_1.useRef)(null);
    const dropdown = (0, react_1.useRef)(null);
    // close on click outside
    (0, react_1.useEffect)(() => {
        const clickHandler = ({ target }) => {
            if (!dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)) {
                return;
            }
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    // close if the esc key is pressed
    (0, react_1.useEffect)(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27)
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative ml-3 inline-flex" }, { children: [(0, jsx_runtime_1.jsxs)("button", Object.assign({ ref: trigger, className: `flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition duration-150 hover:bg-gray-200 ${dropdownOpen && "bg-gray-200"}`, "aria-haspopup": "true", onClick: () => setDropdownOpen(!dropdownOpen), "aria-expanded": dropdownOpen }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Notifications" }), void 0), (0, jsx_runtime_1.jsxs)("svg", Object.assign({ className: "h-4 w-4", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg" }, { children: [(0, jsx_runtime_1.jsx)("path", { className: "fill-current text-gray-500", d: "M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z" }, void 0), (0, jsx_runtime_1.jsx)("path", { className: "fill-current text-gray-400", d: "M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z" }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Transition_1.default, Object.assign({ className: "min-w-80 absolute top-full right-0 z-10 -mr-48 mt-1 origin-top-right overflow-hidden rounded border border-gray-200 bg-white py-1.5 shadow-lg sm:mr-0", show: dropdownOpen, enter: "transition ease-out duration-200 transform", enterStart: "opacity-0 -translate-y-2", enterEnd: "opacity-100 translate-y-0", leave: "transition ease-out duration-200", leaveStart: "opacity-100", leaveEnd: "opacity-0", appear: undefined }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: dropdown, onFocus: () => setDropdownOpen(true), onBlur: () => setDropdownOpen(false) }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "px-4 pt-1.5 pb-2 text-xs font-semibold uppercase text-gray-400" }, { children: "Notifications" }), void 0), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "border-b border-gray-200 last:border-0" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "block px-4 py-2 hover:bg-gray-50", to: "#0", onClick: () => setDropdownOpen(!dropdownOpen) }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "mb-2 block text-sm" }, { children: ["\uD83D\uDCE3", " ", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium text-gray-800" }, { children: "Edit your information in a swipe" }), void 0), " ", "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."] }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "block text-xs font-medium text-gray-400" }, { children: "Feb 12, 2021" }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "border-b border-gray-200 last:border-0" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "block px-4 py-2 hover:bg-gray-50", to: "#0", onClick: () => setDropdownOpen(!dropdownOpen) }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "mb-2 block text-sm" }, { children: ["\uD83D\uDCE3", " ", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium text-gray-800" }, { children: "Edit your information in a swipe" }), void 0), " ", "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."] }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "block text-xs font-medium text-gray-400" }, { children: "Feb 9, 2021" }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "border-b border-gray-200 last:border-0" }, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, Object.assign({ className: "block px-4 py-2 hover:bg-gray-50", to: "#0", onClick: () => setDropdownOpen(!dropdownOpen) }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "mb-2 block text-sm" }, { children: ["\uD83D\uDE80", (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "font-medium text-gray-800" }, { children: "Say goodbye to paper receipts!" }), void 0), " ", "Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim."] }), void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "block text-xs font-medium text-gray-400" }, { children: "Jan 24, 2020" }), void 0)] }), void 0) }), void 0)] }, void 0)] }), void 0) }), void 0)] }), void 0));
}
exports.default = Notifications;
//# sourceMappingURL=Notifications.js.map