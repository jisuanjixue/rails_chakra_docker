import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger: any = useRef(null);
  const sidebar: any = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;

      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    const node: any = document.querySelector("body");
    sidebarExpanded
      ? node.classList.add("sidebar-expanded")
      : node.classList.remove("sidebar-expanded");
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 transition-opacity duration-200 lg:z-auto lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar lg:sidebar-expanded:!w-64 absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 transform flex-col overflow-y-scroll bg-gray-800 p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:w-20 lg:translate-x-0 lg:overflow-y-auto 2xl:!w-64 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="mb-10 flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="text-gray-500 hover:text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-gray-500">
              <span
                className="lg:sidebar-expanded:hidden hidden w-6 text-center lg:block 2xl:hidden"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                Pages
              </span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                  pathname === "/" && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/"
                  className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                    pathname === "/" && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === "/" && "!text-indigo-500"
                        }`}
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname === "/" && "text-indigo-600"
                        }`}
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname === "/" && "text-indigo-200"
                        }`}
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Analytics */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                  pathname.includes("analytics") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/"
                  className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                    pathname.includes("analytics") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("analytics") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("analytics") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Analytics
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* E-Commerce */}
              <SidebarLinkGroup
                activecondition={pathname.includes("ecommerce")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                          pathname.includes("ecommerce") &&
                          "hover:text-gray-200"
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-gray-400 ${
                                  pathname.includes("ecommerce") &&
                                  "text-indigo-300"
                                }`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-gray-700 ${
                                  pathname.includes("ecommerce") &&
                                  "!text-indigo-600"
                                }`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-gray-600 ${
                                  pathname.includes("ecommerce") &&
                                  "text-indigo-500"
                                }`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                              />
                            </svg>
                            <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              信息管理
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-3 w-3 shrink-0 fill-current text-gray-400 ${
                                open && "rotate-180 transform"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-9 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/category/list"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                信息分类
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/signup"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                信息统计
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/login"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                评论管理
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Campaigns */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                  pathname.includes("campaigns") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/"
                  className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                    pathname.includes("campaigns") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("campaigns") && "text-indigo-500"
                        }`}
                        d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("campaigns") && "text-indigo-300"
                        }`}
                        d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Campaigns
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Team */}
              <SidebarLinkGroup activecondition={pathname.includes("market")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                          pathname.includes("market") && "hover:text-gray-200"
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-gray-600 ${
                                  pathname.includes("market") &&
                                  "text-indigo-500"
                                }`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current text-gray-400 ${
                                  pathname.includes("market") &&
                                  "text-indigo-300"
                                }`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              市场管理
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-3 w-3 shrink-0 fill-current text-gray-400 ${
                                open && "rotate-180 transform"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-9 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/markets"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                市场信息
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                市场行情信息
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Messages */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                  pathname.includes("messages") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/"
                  className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                    pathname.includes("messages") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("messages") && "text-indigo-500"
                        }`}
                        d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("messages") && "text-indigo-300"
                        }`}
                        d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Messages
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Tasks */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                  pathname.includes("tasks") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/"
                  className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                    pathname.includes("tasks") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("tasks") && "text-indigo-500"
                        }`}
                        d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"
                      />
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("tasks") && "text-indigo-500"
                        }`}
                        d="M1 1h22v23H1z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("tasks") && "text-indigo-300"
                        }`}
                        d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Tasks
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Inbox */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                  pathname.includes("inbox") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/"
                  className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                    pathname.includes("inbox") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("inbox") && "text-indigo-500"
                        }`}
                        d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("inbox") && "text-indigo-300"
                        }`}
                        d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Inbox
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Calendar */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${
                  pathname.includes("calendar") && "bg-gray-900"
                }`}
              >
                <NavLink
                  to="/"
                  className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                    pathname.includes("calendar") && "hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-gray-600 ${
                          pathname.includes("calendar") && "text-indigo-500"
                        }`}
                        d="M1 3h22v20H1z"
                      />
                      <path
                        className={`fill-current text-gray-400 ${
                          pathname.includes("calendar") && "text-indigo-300"
                        }`}
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg>
                    <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Calendar
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes("settings")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                          pathname.includes("settings") && "hover:text-gray-200"
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-gray-600 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-500"
                                }`}
                                d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z"
                              />
                              <path
                                className={`fill-current text-gray-400 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-300"
                                }`}
                                d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z"
                              />
                              <path
                                className={`fill-current text-gray-600 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-500"
                                }`}
                                d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z"
                              />
                              <path
                                className={`fill-current text-gray-400 ${
                                  pathname.includes("settings") &&
                                  "text-indigo-300"
                                }`}
                                d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z"
                              />
                            </svg>
                            <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Settings
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-3 w-3 shrink-0 fill-current text-gray-400 ${
                                open && "rotate-180 transform"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-9 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                My Account
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Utility */}
              <SidebarLinkGroup activecondition={pathname.includes("utility")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-gray-200 transition duration-150 hover:text-white ${
                          pathname.includes("utility") && "hover:text-gray-200"
                        }`}
                        onClick={e => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className={`fill-current text-gray-400 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-300"
                                }`}
                                cx="18.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current text-gray-600 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-500"
                                }`}
                                cx="5.5"
                                cy="5.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current text-gray-600 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-500"
                                }`}
                                cx="18.5"
                                cy="18.5"
                                r="4.5"
                              />
                              <circle
                                className={`fill-current text-gray-400 ${
                                  pathname.includes("utility") &&
                                  "text-indigo-300"
                                }`}
                                cx="5.5"
                                cy="18.5"
                                r="4.5"
                              />
                            </svg>
                            <span className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                              Utility
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-3 w-3 shrink-0 fill-current text-gray-400 ${
                                open && "rotate-180 transform"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-9 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Changelog
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Roadmap
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                FAQs
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Empty State
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/"
                              className="block truncate text-gray-400 transition duration-150 hover:text-gray-200"
                            >
                              <span className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                404
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="mt-auto hidden justify-end pt-3 lg:inline-flex 2xl:hidden">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="sidebar-expanded:rotate-180 h-6 w-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-gray-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-gray-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
