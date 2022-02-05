"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ContextManager_1 = require("../controllers/ContextManager");
const initialState = { user: {} };
const reducer = (state, action) => {
    switch (action.type) {
        case "getUser":
            return Object.assign(Object.assign({}, state), { user: action.payload });
        case "updateUser":
            return Object.assign(Object.assign({}, state), { user: action.payload });
        default:
            return state;
    }
};
const UserProvider = ({ children }) => {
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    const contextValue = (0, react_1.useMemo)(() => {
        return { state, dispatch };
    }, [state, dispatch]);
    return ((0, jsx_runtime_1.jsx)(ContextManager_1.UserContext.Provider, Object.assign({ value: contextValue }, { children: children }), void 0));
};
exports.default = UserProvider;
//# sourceMappingURL=index.js.map