"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Chart.js
const chart_js_1 = require("chart.js");
// Import Tailwind config
const Utils_1 = require("../utils/Utils");
chart_js_1.Chart.register(chart_js_1.Tooltip);
// Define Chart.js default settings
chart_js_1.Chart.defaults.font.family = '"Inter", sans-serif';
chart_js_1.Chart.defaults.font.weight = "500";
chart_js_1.Chart.defaults.color = (0, Utils_1.tailwindConfig)().theme.colors.gray[400];
chart_js_1.Chart.defaults.scale.grid.color = (0, Utils_1.tailwindConfig)().theme.colors.gray[100];
chart_js_1.Chart.defaults.plugins.tooltip.titleColor =
    (0, Utils_1.tailwindConfig)().theme.colors.gray[800];
chart_js_1.Chart.defaults.plugins.tooltip.bodyColor =
    (0, Utils_1.tailwindConfig)().theme.colors.gray[800];
chart_js_1.Chart.defaults.plugins.tooltip.backgroundColor =
    (0, Utils_1.tailwindConfig)().theme.colors.white;
chart_js_1.Chart.defaults.plugins.tooltip.borderWidth = 1;
chart_js_1.Chart.defaults.plugins.tooltip.borderColor =
    (0, Utils_1.tailwindConfig)().theme.colors.gray[200];
chart_js_1.Chart.defaults.plugins.tooltip.displayColors = false;
chart_js_1.Chart.defaults.plugins.tooltip.mode = "nearest";
chart_js_1.Chart.defaults.plugins.tooltip.intersect = false;
chart_js_1.Chart.defaults.plugins.tooltip.position = "nearest";
chart_js_1.Chart.defaults.plugins.tooltip.caretSize = 0;
chart_js_1.Chart.defaults.plugins.tooltip.caretPadding = 20;
chart_js_1.Chart.defaults.plugins.tooltip.cornerRadius = 4;
chart_js_1.Chart.defaults.plugins.tooltip.padding = 8;
// Register Chart.js plugin to add a bg option for chart area
chart_js_1.Chart.register({
    id: "chartAreaPlugin",
    // eslint-disable-next-line object-shorthand
    beforeDraw: (chart) => {
        if (chart.config.options.chartArea &&
            chart.config.options.chartArea.backgroundColor) {
            const ctx = chart.canvas.getContext("2d");
            const { chartArea } = chart;
            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            // eslint-disable-next-line max-len
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    },
});
//# sourceMappingURL=ChartjsConfig.js.map