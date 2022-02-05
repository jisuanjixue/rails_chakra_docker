"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function SidebarLinkGroup({ children, activecondition }) {
    const [open, setOpen] = (0, react_1.useState)(activecondition);
    const handleClick = () => {
        setOpen(!open);
    };
    return ((0, jsx_runtime_1.jsx)("li", Object.assign({ className: `mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${activecondition && "bg-gray-900"}` }, { children: children(handleClick, open) }), void 0));
}
exports.default = SidebarLinkGroup;
//# sourceMappingURL=SidebarLinkGroup.js.map