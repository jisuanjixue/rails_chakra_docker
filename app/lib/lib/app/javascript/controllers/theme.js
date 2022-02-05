"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. import `extendTheme` function
const react_1 = require("@chakra-ui/react");
// 2. Add your color mode config
const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
// 3. extend the theme
const theme = (0, react_1.extendTheme)({ config });
exports.default = theme;
//# sourceMappingURL=theme.js.map