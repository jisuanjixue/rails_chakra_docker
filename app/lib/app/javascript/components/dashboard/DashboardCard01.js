"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const LineChart01_1 = require("../../charts/LineChart01");
// import Icon from '../../images/icon-01.svg';
const EditMenu_1 = require("../EditMenu");
// Import utilities
const Utils_1 = require("../../utils/Utils");
function DashboardCard01() {
    const chartData = {
        labels: [
            "12-01-2020",
            "01-01-2021",
            "02-01-2021",
            "03-01-2021",
            "04-01-2021",
            "05-01-2021",
            "06-01-2021",
            "07-01-2021",
            "08-01-2021",
            "09-01-2021",
            "10-01-2021",
            "11-01-2021",
            "12-01-2021",
            "01-01-2022",
            "02-01-2022",
            "03-01-2022",
            "04-01-2022",
            "05-01-2022",
            "06-01-2022",
            "07-01-2022",
            "08-01-2022",
            "09-01-2022",
            "10-01-2022",
            "11-01-2022",
            "12-01-2022",
            "01-01-2023",
        ],
        datasets: [
            // Indigo line
            {
                data: [
                    732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192,
                    154, 273, 191, 191, 126, 263, 349, 252, 423, 622, 470, 532,
                ],
                fill: true,
                backgroundColor: `rgba(${(0, Utils_1.hexToRGB)((0, Utils_1.tailwindConfig)().theme.colors.blue[500])}, 0.08)`,
                borderColor: (0, Utils_1.tailwindConfig)().theme.colors.indigo[500],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: (0, Utils_1.tailwindConfig)().theme.colors.indigo[500],
                clip: 20,
            },
            // Gray line
            {
                data: [
                    532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234,
                    314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
                ],
                borderColor: (0, Utils_1.tailwindConfig)().theme.colors.gray[300],
                borderWidth: 2,
                tension: 0,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointBackgroundColor: (0, Utils_1.tailwindConfig)().theme.colors.gray[300],
                clip: 20,
            },
        ],
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-span-full flex flex-col rounded-sm border border-gray-200 bg-white shadow-lg sm:col-span-6 xl:col-span-4" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "px-5 pt-5" }, { children: [(0, jsx_runtime_1.jsx)("header", Object.assign({ className: "mb-2 flex items-start justify-between" }, { children: (0, jsx_runtime_1.jsxs)(EditMenu_1.default, Object.assign({ className: "relative inline-flex" }, { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "flex px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800", to: "#0" }, { children: "Option 1" }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "flex px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800", to: "#0" }, { children: "Option 2" }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "flex px-3 py-1 text-sm font-medium text-red-500 hover:text-red-600", to: "#0" }, { children: "Remove" }), void 0) }, void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "mb-2 text-lg font-semibold text-gray-800" }, { children: "Acme Plus" }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mb-1 text-xs font-semibold uppercase text-gray-400" }, { children: "Sales" }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-start" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mr-2 text-3xl font-bold text-gray-800" }, { children: "$24,780" }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "rounded-full bg-green-500 px-1.5 text-sm font-semibold text-white" }, { children: "+49%" }), void 0)] }), void 0)] }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "grow" }, { children: (0, jsx_runtime_1.jsx)(LineChart01_1.default, { data: chartData, width: 389, height: 128 }, void 0) }), void 0)] }), void 0));
}
exports.default = DashboardCard01;
//# sourceMappingURL=DashboardCard01.js.map