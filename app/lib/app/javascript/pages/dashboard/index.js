"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_query_1 = require("react-query");
const react_router_dom_1 = require("react-router-dom");
const WelcomeBanner_1 = require("../../components/dashboard/WelcomeBanner");
const DashboardCard01_1 = require("../../components/dashboard/DashboardCard01");
const Banner_1 = require("../../components/Banner");
const user_1 = require("../../apis/user");
const ContextManager_1 = require("../../controllers/ContextManager");
const Dashboard = () => {
    const { dispatch } = (0, react_1.useContext)(ContextManager_1.UserContext);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const initialUser = { name: "", email: "" };
    const fetchCurrentUser = () => {
        return (0, react_query_1.useQuery)("currentUser", async () => {
            const { data } = await user_1.default.queryMe();
            return data;
        }, {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                dispatch({ type: "getUser", payload: data });
            },
            onError: err => {
                if (err)
                    navigate("/login");
            },
            initialData: initialUser,
        });
    };
    fetchCurrentUser();
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex h-screen overflow-hidden" }, { children: [(0, jsx_runtime_1.jsx)("main", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full px-4 py-8 mx-auto max-w-9xl sm:px-6 lg:px-8" }, { children: [(0, jsx_runtime_1.jsx)(WelcomeBanner_1.default, {}, void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "grid grid-cols-12 gap-6" }, { children: (0, jsx_runtime_1.jsx)(DashboardCard01_1.default, {}, void 0) }), void 0)] }), void 0) }, void 0), (0, jsx_runtime_1.jsx)(Banner_1.default, {}, void 0)] }), void 0) }, void 0));
};
exports.default = Dashboard;
//# sourceMappingURL=index.js.map