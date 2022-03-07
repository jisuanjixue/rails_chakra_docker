import React from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
  useControllableState,
  HStack,
} from "@chakra-ui/react";
import { FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { HiCode } from "react-icons/hi";
// import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { Logo } from "@choc-ui/logo";
import NavItem from "./NavItem";

export default function Sidebar() {
  const sidebar = useDisclosure();
  // const [show, setShow] = useControllableState({ defaultValue: true });
  const [navSize, changeNavSize] = useControllableState({
    defaultValue: "large",
  });
  const integrations = useDisclosure();
  const integrationsOne = useDisclosure();

  const SidebarContent = () => (
    <Flex
      display={{ base: "none", md: "inline-flex" }}
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === "small" ? "15px" : "30px"}
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      bg={useColorModeValue("white", "gray.800")}
    >
      <HStack spacing="24px">
        <Logo />
        <Text
          fontSize="md"
          ml={5}
          display={navSize === "small" ? "none" : "flex"}
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          管理系统
        </Text>
      </HStack>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <IconButton
          aria-label="open siderbar"
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />
        <NavItem
          navSize={navSize}
          icon={MdHome}
          title="分析仪表"
          description="This is the description for the dashboard."
          active={undefined}
        />
        <NavItem navSize={navSize} icon={FaRss} title="市场管理" onClick={integrations.onToggle}>
          <Icon as={MdKeyboardArrowRight} ml="auto" transform={integrations.isOpen && "rotate(90deg)"} />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem navSize={navSize} title="市场信息">
            <NavLink to="/markets/list">
              {/* <Text className="text-sm font-medium duration-200 lg:sidebar-expanded:opacity-100 lg:opacity-0 2xl:opacity-100">
                  
                </Text> */}
            </NavLink>
          </NavItem>
        </Collapse>
        <NavItem navSize={navSize} icon={HiCode} title="信息管理" onClick={integrationsOne.onToggle}>
          <Icon as={MdKeyboardArrowRight} ml="auto" transform={integrationsOne.isOpen && "rotate(90deg)"} />
        </NavItem>
        <Collapse in={integrationsOne.isOpen}>
          <NavItem>
            <NavLink to="/category/list">
              <Text className="text-sm font-medium duration-200 lg:sidebar-expanded:opacity-100 lg:opacity-0 2xl:opacity-100">
                信息分类
              </Text>
            </NavLink>
          </NavItem>
        </Collapse>
        <NavItem
          navSize={navSize}
          title="Changelog"
          icon={AiFillGift}
          // description={undefined}
          // active={undefined}
          // children={undefined}
        />
        <NavItem
          navSize={navSize}
          title="Settings"
          icon={BsGearFill}
          // description={undefined}
          // active={undefined}
          // children={undefined}
        />
      </Flex>
    </Flex>
  );
  return (
    <>
      <SidebarContent />
      <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 0 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
        </Flex>
      </Box>
    </>
  );
}
