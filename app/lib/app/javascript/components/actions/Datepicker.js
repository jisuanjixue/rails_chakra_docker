"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// import Flatpickr from 'react-flatpickr';
function Datepicker() {
    const options = {
        mode: "range",
        static: true,
        monthSelectorType: "static",
        dateFormat: "M j, Y",
        defaultDate: [new Date().setDate(new Date().getDate() - 6), new Date()],
        prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        onReady: (selectedDates, dateStr, instance) => {
            instance.element.value = dateStr.replace("to", "-");
        },
        onChange: (selectedDates, dateStr, instance) => {
            instance.element.value = dateStr.replace("to", "-");
        },
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "relative" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "pointer-events-none absolute inset-0 right-auto flex items-center" }, { children: (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "ml-3 h-4 w-4 fill-current text-gray-500", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" }, void 0) }), void 0) }), void 0) }), void 0));
}
exports.default = Datepicker;
//# sourceMappingURL=Datepicker.js.map