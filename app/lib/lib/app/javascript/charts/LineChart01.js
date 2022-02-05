"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const chart_js_1 = require("chart.js");
require("chartjs-adapter-moment");
// Import utilities
const Utils_1 = require("../utils/Utils");
chart_js_1.Chart.register(chart_js_1.LineController, chart_js_1.LineElement, chart_js_1.Filler, chart_js_1.PointElement, chart_js_1.LinearScale, chart_js_1.TimeScale, chart_js_1.Tooltip);
function LineChart01({ data, width, height }) {
    const canvas = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const ctx = canvas.current;
        // eslint-disable-next-line no-unused-vars
        const chart = new chart_js_1.Chart(ctx, {
            type: "line",
            data: data,
            options: {
                chartArea: {
                    backgroundColor: (0, Utils_1.tailwindConfig)().theme.colors.gray[50],
                },
                layout: {
                    padding: 20,
                },
                scales: {
                    y: {
                        display: false,
                        beginAtZero: true,
                    },
                    x: {
                        type: "time",
                        time: {
                            parser: "MM-DD-YYYY",
                            unit: "month",
                        },
                        display: false,
                    },
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: () => false,
                            label: context => (0, Utils_1.formatValue)(context.parsed.y),
                        },
                    },
                    legend: {
                        display: false,
                    },
                },
                interaction: {
                    intersect: false,
                    mode: "nearest",
                },
                maintainAspectRatio: false,
                resizeDelay: 200,
            },
        });
        return () => chart.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (0, jsx_runtime_1.jsx)("canvas", { ref: canvas, width: width, height: height }, void 0);
}
exports.default = LineChart01;
//# sourceMappingURL=LineChart01.js.map