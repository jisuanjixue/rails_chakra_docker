import React, { useRef, useState, useEffect } from "react";
import SearchModal from "./header/SearchModal";
import Notifications from "./header/Notifications";
import ChangeTheme from "./header/ChangeTheme";
import Help from "./header/Help";
import UserMenu from "./header/UserMenu";
import {
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  Box,
  VStack,
  Button,
} from '@chakra-ui/react';
import { useViewportScroll } from "framer-motion";

function Header({ sidebarOpen, setSidebarOpen }) {
  const ref: any = useRef();
  const [y, setY] = useState(0);
  const bg = useColorModeValue("white", "gray.800");
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);

  return (
    <Box pos="relative">
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
        borderTop="6px solid"
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
        <Flex w="full" h="full" px="6" align="center" justify="space-between">
          {/* <Box className="flex items-center justify-between h-16 -mb-px"> */}
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
            <Flex
              justify="flex-end"
              w="full"
              maxW="824px"
              align="center"
              color="gray.400"
            >
            <HStack spacing="5" display={{ base: "none", md: "flex" }}>
              <ChangeTheme />
              <SearchModal />
              <Notifications />
              <Help />
              {/*  Divider */}
              <hr className="w-px h-6 mx-3 bg-gray-200" />
              <UserMenu />
            </HStack >
            </Flex>
          {/* </Box> */}
        </Flex>
        </chakra.div>
      </chakra.header>
    </Box>
  );
}

export default Header;
