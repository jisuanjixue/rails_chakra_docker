import React from "react";
import SearchModal from "./header/SearchModal";
import Notifications from "./header/Notifications";
import Help from "./header/Help";
import UserMenu from "./header/UserMenu";

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="-mb-px flex h-16 items-center justify-between">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
            <SearchModal />
            <Notifications />
            <Help />
            {/*  Divider */}
            <hr className="mx-3 h-6 w-px bg-gray-200" />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
