"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Banner() {
    const [bannerOpen, setBannerOpen] = (0, react_1.useState)(true);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: bannerOpen && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "z-60 fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex justify-between bg-gray-800 p-3 text-sm text-gray-50 shadow-lg md:rounded" }, { children: (0, jsx_runtime_1.jsxs)("button", Object.assign({ className: "ml-5 text-gray-500 hover:text-gray-400", onClick: () => setBannerOpen(false) }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "sr-only" }, { children: "\u8BBE\u7F6E\u4E3B\u9898" }), void 0), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "h-4 w-4 shrink-0 fill-current", viewBox: "0 0 16 16" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" }, void 0) }), void 0)] }), void 0) }), void 0) }), void 0)) }, void 0));
}
exports.default = Banner;
//# sourceMappingURL=Banner.js.map