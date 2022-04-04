import React, { useEffect, useContext, useRef } from "react";
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
  FormControl,
  FormLabel,
  VStack,
  StackDivider,
  Box,
  useToast,
  InputLeftAddon,
  Textarea,
  HStack,
} from "@chakra-ui/react";
// request imports
import { useQueryClient, useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
// api imports
import profileApi from "../../apis/profile";
import userApi from "../../apis/user";
// type imports
// Assets
// import avatar1 from "../../images/avatars/avatar1.jpg";
// import avatar2 from "../../images/avatars/avatar2.jpg";
// import avatar3 from "../../images/avatars/avatar3.jpg";

// Custom Icons
import { ProfileIcon, SettingsIcon } from "@components/icons/Icons";
import FileUpload from "@components/upload/FileUpload";
// Custom Components
import { ItemContent } from "@components/menu/ItemContent";
import { UserContext } from "../../controllers/ContextManager";
import SidebarResponsive from "@components/sidebar/SidebarResponsive";
import routes from "../../controllers/routes";
import handInterceptor from "../../apis/axios";
import AvatarWithRipple from "./AvatarWithRipple";

const HeaderLinks = props => {
  const defaultData = {
    user_name: "",
    phone: "",
    description: "",
    avatar_url: "",
  };

  const ProfileSchema = Yup.object().shape({
    user_name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    avatar_url: Yup.string().required("Required"),
  });

  handInterceptor();
  // Chakra Color Mode
  const toast = useToast();
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const inputBg = useColorModeValue("white", "gray.800");
  let mainText = useColorModeValue("gray.700", "gray.200");
  let navbarIcon = useColorModeValue("gray.500", "gray.200");
  const searchIcon = useColorModeValue("gray.700", "gray.200");
  const { logoText, secondary, onOpen, ...rest } = props;
  const initialRef: any = useRef();

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef: any = useRef();
  const { isOpen: isModal, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const queryClient = useQueryClient();
  const navigate = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const { id, name } = state.user;

  useEffect(() => {
    formik.setFieldValue("user_name", name);
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

  const formik = useFormik({
    initialValues: defaultData,
    onSubmit: () => {},
    validationSchema: ProfileSchema,
  });

  const { user_name, phone, description, avatar_url } = formik.values;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const profile = { phone: phone, description: description, avatar_url: avatar_url };
    onSaveProfile(profile);
    onSaveUser(user_name);
  };

  const updateUser = useMutation((name: string) => userApi.update(name), {
    mutationKey: "editUser",
    onError: (_err, _user, context: any) => {
      queryClient.setQueryData(["currentUser", context.user.id], context.previousValue);
    },
    // Always refetch after error or success:
    onSettled: (user: any) => {
      queryClient.invalidateQueries(["currentUser", user.id]);
    },
  });

  const updateProfile = useMutation(profile => profileApi.update(profile), {
    mutationKey: "editProfile",
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["currentUser", id]);
    },
  });

  const onSaveProfile = (profile: any) => {
    updateProfile.mutate(profile, {
      onSuccess: () => {
        toast({
          position: "top",
          isClosable: true,
          variant: "solid",
          title: "编辑成功 ！",
          status: "success",
        });
      },
    });
  };

  const onSaveUser = (name: string) => {
    updateUser.mutate(name, {
      onSuccess: data => {
        toast({
          position: "top",
          isClosable: true,
          variant: "solid",
          title: "编辑成功 ！",
          status: "success",
        });
        closeModal();
        dispatch({ type: "updateUser", payload: data });
      },
    });
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
      <SidebarResponsive logoText={logoText} secondary={secondary} routes={routes} {...rest} />
      <SettingsIcon cursor="pointer" ms={{ base: "16px", xl: "0px" }} me="16px" ref={settingsRef} onClick={onOpen} color={navbarIcon} w="18px" h="18px" />
      <Menu>
        <MenuButton>
          <BellIcon color={navbarIcon} w="18px" h="18px" />
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              <ItemContent time="13 minutes ago" info="from Alicia" boldInfo="New Message" aName="Alicia" />
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
      {id ? (
        <HStack spacing={2} display="flex" alignItems="center">
          <Menu>
            <MenuButton px={4} py={2} transition="all 0.2s" borderRadius="md" borderWidth="0px" _hover={{ bg: "gray.400" }} _expanded={{ bg: "blue.400" }} _focus={{ boxShadow: "outline" }}>
              {name}
            </MenuButton>
            {/* <SlideFade in={isOpen} offsetY="20px"> */}
            <MenuList>
              <NavLink to="/admin/profile">
                <MenuItem>个人信息</MenuItem>
              </NavLink>
              <MenuItem onClick={openModal}>修改信息</MenuItem>
              <MenuItem onClick={() => handOut()}>登出</MenuItem>
            </MenuList>
            {/* </SlideFade> */}
          </Menu>
          <AvatarWithRipple />
        </HStack>
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
      <Modal isOpen={isModal} onClose={closeModal} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改我的资料</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form">
              <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                <FormControl id="name" variant="floating" isRequired>
                  <Input
                    ref={initialRef}
                    isRequired
                    isInvalid
                    errorBorderColor="crimson"
                    name="user_name"
                    value={user_name}
                    onChange={formik.handleChange}
                    type="text"
                    size="md"
                    variant="filled"
                    placeholder=" "
                  />
                  <FormLabel>昵称</FormLabel>
                </FormControl>
                <FormControl id="name" isRequired>
                  <FormLabel>手机号</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="+86" />
                    <Input isRequired isInvalid errorBorderColor="crimson" name="phone" value={phone} onChange={formik.handleChange} type="tel" size="md" variant="filled" placeholder=" " />
                  </InputGroup>
                </FormControl>
                <FormControl variant="floating" id="description">
                  <Textarea placeholder=" " onChange={formik.handleChange} value={description} isFullWidth name="description" variant="filled" />
                  <FormLabel>个人描述</FormLabel>
                </FormControl>
                <FileUpload formik={formik} />
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              取消
            </Button>
            <Button variant="ghost" onClick={e => handleSubmit(e)}>
              确定
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HeaderLinks;
