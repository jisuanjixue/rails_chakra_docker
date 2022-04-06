import React, { useRef, useEffect, useContext } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";

const TransitionContext = React.createContext({
  parent: {
    show: "",
    appear: "",
    isInitialRender: false,
  },
});

function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

function CSSTransition({ show, enter = "", enterStart = "", enterEnd = "", leave = "", leaveStart = "", leaveEnd = "", appear, unmountOnExit, tag = "div", children, ...rest }) {
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

  const nodeRef = React.useRef(null);
  const Component: any = tag;

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={done => {
        const node: any = nodeRef.current;
        node.addEventListener("transitionend", done, false);
      }}
      onEnter={() => {
        const node: any = nodeRef.current;
        if (!removeFromDom) node.style.display = null;
        addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterStartClasses);
        addClasses(nodeRef.current, enterEndClasses);
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses);
        addClasses(nodeRef.current, leaveEndClasses);
      }}
      onExited={() => {
        const node: any = nodeRef.current;
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
        if (!removeFromDom) node.style.display = "none";
      }}
    >
      <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? "none" : null }}>
        {children}
      </Component>
    </ReactCSSTransition>
  );
}

function Transition({ show, appear, ...rest }) {
  const { parent } = useContext(TransitionContext);

  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return <CSSTransition unmountOnExit={undefined} children={undefined} appear={parent.appear || !parent.isInitialRender} show={parent.show} {...rest} />;
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition unmountOnExit={undefined} children={undefined} appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
