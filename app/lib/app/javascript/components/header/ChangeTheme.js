"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const icons_1 = require("@chakra-ui/icons");
const ChangeTheme = () => {
    const { colorMode, toggleColorMode } = (0, react_1.useColorMode)();
    return ((0, jsx_runtime_1.jsx)(react_1.Button, Object.assign({ size: "sm", colorScheme: "blue", onClick: toggleColorMode }, { children: colorMode === "light" ? (0, jsx_runtime_1.jsx)(react_1.Icon, { as: icons_1.SunIcon }, void 0) : (0, jsx_runtime_1.jsx)(react_1.Icon, { as: icons_1.MoonIcon }, void 0) }), void 0));
};
exports.default = ChangeTheme;
//# sourceMappingURL=ChangeTheme.js.map