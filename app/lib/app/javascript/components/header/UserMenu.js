"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Transition_1 = require("../../utils/Transition");
const ContextManager_1 = require("../../controllers/ContextManager");
const user_1 = require("../../apis/user");
const react_query_1 = require("react-query");
const UserMenu = (props = {}) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    const navigate = (0, react_router_dom_1.useHistory)();
    const { state, dispatch } = (0, react_1.useContext)(ContextManager_1.UserContext);
    const [dropdownOpen, setDropdownOpen] = (0, react_1.useState)(false);
    const [isShow, setIsShow] = (0, react_1.useState)(false);
    const [user, setUser] = (0, react_1.useState)(state.user);
    const trigger = (0, react_1.useRef)(null);
    const dropdown = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setUser(state.user);
    }, [state.user]);
    // close on click outside
    (0, react_1.useEffect)(() => {
        const clickHandler = ({ target }) => {
            if (!dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)) {
                return;
            }
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    // close if the esc key is pressed
    (0, react_1.useEffect)(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27)
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });
    const logoutUser = (0, react_query_1.useMutation)(() => user_1.default.logout(), {
        onSuccess: data => {
            if (data.status === 200) {
                navigate("/");
                localStorage.removeItem("token");
            }
        },
    });
    const handOut = () => {
        logoutUser.mutate();
        setDropdownOpen(!dropdownOpen);
    };
    const handEditUser = () => {
        setIsShow(true);
        setDropdownOpen(!dropdownOpen);
    };
    const handValue = (0, react_1.useCallback)(e => setUser(Object.assign(Object.assign({}, user), { name: e.target.value })), [user.name, user.id]);
    const updateUserInfo = (0, react_query_1.useMutation)((user) => user_1.default.update(user), {
        mutationKey: "editUser",
        onError: (_err, _user, context) => {
            queryClient.setQueryData(["currentUser", context.user.id], context.previousValue);
        },
        // Always refetch after error or success:
        onSettled: (user) => {
            queryClient.invalidateQueries(["currentUser", user.id]);
        },
    });
    const onSubmit = () => {
        updateUserInfo.mutate(user, {
            onSuccess: data => {
                console.log("🚀 ~ file: UserMenu.tsx ~ line 94 ~ onSubmit ~ data", data);
                setIsShow(false);
                dispatch({ type: "updateUser", payload: data });
            },
        });
        if (updateUserInfo.isSuccess) {
            setIsShow(false);
            return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "alert alert-success" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-1" }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", className: "mx-2 h-6 w-6 stroke-current" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("label", { children: "\u64CD\u4F5C\u6210\u529F" }, void 0)] }), void 0) }), void 0));
        }
        if (updateUserInfo.isError) {
            (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "alert alert-error" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex-1" }, { children: [(0, jsx_runtime_1.jsx)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", className: "mx-2 h-6 w-6 stroke-current" }, { children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("label", { children: "\u64CD\u4F5C\u5931\u8D25" }, void 0)] }), void 0) }), void 0);
        }
    };
    const onClose = () => {
        setIsShow(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "relative inline-flex" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ ref: trigger, className: "group inline-flex items-center justify-center", "aria-haspopup": "true", onClick: () => setDropdownOpen(!dropdownOpen), "aria-expanded": dropdownOpen }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex items-center truncate" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "ml-2 truncate text-sm font-medium group-hover:text-gray-800" }, { children: user.name }), void 0), (0, jsx_runtime_1.jsx)("svg", Object.assign({ className: "ml-1 h-3 w-3 shrink-0 fill-current text-gray-400", viewBox: "0 0 12 12" }, { children: (0, jsx_runtime_1.jsx)("path", { d: "M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" }, void 0) }), void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)(Transition_1.default, Object.assign({ className: "min-w-44 absolute top-full right-0 z-10 mt-1 origin-top-right overflow-hidden rounded border border-gray-200 bg-white py-1.5 shadow-lg", show: dropdownOpen, enter: "transition ease-out duration-200 transform", enterStart: "opacity-0 -translate-y-2", enterEnd: "opacity-100 translate-y-0", leave: "transition ease-out duration-200", leaveStart: "opacity-100", leaveEnd: "opacity-0", appear: undefined }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ ref: dropdown, onFocus: () => setDropdownOpen(true), onBlur: () => setDropdownOpen(false) }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mb-1 border-b border-gray-200 px-3 pt-0.5 pb-2" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "font-medium text-gray-800" }, { children: user.name }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-xs italic text-gray-500" }, { children: "\u7BA1\u7406\u5458" }), void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600", to: "/", onClick: () => handEditUser() }, { children: "\u8BBE\u7F6E" }), void 0) }, void 0), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: "flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600", to: "/logout", onClick: () => handOut() }, { children: "\u9000\u51FA" }), void 0) }, void 0)] }, void 0)] }), void 0) }), void 0), isShow && ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "modal modal-open" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-box" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-control" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "label" }, { children: (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "label-text" }, { children: "\u8BF7\u586B\u5165\u7528\u6237\u6635\u79F0" }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("input", { value: user.name, id: "add", onChange: event => handValue(event), type: "text", placeholder: "\u7528\u6237\u6635\u79F0", className: "input input-bordered" }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "modal-action" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn btn-primary", onClick: () => onSubmit() }, { children: "\u786E\u5B9A" }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "btn", onClick: () => onClose() }, { children: "\u5173\u95ED" }), void 0)] }), void 0)] }), void 0) }), void 0))] }), void 0));
};
exports.default = UserMenu;
//# sourceMappingURL=UserMenu.js.map