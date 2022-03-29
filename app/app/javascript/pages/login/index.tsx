import React, { useState, useCallback } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Switch,
  Text,
  useColorModeValue,
  HStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "react-query";
import userApi from "../../apis/user";
import { UserLogin } from "../../types/user";
import { useHistory } from "react-router-dom";
import PasswordField from "@components/passwordInput/PasswordField";
// Assets
// import signInImage from "../../images/signInImage.png";

const SignIn = () => {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const defaultUser = { login: "", password: "", password_confirmation: "" };
  const navigate = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<UserLogin>(defaultUser);

  const handValue = useCallback(e => setUser({ ...user, [e.target.name]: e.target.value }), [user.login, user.password, user.password_confirmation]);
  const queryClient = useQueryClient();

  const userLogin: any = useMutation((user: UserLogin) => userApi.login(user), {
    mutationKey: "userLogin",
    onError: (_err, _variables, previousValue: any) => queryClient.setQueryData("currentUser", previousValue),
    onSettled: () => queryClient.invalidateQueries("currentUser"),
  });

  const wechatLogin: any = useMutation(() => userApi.wechatLogin(), {
    mutationKey: "wechatLogin",
    // onError: (_err, _variables, previousValue: any) =>
    //   queryClient.setQueryData("currentUser", previousValue),
    // onSettled: () => queryClient.invalidateQueries("currentUser"),
  });

  const handWechatLogin = useCallback(() => {
    wechatLogin.mutate({
      onSuccess: (data: any) => {
        if (data.status === 200) {
          localStorage.setItem("token", data.headers.authorization);
          window.location.replace("/dashboard");
        }
      },
    });
  }, []);

  const handleSubmit = () => {
    userLogin.mutate(user, {
      onSuccess: (data: any) => {
        if (data.status === 200) {
          localStorage.setItem("token", data.headers.authorization);
          window.location.replace("/dashboard");
        }
      },
    });
  };

  const handSend = useCallback(() => {}, []);
  return (
    <Flex position="relative" mb="40px">
      <Flex h={{ sm: "initial", md: "75vh", lg: "85vh" }} w="100%" maxW="1044px" mx="auto" justifyContent="space-between" mb="30px" pt={{ sm: "100px", md: "0px" }}>
        <Flex alignItems="center" justifyContent="start" style={{ userSelect: "none" }} mb="60px" mt="20px" w={{ base: "100%", md: "100%", lg: "102%" }}>
          <Flex
            direction="column"
            w="440px"
            height="620px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mt={{ sm: "80px", md: "120px", lg: "200px", xl: "140px" }}
            mx={{ base: "100px", md: "150px", lg: "80px" }}
            bg={bgColor}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Heading color={titleColor} fontSize="32px" mb="10px">
              欢迎回来
            </Heading>
            <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="14px">
              填入你的用户名或邮箱和密码
            </Text>
            <FormControl variant="floating" isRequired>
              <Input autoFocus={true} borderRadius="15px" fontSize="sm" mb="36px" variant="filled" type="text" placeholder=" " size="lg" value={user.login} name="login" onChange={e => handValue(e)} />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal" htmlFor="login">
                用户名或是电子邮件
              </FormLabel>
            </FormControl>
            <PasswordField password={user.password} handValue={handValue} ref={undefined} isConfirm={false} />
            <PasswordField password_confirmation={user.password_confirmation} handValue={handValue} ref={undefined} isConfirm={true} />
            <HStack justify="space-between">
              <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="teal" me="10px" />
                <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
                  记住我
                </FormLabel>
              </FormControl>
              <Button variant="link" colorScheme="blue" size="sm" onClick={() => handSend()}>
                忘记密码?
              </Button>
            </HStack>
            <Button
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="10px"
              color="white"
              mt="20px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
              onClick={() => handleSubmit()}
            >
              <Box fontSize="18px">登录</Box>
            </Button>
            <Button
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              color="white"
              mt="10px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
              onClick={() => handWechatLogin()}
            >
              <Box fontSize="18px">微信登录</Box>
            </Button>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" maxW="100%" mt="0px">
              <Text color={textColor} fontWeight="medium">
                您还没有账号?
                <Box onClick={() => navigate.push("/auth/signup")} color={titleColor} as="span" ms="5px" fontWeight="bold">
                  注册
                </Box>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box display={{ base: "none", md: "block" }} overflowX="hidden" h="100%" w="40vw" position="absolute" right="0px">
          <Box
            // bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            borderBottomLeftRadius="20px"
          ></Box>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>重置密码</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SignIn;
