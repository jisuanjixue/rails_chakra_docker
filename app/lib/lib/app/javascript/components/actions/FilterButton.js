"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Transition_js_1 = require("../../utils/Transition.js");
function FilterButton() {
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
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative inline-flex" }, { children: [(0, jsx_runtime_1.jsxs)("button", Object.assign({ ref: trigger, className: "btn border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-600", "aria-haspopup": "true", onClick: () => setDropdownOpen(!dropdownOpen), "aria-expanded": dropdownOpen }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Filter" }), void 0), (0, jsx_runtime_1.jsx)("wbr", {}, void 0), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "h-4 w-4 fill-current", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" }, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Transition_js_1.default, Object.assign({ show: dropdownOpen, tag: "div", className: "min-w-56 absolute top-full left-0 right-auto z-10 mt-1 origin-top-right overflow-hidden rounded border border-gray-200 bg-white pt-1.5 shadow-lg md:left-auto md:right-0", enter: "transition ease-out duration-200 transform", enterStart: "opacity-0 -translate-y-2", enterEnd: "opacity-100 translate-y-0", leave: "transition ease-out duration-200", leaveStart: "opacity-100", leaveEnd: "opacity-0", appear: undefined }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: dropdown }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "px-4 pt-1.5 pb-2 text-xs font-semibold uppercase text-gray-400" }, { children: "Filters" }), void 0), (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "mb-4" }, { children: [(0, jsx_runtime_1.jsx)("li", Object.assign({ className: "px-3 py-1" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", className: "form-checkbox" }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 text-sm font-medium" }, { children: "Direct VS Indirect" }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "px-3 py-1" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", className: "form-checkbox" }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 text-sm font-medium" }, { children: "Real Time Value" }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "px-3 py-1" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", className: "form-checkbox" }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 text-sm font-medium" }, { children: "Top Channels" }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "px-3 py-1" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", className: "form-checkbox" }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 text-sm font-medium" }, { children: "Sales VS Refunds" }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "px-3 py-1" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", className: "form-checkbox" }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 text-sm font-medium" }, { children: "Last Order" }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("li", Object.assign({ className: "px-3 py-1" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", className: "form-checkbox" }, void 0), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 text-sm font-medium" }, { children: "Total Spent" }), void 0)] }), void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "border-t border-gray-200 bg-gray-50 px-3 py-2" }, { children: (0, jsx_runtime_1.jsxs)("ul", Object.assign({ className: "flex items-center justify-between" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn-xs border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-600" }, { children: "Clear" }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn-xs bg-indigo-500 text-white hover:bg-indigo-600", onClick: () => setDropdownOpen(false), onBlur: () => setDropdownOpen(false) }, { children: "Apply" }), void 0) }, void 0)] }), void 0) }), void 0)] }), void 0) }), void 0)] }), void 0));
}
exports.default = FilterButton;
//# sourceMappingURL=FilterButton.js.map