"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValue = exports.hexToRGB = exports.tailwindConfig = void 0;
const resolveConfig_1 = require("tailwindcss/resolveConfig");
const tailwind_config_1 = require("../../../config/tailwind.config");
const tailwindConfig = () => {
    // Tailwind config
    return (0, resolveConfig_1.default)(tailwind_config_1.default);
};
exports.tailwindConfig = tailwindConfig;
const hexToRGB = h => {
    let r = 0;
    let g = 0;
    let b = 0;
    if (h.length === 4) {
        r = `0x${h[1]}${h[1]}`;
        g = `0x${h[2]}${h[2]}`;
        b = `0x${h[3]}${h[3]}`;
    }
    else if (h.length === 7) {
        r = `0x${h[1]}${h[2]}`;
        g = `0x${h[3]}${h[4]}`;
        b = `0x${h[5]}${h[6]}`;
    }
    return `${+r},${+g},${+b}`;
};
exports.hexToRGB = hexToRGB;
const formatValue = value => Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
}).format(value);
exports.formatValue = formatValue;
//# sourceMappingURL=Utils.js.map