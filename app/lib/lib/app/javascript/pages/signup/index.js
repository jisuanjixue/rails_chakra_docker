"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_query_1 = require("react-query");
const user_1 = require("../../apis/user");
const react_router_dom_1 = require("react-router-dom");
const Signup = () => {
    const navigate = (0, react_router_dom_1.useHistory)();
    const [user, setUser] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
    });
    const handValue = (0, react_1.useCallback)(e => setUser(Object.assign(Object.assign({}, user), { [e.target.name]: e.target.value })), [user.name, user.email, user.password]);
    const userRegistration = (0, react_query_1.useMutation)((user) => user_1.default.create(user), {
        mutationKey: "userRegistration",
        onSuccess: () => {
            navigate("/");
        },
        onError: (err, variables) => {
            console.log(err, variables);
        },
    });
    const handleSubmit = () => {
        userRegistration.mutate(user);
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex min-h-screen items-center bg-gray-50" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "mx-auto h-full max-w-4xl flex-1 rounded-lg bg-white shadow-xl" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "flex flex-col md:flex-row" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "h-32 md:h-auto md:w-1/2" }, { children: (0, jsx_runtime_1.jsx)("img", { className: "h-full w-full object-cover", src: "https://source.unsplash.com/user/erondu/1600x900", alt: "img" }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex items-center justify-center p-6 sm:p-12 md:w-1/2" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "w-full" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "flex justify-center" }, { children: (0, jsx_runtime_1.jsxs)("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", className: "h-20 w-20 text-blue-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M12 14l9-5-9-5-9 5 9 5z" }, void 0), (0, jsx_runtime_1.jsx)("path", { d: "M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" }, void 0), (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" }, void 0)] }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "mb-4 text-center text-2xl font-bold text-gray-700" }, { children: "\u6CE8\u518C" }), void 0), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block text-sm" }, { children: "\u6635\u79F0" }), void 0), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600", placeholder: "Name", value: user.name, name: "name", onChange: e => handValue(e) }, void 0)] }, void 0), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "mt-4" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "block text-sm" }, { children: "\u7535\u5B50\u90AE\u4EF6" }), void 0), (0, jsx_runtime_1.jsx)("input", { type: "email", className: "w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600", placeholder: "Email Address", value: user.email, name: "email", onChange: e => handValue(e) }, void 0)] }), void 0), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: "mt-4 block text-sm" }, { children: "\u5BC6\u7801" }), void 0), (0, jsx_runtime_1.jsx)("input", { className: "w-full rounded-md border px-4 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600", placeholder: "Password", type: "password", value: user.password, name: "password", onChange: e => handValue(e) }, void 0)] }, void 0), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "focus:shadow-outline-blue mt-4 block w-full rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-center text-sm font-medium leading-5 text-white transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600", onClick: () => handleSubmit() }, { children: "\u6CE8\u518C" }), void 0)] }), void 0) }), void 0)] }), void 0) }), void 0) }), void 0) }, void 0));
};
exports.default = Signup;
//# sourceMappingURL=index.js.map