import React, { useRef, useState, useEffect } from "react";
import SearchModal from "./header/SearchModal";
import Notifications from "./header/Notifications";
import ChangeTheme from "./header/ChangeTheme";
import Help from "./header/Help";
import UserMenu from "./header/UserMenu";
import { chakra, Flex, HStack, Box } from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";

function Header() {
  const ref: any = useRef();
  const [y, setY] = useState(0);
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
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex w="full" h="full" px="6" align="center" justify="space-between">
            {/* <Box className="flex items-center justify-between h-16 -mb-px"> */}
            {/* Header: Left side */}
            <Box className="flex"></Box>

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
                <hr className="w-px h-6 mx-3 bg-gray-200" />
                <UserMenu />
              </HStack>
            </Flex>
          </Flex>
        </chakra.div>
      </chakra.header>
    </Box>
  );
}

export default Header;
