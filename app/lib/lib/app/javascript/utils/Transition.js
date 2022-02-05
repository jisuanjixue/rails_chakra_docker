"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_transition_group_1 = require("react-transition-group");
const TransitionContext = react_1.default.createContext({
    parent: {
        show: "",
        appear: "",
        isInitialRender: false,
    },
});
function useIsInitialRender() {
    const isInitialRender = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(() => {
        isInitialRender.current = false;
    }, []);
    return isInitialRender.current;
}
function CSSTransition(_a) {
    var { show, enter = "", enterStart = "", enterEnd = "", leave = "", leaveStart = "", leaveEnd = "", appear, unmountOnExit, tag = "div", children } = _a, rest = __rest(_a, ["show", "enter", "enterStart", "enterEnd", "leave", "leaveStart", "leaveEnd", "appear", "unmountOnExit", "tag", "children"]);
    const enterClasses = enter.split(" ").filter(s => s.length);
    const enterStartClasses = enterStart.split(" ").filter(s => s.length);
    const enterEndClasses = enterEnd.split(" ").filter(s => s.length);
    const leaveClasses = leave.split(" ").filter(s => s.length);
    const leaveStartClasses = leaveStart.split(" ").filter(s => s.length);
    const leaveEndClasses = leaveEnd.split(" ").filter(s => s.length);
    const removeFromDom = unmountOnExit;
    function addClasses(node, classes) {
        classes.length && node.classList.add(...classes);
    }
    function removeClasses(node, classes) {
        classes.length && node.classList.remove(...classes);
    }
    const nodeRef = react_1.default.useRef(null);
    const Component = tag;
    return ((0, jsx_runtime_1.jsx)(react_transition_group_1.CSSTransition, Object.assign({ appear: appear, nodeRef: nodeRef, unmountOnExit: removeFromDom, in: show, addEndListener: done => {
            const node = nodeRef.current;
            node.addEventListener("transitionend", done, false);
        }, onEnter: () => {
            const node = nodeRef.current;
            if (!removeFromDom)
                node.style.display = null;
            addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
        }, onEntering: () => {
            removeClasses(nodeRef.current, enterStartClasses);
            addClasses(nodeRef.current, enterEndClasses);
        }, onEntered: () => {
            removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
        }, onExit: () => {
            addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
        }, onExiting: () => {
            removeClasses(nodeRef.current, leaveStartClasses);
            addClasses(nodeRef.current, leaveEndClasses);
        }, onExited: () => {
            const node = nodeRef.current;
            removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
            if (!removeFromDom)
                node.style.display = "none";
        } }, { children: (0, jsx_runtime_1.jsx)(Component, Object.assign({ ref: nodeRef }, rest, { style: { display: !removeFromDom ? "none" : null } }, { children: children }), void 0) }), void 0));
}
function Transition(_a) {
    var { show, appear } = _a, rest = __rest(_a, ["show", "appear"]);
    const { parent } = (0, react_1.useContext)(TransitionContext);
    const isInitialRender = useIsInitialRender();
    const isChild = show === undefined;
    if (isChild) {
        return ((0, jsx_runtime_1.jsx)(CSSTransition, Object.assign({ unmountOnExit: undefined, children: undefined, appear: parent.appear || !parent.isInitialRender, show: parent.show }, rest), void 0));
    }
    return ((0, jsx_runtime_1.jsx)(TransitionContext.Provider, Object.assign({ value: {
            parent: {
                show,
                isInitialRender,
                appear,
            },
        } }, { children: (0, jsx_runtime_1.jsx)(CSSTransition, Object.assign({ unmountOnExit: undefined, children: undefined, appear: appear, show: show }, rest), void 0) }), void 0));
}
exports.default = Transition;
//# sourceMappingURL=Transition.js.map