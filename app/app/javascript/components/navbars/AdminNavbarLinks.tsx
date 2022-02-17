// Chakra Icons
import React from "react";
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// import avatar1 from "../../images/avatars/avatar1.jpg";
// import avatar2 from "../../images/avatars/avatar2.jpg";
// import avatar3 from "../../images/avatars/avatar3.jpg";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "@components/icons/Icons";
// Custom Components
import { ItemContent } from "@components/menu/ItemContent";
import SidebarResponsive from "@components/sidebar/SidebarResponsive";
import { NavLink } from "react-router-dom";
import routes from "../../controllers/routes";

const HeaderLinks = props => {
  const { logoText, secondary, onOpen, ...rest } = props;

  // Chakra Color Mode
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  const searchIcon = useColorModeValue("gray.700", "gray.200");

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef: any = React.useRef();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement
          // eslint-disable-next-line react/no-children-prop
          children={
            <IconButton
              bg="inherit"
              aria-label="Search"
              borderRadius="inherit"
              // _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup>
      <NavLink to="/auth/signin">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: "2px", md: "16px" }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
          }
          leftIcon={
            <ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />
          }
        >
          <Text display={{ sm: "none", md: "flex" }}>Sign In</Text>
        </Button>
      </NavLink>
      <SidebarResponsive
        logoText={logoText}
        secondary={secondary}
        routes={routes}
        {...rest}
      />
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                // aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                // aSrc={avatar2}
              />
            </MenuItem>
            <MenuItem borderRadius="8px">
              <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                // aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default HeaderLinks;
