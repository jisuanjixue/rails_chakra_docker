"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Transition_1 = require("../utils/Transition");
function EditMenu(_a) {
    var { children } = _a, rest = __rest(_a, ["children"]);
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
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({}, rest, { children: [(0, jsx_runtime_1.jsxs)("button", Object.assign({ ref: trigger, className: `rounded-full text-gray-400 hover:text-gray-500 ${dropdownOpen && "bg-gray-100 text-gray-500"}`, "aria-haspopup": "true", onClick: () => setDropdownOpen(!dropdownOpen), "aria-expanded": dropdownOpen }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "Menu" }), void 0), (0, jsx_runtime_1.jsxs)("svg", Object.assign({ className: "h-8 w-8 fill-current", viewBox: "0 0 32 32" }, { children: [(0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "16", r: "2" }, void 0), (0, jsx_runtime_1.jsx)("circle", { cx: "10", cy: "16", r: "2" }, void 0), (0, jsx_runtime_1.jsx)("circle", { cx: "22", cy: "16", r: "2" }, void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Transition_1.default, Object.assign({ show: dropdownOpen, tag: "div", className: "min-w-36 absolute top-full right-0 z-10 mt-1 origin-top-right overflow-hidden rounded border border-gray-200 bg-white py-1.5 shadow-lg", enter: "transition ease-out duration-200 transform", enterStart: "opacity-0 -translate-y-2", enterEnd: "opacity-100 translate-y-0", leave: "transition ease-out duration-200", leaveStart: "opacity-100", leaveEnd: "opacity-0", appear: undefined }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ ref: dropdown, onFocus: () => setDropdownOpen(true), onBlur: () => setDropdownOpen(false) }, { children: children }), void 0) }), void 0)] }), void 0));
}
exports.default = EditMenu;
//# sourceMappingURL=EditMenu.js.map