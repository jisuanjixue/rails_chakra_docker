"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Transition_js_1 = require("../../utils/Transition.js");
function DateSelect() {
    const options = [
        {
            id: 0,
            period: "Today",
        },
        {
            id: 1,
            period: "Last 7 Days",
        },
        {
            id: 2,
            period: "Last Month",
        },
        {
            id: 3,
            period: "Last 12 Months",
        },
        {
            id: 4,
            period: "All Time",
        },
    ];
    const [dropdownOpen, setDropdownOpen] = (0, react_1.useState)(false);
    const [selected, setSelected] = (0, react_1.useState)(2);
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
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative" }, { children: [(0, jsx_runtime_1.jsxs)("button", Object.assign({ ref: trigger, className: "btn min-w-44 justify-between border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-600", "aria-label": "Select date range", "aria-haspopup": "true", onClick: () => setDropdownOpen(!dropdownOpen), "aria-expanded": dropdownOpen }, { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "flex items-center" }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "mr-2 h-4 w-4 shrink-0 fill-current text-gray-500", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: options[selected].period }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "ml-1 shrink-0 fill-current text-gray-400", width: "11", height: "7", viewBox: "0 0 11 7" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" }, void 0) }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)(Transition_js_1.default, Object.assign({ show: dropdownOpen, tag: "div", className: "absolute top-full right-0 z-10 mt-1 w-full overflow-hidden rounded border border-gray-200 bg-white py-1.5 shadow-lg", enter: "transition ease-out duration-100 transform", enterStart: "opacity-0 -translate-y-2", enterEnd: "opacity-100 translate-y-0", leave: "transition ease-out duration-100", leaveStart: "opacity-100", leaveEnd: "opacity-0", appear: undefined }, { children: (0, jsx_runtime_1.jsx)("ul", Object.assign({ ref: dropdown, className: "text-sm font-medium text-gray-600", onFocus: () => setDropdownOpen(true), onBlur: () => setDropdownOpen(false) }, { children: options.map(option => {
                        return ((0, jsx_runtime_1.jsxs)("button", Object.assign({ tabIndex: "0", className: `flex w-full cursor-pointer items-center py-1 px-3 hover:bg-gray-50 ${option.id === selected && "text-indigo-500"}`, onClick: () => {
                                setSelected(option.id);
                                setDropdownOpen(false);
                            } }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ className: `mr-2 shrink-0 fill-current text-indigo-500 ${option.id !== selected && "invisible"}`, width: "12", height: "9", viewBox: "0 0 12 9" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("span", { children: option.period }, void 0)] }), option.id));
                    }) }), void 0) }), void 0)] }), void 0));
}
exports.default = DateSelect;
//# sourceMappingURL=DateSelect.js.map