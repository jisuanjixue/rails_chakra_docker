import React from "react";
import SearchModal from "./header/SearchModal";
import Notifications from "./header/Notifications";
import ChangeTheme from "./header/ChangeTheme";
import Help from "./header/Help";
import UserMenu from "./header/UserMenu";
import { Box } from '@chakra-ui/react'

function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <Box className="px-4 sm:px-6 lg:px-8">
        <Box className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <Box className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </Box>

          {/* Header: Right side */}
          <Box className="flex items-center">
          <ChangeTheme />
            <SearchModal />
            <Notifications />
            <Help />
            {/*  Divider */}
            <hr className="w-px h-6 mx-3 bg-gray-200" />
            <UserMenu />
          </Box>
        </Box>
      </Box>
    </header>
  );
}

export default Header;
