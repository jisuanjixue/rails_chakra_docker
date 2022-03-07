import React, { useState, useCallback } from "react";
// Chakra imports
import { Box, Flex, Button, FormControl, FormLabel, Heading, Input, Switch, Text, useColorModeValue } from "@chakra-ui/react";
import { useQueryClient, useMutation } from "react-query";
import userApi from "../../apis/user";
import { UserLogin } from "../../types/user";
import { useHistory } from "react-router-dom";
// Assets
// import signInImage from "../../images/signInImage.png";

const SignIn = () => {
  // Chakra color mode
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const defaultUser = { login: "", password: "", password_confirmation: "" };
  const navigate = useHistory();
  const [user, setUser] = useState<UserLogin>(defaultUser);

  const handValue = useCallback(
    e => setUser({ ...user, [e.target.name]: e.target.value }),
    [user.login, user.password, user.password_confirmation]
  );
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
  return (
    <Flex position="relative" mb="40px">
      <Flex
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ sm: "100px", md: "0px" }}
      >
        <Flex alignItems="center" justifyContent="start" style={{ userSelect: "none" }} w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex direction="column" w="100%" background="transparent" p="48px" mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize="32px" mb="10px">
              Welcome Back
            </Heading>
            <Text mb="36px" ms="4px" color={textColor} fontWeight="bold" fontSize="14px">
              Enter your email and password to sign in
            </Text>
            <FormControl variant="floating" isRequired>
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                placeholder=""
                size="lg"
                value={user.login}
                name="login"
                onChange={e => handValue(e)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                用户名或是电子邮件
              </FormLabel>
            </FormControl>
            <FormControl variant="floating" isRequired>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder=""
                size="lg"
                value={user.password}
                name="password"
                onChange={e => handValue(e)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                密码
              </FormLabel>
            </FormControl>
            <FormControl variant="floating" isRequired>
              <Input
                borderRadius="15px"
                mb="36px"
                fontSize="sm"
                type="password"
                placeholder=""
                size="lg"
                value={user.password_confirmation}
                name="password_confirmation"
                onChange={e => handValue(e)}
              />
              <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                密码确认
              </FormLabel>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <Switch id="remember-login" colorScheme="teal" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" ms="1" fontWeight="normal">
                Remember me
              </FormLabel>
            </FormControl>
            <Button
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
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
              登录
            </Button>
            <Button
              fontSize="10px"
              type="submit"
              bg="teal.300"
              w="100%"
              h="45"
              mb="20px"
              color="white"
              mt="20px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
              onClick={() => handWechatLogin()}
            >
              微信登录
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
    </Flex>
  );
};

export default SignIn;
