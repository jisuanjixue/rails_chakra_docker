// Chakra imports
import { Box, Button, Flex, FormControl, FormLabel, HStack, Icon, Input, Link, Switch, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import {
  // useQueryClient,
  useMutation,
} from "react-query";
import userApi from "../../apis/user";
import { useHistory } from "react-router-dom";
import { UserRegister } from "../../types/user";
// Assets
// import BgSignUp from "../../images/BgSignUp.png";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import Alter from "@components/alerts/Alter";
import PasswordField from "@components/passwordInput/PasswordField";

const SignUp = () => {
  const toast = useToast();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
  const navigate = useHistory();
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const [user, setUser] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
  });

  const handValue = useCallback(e => setUser({ ...user, [e.target.name]: e.target.value }), [user.name, user.email, user.password]);

  const userRegistration = useMutation((user: UserRegister) => userApi.create(user), {
    mutationKey: "userRegistration",
    onSuccess: () => {
      navigate.push("/auth/signin");
    },
    onError: (error, variables) => {
      const { message } = error.response.data.status;
      if (message.includes("Email has already been taken") || message.includes("Name has already been taken")) {
        const title = `${variables.email}已被注册` || `${variables.name}已被注册`;
        toast({
          position: "top",
          isClosable: true,
          variant: "solid",
          render: () => <Alter title={title} titleColor={mainTeal} textColor={mainTeal} text="请使用另一个邮箱注册" icon="check-circle" />,
        });
      }

      if (message.includes("Name has already been taken")) {
        const title = `${variables.name}已被注册`;
        toast({
          position: "top",
          isClosable: true,
          variant: "solid",
          render: () => <Alter title={title} titleColor={mainTeal} textColor={mainTeal} text="请使用另一个昵称注册" icon="check-circle" />,
        });
      }
      // navigate.push("/auth/signup");
    },
  });

  const handleSubmit = () => {
    userRegistration.mutate(user);
  };
  return (
    <Flex direction="column" alignSelf="center" justifySelf="center" overflow="hidden">
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        // bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex direction="column" textAlign="center" justifyContent="center" align="center" mt="6.5rem" mb="30px">
        <Text fontSize="4xl" color="white" fontWeight="bold">
          欢迎!
        </Text>
        <Text fontSize="md" color="white" fontWeight="normal" mt="10px" mb="26px" w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}>
          在创建您的新帐户或是登录。
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex direction="column" w="445px" background="transparent" borderRadius="15px" p="40px" mx={{ base: "100px" }} bg={bgColor} boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)">
          <Text fontSize="xl" color={textColor} fontWeight="bold" textAlign="center" mb="22px">
            Register With
          </Text>
          <HStack spacing="15px" justify="center" mb="22px">
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon as={FaFacebook} w="30px" h="30px" _hover={{ filter: "brightness(120%)" }} />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon as={FaApple} w="30px" h="30px" _hover={{ filter: "brightness(120%)" }} />
              </Link>
            </Flex>
            <Flex
              justify="center"
              align="center"
              w="75px"
              h="75px"
              borderRadius="15px"
              border="1px solid lightgray"
              cursor="pointer"
              transition="all .25s ease"
              _hover={{ filter: "brightness(120%)", bg: bgIcons }}
            >
              <Link href="#">
                <Icon as={FaGoogle} w="30px" h="30px" _hover={{ filter: "brightness(120%)" }} />
              </Link>
            </Flex>
          </HStack>
          <Text fontSize="lg" color="gray.400" fontWeight="bold" textAlign="center" mb="22px">
            或者
          </Text>
          <FormControl variant="floating" isRequired>
            <Input
              fontSize="sm"
              autoFocus={true}
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder=" "
              mb="24px"
              size="lg"
              value={user.name}
              name="name"
              onChange={e => handValue(e)}
              variant="filled"
            />
            <FormLabel fontSize="sm" fontWeight="normal">
              昵称
            </FormLabel>
          </FormControl>
          <FormControl variant="floating" isRequired>
            <Input fontSize="sm" ms="4px" borderRadius="15px" type="email" placeholder=" " mb="24px" size="lg" value={user.email} name="email" variant="filled" onChange={e => handValue(e)} />
            <FormLabel fontSize="sm" fontWeight="normal">
              电子邮件
            </FormLabel>
          </FormControl>
          <PasswordField password={user.password} handValue={handValue} ref={undefined} isConfirm={false} />
          <FormControl display="flex" alignItems="center" mb="24px">
            <Switch id="remember-login" colorScheme="teal" me="10px" />
            <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
              记住我
            </FormLabel>
          </FormControl>
          <Button
            type="submit"
            bg="teal.300"
            fontSize="10px"
            color="white"
            fontWeight="bold"
            w="100%"
            h="45"
            mb="24px"
            _hover={{
              bg: "teal.200",
            }}
            _active={{
              bg: "teal.400",
            }}
            onClick={() => handleSubmit()}
          >
            <Box fontSize="18px">注册</Box>
          </Button>
          <Flex flexDirection="column" justifyContent="center" alignItems="center" maxW="100%" mt="0px">
            <Text color={textColor} fontWeight="medium">
              您已有账号?
              <Box onClick={() => navigate.push("/auth/signin")} color={titleColor} as="span" ms="5px" fontWeight="bold">
                登录
              </Box>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
