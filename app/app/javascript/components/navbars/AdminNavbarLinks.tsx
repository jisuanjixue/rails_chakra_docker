import React, { useState, useEffect, useContext, useCallback } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
// request imports
import { useQueryClient, useMutation } from "react-query";
// api imports
import userApi from "../../apis/user";
// type imports
import { UserInfo } from "../../types/user";
// Assets
// import avatar1 from "../../images/avatars/avatar1.jpg";
// import avatar2 from "../../images/avatars/avatar2.jpg";
// import avatar3 from "../../images/avatars/avatar3.jpg";

// Custom Icons
import { ProfileIcon, SettingsIcon } from "@components/icons/Icons";
// Custom Components
import { ItemContent } from "@components/menu/ItemContent";
import { UserContext } from "../../controllers/ContextManager";
import SidebarResponsive from "@components/sidebar/SidebarResponsive";
import Alter from "@components/alerts/Alter";
import routes from "../../controllers/routes";

const HeaderLinks = props => {
  // Chakra Color Mode
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  const searchIcon = useColorModeValue("gray.700", "gray.200");
  const { logoText, secondary, onOpen, ...rest } = props;

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef: any = React.useRef();
  // const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isModal, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const queryClient = useQueryClient();
  const navigate = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [user, setUser] = useState(state.user);

  const isError = user.name === "";

  useEffect(() => {
    setUser(state.user);
  }, [state.user]);

  const logoutUser = useMutation(() => userApi.logout(), {
    onSuccess: data => {
      if (data.status === 200) {
        navigate.push("/auth/signin");
        localStorage.removeItem("token");
      }
    },
  });

  const handOut = () => {
    logoutUser.mutate();
  };

  const handValue = useCallback(e => setUser({ ...user, name: e.target.value }), [user.name, user.id]);

  const updateUserInfo = useMutation((user: UserInfo) => userApi.update(user), {
    mutationKey: "editUser",
    onError: (_err, _user, context: any) => {
      queryClient.setQueryData(["currentUser", context.user.id], context.previousValue);
    },
    // Always refetch after error or success:
    onSettled: (user: any) => {
      queryClient.invalidateQueries(["currentUser", user.id]);
    },
  });

  // eslint-disable-next-line consistent-return
  const onSubmit = () => {
    updateUserInfo.mutate(user, {
      onSuccess: data => {
        dispatch({ type: "updateUser", payload: data });
      },
    });
    if (updateUserInfo.isSuccess) {
      return <Alter titleColor={mainTeal} textColor={mainTeal} title="操作成功" text="信息已更新" icon="check-circle" />;
    }

    if (updateUserInfo.isError) {
      return <Alter titleColor={mainTeal} textColor={mainTeal} title="操作失败" text="你的信息没有更新" icon="check-circle" />;
    }
  };

  return (
    <Flex pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }} alignItems="center" flexDirection="row">
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
        <Input fontSize="xs" py="11px" color={mainText} placeholder="Type here..." borderRadius="inherit" />
      </InputGroup>
      {user.id ? (
        <Menu>
          <MenuButton px={4} py={2} transition="all 0.2s" borderRadius="md" borderWidth="1px" _hover={{ bg: "gray.400" }} _expanded={{ bg: "blue.400" }} _focus={{ boxShadow: "outline" }}>
            {user.name}
          </MenuButton>
          {/* <SlideFade in={isOpen} offsetY="20px"> */}
          <MenuList>
            <MenuItem>个人信息</MenuItem>
            <MenuDivider />
            <MenuItem onClick={openModal}>修改信息</MenuItem>
            <MenuItem onClick={() => handOut()}>登出</MenuItem>
          </MenuList>
          {/* </SlideFade> */}
        </Menu>
      ) : (
        <NavLink to="/auth/signin">
          <Button
            ms="0px"
            px="0px"
            me={{ sm: "2px", md: "16px" }}
            color={navbarIcon}
            variant="transparent-with-icon"
            rightIcon={<ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />}
            leftIcon={<ProfileIcon color={navbarIcon} w="22px" h="22px" me="0px" />}
          >
            <Text display={{ sm: "none", md: "flex" }}>登录</Text>
          </Button>
        </NavLink>
      )}
      <SidebarResponsive logoText={logoText} secondary={secondary} routes={routes} {...rest} />
      <SettingsIcon cursor="pointer" ms={{ base: "16px", xl: "0px" }} me="16px" ref={settingsRef} onClick={onOpen} color={navbarIcon} w="18px" h="18px" />
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
      <Modal isOpen={isModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" variant="floating" isInvalid={isError} isRequired>
              <Input isRequired isInvalid errorBorderColor="crimson" value={user.name} onChange={event => handValue(event)} type="text" size="md" variant="filled" placeholder="" />
              <FormLabel>用户昵称</FormLabel>
              {!isError ? <FormHelperText>填写不同的昵称</FormHelperText> : <FormErrorMessage>必填</FormErrorMessage>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              取消
            </Button>
            <Button variant="ghost" onClick={() => onSubmit()}>
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HeaderLinks;
