import React, { useState, useMemo, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useTable, useGlobalFilter, usePagination, useSortBy } from "react-table";
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
  useToast,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Heading,
  ButtonGroup,
  Container,
  Table,
  Icon,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormLabel,
  FormControl,
  TableCaption,
  Input,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  VStack,
  StackDivider,
  useConst,
  useControllableState,
  Stack,
  Switch,
  Textarea,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SkeletonCircle,
  SkeletonText,
  IconButton,
  Tooltip,
  Select,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, ChevronDownIcon, ChevronUpIcon, ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { BsLightningFill } from "react-icons/bs";
import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from "react-icons/ti";
import { useFormik } from "formik";
import * as Yup from "yup";

import marketApi from "../../apis/market";
import { MarketInfo } from "../../types/market";
import arr from "../../../../public/addr";
import Alter from "@components/alerts/Alter";

const Market = () => {
  const [firstList, setFirstList] = useControllableState({ defaultValue: [] });
  const [secondList, setSecondList] = useControllableState({ defaultValue: [] });
  const [marketId, setMarketId] = useControllableState({ defaultValue: "" });

  const { isOpen, onOpen, onClose: onSelectClose } = useDisclosure();
  const { isOpen: isAddrOpen, onOpen: onAddrOpen, onClose: onAddrClose } = useDisclosure();
  const { isOpen: isFirstOpen, onOpen: onFirstOpen, onClose: onFirstClose } = useDisclosure();
  const { isOpen: isSecondOpen, onOpen: onSecondOpen, onClose: onSecondClose } = useDisclosure();
  const defaultData = useConst<MarketInfo>({
    name: "",
    area: "",
    is_show: false,
    address: [],
    remark: "",
  });

  // const [market, setMarket] = useState<MarketInfo>(defaultData);
  const [show, setShow] = useState({ isShow: false, type: "" });
  const toast = useToast();

  const cancelRef: any = useRef();
  const initialRef: any = useRef();
  const finalRef: any = useRef();
  const areas = ["产区", "销区"];

  const MarketSchema = Yup.object({
    name: Yup.string()
      .min(1, "太短了")
      .max(10, "太长了!")
      .required(
        <Text as="sup" color="red">
          必填
        </Text>
      ),
    area: Yup.string().required("必选").oneOf(areas),
    is_show: Yup.boolean().default(false).equals([true]),
    address: Yup.array().min(3, "至少3个地址"),
  });

  const queryClient = useQueryClient();
  const fetchMarkets = () => {
    return useQuery(
      "markets",
      async () => {
        const { data } = await marketApi.list();
        return data;
      },
      {
        refetchOnWindowFocus: false,
      }
    );
  };

  //isRefetching
  const { status, data, isFetching } = fetchMarkets();
  const tableData = useMemo(() => data?.markets, [status === "success", data]);

  const onSave = values => {
    if (show.type === "add") {
      addMarket.mutate(values, {
        onSuccess: () => {
          toast({
            position: "top",
            isClosable: true,
            title: "新增成功！",
            status: "success",
            variant: "solid",
          });
          setShow({ isShow: false, type: "" });
        },
        onError: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            title: "新增失败！",
            status: "error",
          });
        },
      });
    } else if (show.type === "edit") {
      updateMarket.mutate(values, {
        onSuccess: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            title: "编辑成功 ！",
            status: "success",
          });
          setShow({ isShow: false, type: "" });
        },
        onError: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            title: "编辑失败！",
            status: "error",
          });
        },
      });
    } else {
      setShow({ isShow: false, type: "" });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formik.values);
  };

  const formik = useFormik({
    initialValues: defaultData,
    onSubmit: () => {},
    onReset: () => {},
    validationSchema: MarketSchema,
  });

  // Mutations
  const addMarket = useMutation((market: any) => marketApi.create(market), {
    mutationKey: "addMarket",
    onMutate: async data => {
      await queryClient.cancelQueries("markets");
      const previousValue = queryClient.getQueryData("markets");
      queryClient.setQueryData("markets", (old: any) => {
        return {
          ...old,
          markets: old.markets.concat([data]),
        };
      });
      return previousValue;
    },
    onError: (_err, _variables, previousValue: any) => queryClient.setQueryData("markets", previousValue),
    onSettled: () => queryClient.invalidateQueries("markets"),
  });

  const updateMarket = useMutation((market: any) => marketApi.update(market), {
    mutationKey: "updateMarket",
    onMutate: async newMarket => {
      await queryClient.cancelQueries(["markets", newMarket.id]);
      // Snapshot the previous value
      const previousValue = queryClient.getQueryData(["markets", newMarket.id]);
      // Optimistically update to the new value
      queryClient.setQueryData(["markets", newMarket.id], newMarket);
      // Return a context object with the snapshotted value
      return { previousValue, newMarket };
    },
    onError: (err, newMarket, context: any) => {
      queryClient.setQueryData(["markets", context.newMarket.id], context.previousValue);
    },
    // Always refetch after error or success:
    onSettled: (newMarket: any) => {
      queryClient.invalidateQueries(["markets", newMarket.id]);
    },
  });

  const deleteMarket = useMutation((id: String) => marketApi.remove(id), {
    mutationKey: "deleteMarket",
    onMutate: async id => {
      await queryClient.cancelQueries(["markets", id]);
      const previousValue: any = queryClient.getQueryData("markets");
      const updateValue = [...previousValue.markets];
      const removeDeleted = updateValue.filter(f => f.id !== id);
      queryClient.setQueryData("markets", (old: any) => {
        return {
          ...old,
          markets: removeDeleted,
        };
      });
      return previousValue;
    },
    onError: (_err, _variables, previousValue: any) => queryClient.setQueryData("markets", previousValue),
    onSettled: () => queryClient.invalidateQueries("markets"),
  });

  const getFullAddress = address => {
    if (address.length > 0) {
      const provice: any = arr.find(f => f.value === address[0]);
      const proviceData = address.length === 2 ? provice?.children[0]?.children : provice?.children;
      const city: any = proviceData.find(f => f.value === address[1]);
      const district = address.length === 2 ? { label: "" } : city?.children.find(f => f.value === address[2]);
      return `${provice?.label}${city?.label}${district?.label}`;
    }

    return "";
  };

  const handDelSubmit = () => {
    deleteMarket.mutate(marketId, {
      onSuccess: () => {
        toast({
          position: "top",
          isClosable: true,
          variant: "solid",
          title: "删除成功！",
          status: "success",
        });
        setShow({ isShow: false, type: "" });
      },
      onError: () => {
        toast({
          position: "top",
          isClosable: true,
          variant: "solid",
          title: "删除失败！",
          status: "success",
        });
      },
    });
  };

  const onClose = () => {
    setShow({ isShow: false, type: "" });
  };

  const handModal = type => {
    setShow({ isShow: true, type });
  };

  const handDel = (id, type) => {
    setMarketId(id);
    setShow({ isShow: true, type });
  };

  const handEdit = (row, type) => {
    formik.setValues({ ...row });
    setShow({ isShow: true, type });
  };

  const TableList = ({ columns: marketColumns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      gotoPage,
      pageCount,
      prepareRow,
      pageOptions,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      setPageSize,
      setGlobalFilter,
      state,
    } = useTable(
      {
        columns: marketColumns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );

    const { pageIndex, pageSize } = state;
    return (
      <>
        <Flex justify="space-between" align="center" w="100%" px="22px">
          <Stack direction={{ sm: "column", md: "row" }} spacing={{ sm: "4px", md: "12px" }} align="center" me="12px" my="24px" minW={{ sm: "100px", md: "200px" }} />
          <Input type="text" placeholder="Search..." minW="75px" maxW="175px" fontSize="sm" _focus={{ borderColor: "teal.300" }} onChange={e => setGlobalFilter(e.target.value)} />
        </Flex>
        <Flex direction="column" w="full" bg="gray.600" alignItems="center" justifyContent="center" overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Table
            w="full"
            display={{
              sm: "block",
              md: "table",
            }}
            sx={{
              "@media print": {
                display: "table",
              },
            }}
            bg={useColorModeValue("white", "gray.800")}
            mb="24px"
            {...getTableProps()}
            shadow="base"
            rounded="lg"
            colorScheme="teal"
            size="md"
          >
            <TableCaption>市场信息</TableCaption>
            <Thead
              display={{
                sm: "none",
                md: "table-header-group",
              }}
              sx={{
                "@media print": {
                  display: "table-header-group",
                },
              }}
            >
              {headerGroups.map((headerGroup, i) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                  {headerGroup.headers.map((column, index) => (
                    <Th scope="col" {...column.getHeaderProps(column.getSortByToggleProps())} key={index} pe="0px">
                      <Flex justify="flex-start" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                        {column.render("Header")}
                        <Icon
                          w={{ sm: "10px", md: "14px" }}
                          h={{ sm: "10px", md: "14px" }}
                          color={columns.isSorted ? "gray.500" : "gray.400"}
                          float="right"
                          as={column.isSorted ? (column.isSortedDesc ? TiArrowSortedDown : TiArrowSortedUp) : TiArrowUnsorted}
                        />
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody
              display={{
                sm: "block",
                md: "table-header-group",
              }}
              sx={{
                "@media print": {
                  display: "table-row-group",
                },
              }}
              {...getTableBodyProps()}
            >
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <Tr
                    display={{
                      sm: "grid",
                      md: "table-row",
                    }}
                    sx={{
                      "@media print": {
                        display: "table-row",
                      },
                      gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                      gridGap: "10px",
                    }}
                    {...row.getRowProps()}
                    key={i}
                  >
                    {row.cells.map((cell, i) => {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          fontSize={{ sm: "14px" }}
                          key={i}
                          role="cell"
                          display={{
                            sm: "table-cell",
                            md: "table-cell",
                          }}
                          sx={{
                            "@media print": {
                              display: "table-cell",
                            },
                            textTransform: "uppercase",
                            color: useColorModeValue("gray.400", "gray.400"),
                            fontSize: "xl",
                            fontWeight: "bold",
                            letterSpacing: "wider",
                            fontFamily: "heading",
                          }}
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton onClick={() => gotoPage(0)} isDisabled={!canPreviousPage} icon={<ArrowLeftIcon h={3} w={3} />} mr={4} aria-label="pageBtn" />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton onClick={previousPage} isDisabled={!canPreviousPage} icon={<ChevronLeftIcon h={6} w={6} />} aria-label="pageBtn" />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>
              of
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
            <Text flexShrink="0">Go to page:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageOptions.length}
              onChange={(value: number) => {
                const page = value ? value - 1 : 0;
                gotoPage(page);
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              w={32}
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton onClick={nextPage} isDisabled={!canNextPage} icon={<ChevronRightIcon h={6} w={6} />} aria-label="nextBtn" />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton onClick={() => gotoPage(pageCount - 1)} isDisabled={!canNextPage} icon={<ArrowRightIcon h={3} w={3} />} ml={4} aria-label="lastBtn" />
            </Tooltip>
          </Flex>
        </Flex>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <Heading as="h4" size="md">
            名称
          </Heading>
        ),
        id: "name",
        accessor: "name",
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            类型
          </Heading>
        ),
        id: "area",
        accessor: "area",
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            是否显示
          </Heading>
        ),
        id: "isShow",
        accessor: originalRow => (originalRow.is_show ? "是" : "否"),
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            地址
          </Heading>
        ),
        id: "address",
        accessor: originalRow => getFullAddress(originalRow.address),
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            备注
          </Heading>
        ),
        id: "remark",
        accessor: "remark",
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            操作
          </Heading>
        ),
        id: "action",
        accessor: originalRow => (
          <ButtonGroup variant="solid" size="sm" spacing={3}>
            <Button colorScheme="teal" leftIcon={<EditIcon />} size="sm" variant="solid" onClick={() => handEdit(originalRow, "edit")}>
              编辑
            </Button>
            <Button colorScheme="red" size="sm" leftIcon={<DeleteIcon />} variant="solid" onClick={() => handDel(originalRow.id, "del")}>
              删除
            </Button>
          </ButtonGroup>
        ),
      },
    ],
    []
  );

  const { name, area, remark, is_show, address } = formik.values;

  const handItem = (item: any, type) => {
    address[type] = item.value;
    formik.setFieldValue("address", address, false);
    if (type === 0) {
      const arr = item.children.length === 1 ? item.children[0].children : item.children;
      setFirstList(arr);
      onFirstOpen();
    } else if (type === 1) {
      if (item.children) {
        onSecondOpen();
        setSecondList(item.children);
      } else {
        onAddrClose();
        onFirstClose();
      }
    } else {
      onAddrClose();
      onFirstClose();
      onSecondClose();
    }
  };

  const addrString = getFullAddress(address);

  return (
    <>
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Container maxW="container.xl">
          <Button mt={5} onClick={() => handModal("add")} colorScheme="blue" variant="solid" leftIcon={<AddIcon />} size="md" ref={finalRef}>
            新增
          </Button>
          {status === "loading" ? (
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText mt="4" noOfLines={4} spacing="4" />
            </Box>
          ) : status === "error" ? (
            <Alter title="加载出错" titleColor="red" text="市场列表加载出错" textColor="red" icon={BsLightningFill} />
          ) : (
            <>
              <TableList columns={columns} data={tableData} />
              <Box>{isFetching ? <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" /> : " "}</Box>
            </>
          )}
          {show.isShow && show.type !== "del" && (
            <Modal
              isOpen={show.isShow}
              onClose={onClose}
              allowPinchZoom={true}
              isCentered
              preserveScrollBarGap={true}
              scrollBehavior="outside"
              blockScrollOnMount={false}
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
            >
              <ModalOverlay />
              <ModalContent h="650px">
                <ModalHeader>市场提交</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box as="form">
                    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                      <FormControl isRequired variant={show.type === "edit" ? "editfloating" : "floating"} id="name">
                        <Input ref={initialRef} isRequired name="name" isInvalid onChange={formik.handleChange} value={name} type="text" placeholder=" " size="md" variant="filled" />
                        <FormLabel>名称</FormLabel>
                      </FormControl>
                      <FormControl isRequired>
                        <Menu isOpen={isOpen}>
                          <MenuButton
                            as={Button}
                            _hover={{
                              bg: useColorModeValue("gray.100", "gray.700"),
                            }}
                            aria-label="Courses"
                            onMouseEnter={onOpen}
                            // onMouseLeave={onSelectClose}
                          >
                            {area ? area : "选择市场类型"} {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          </MenuButton>
                          <MenuList onMouseLeave={onSelectClose}>
                            {areas.map((item, i) => (
                              <MenuItem
                                key={i}
                                value={area}
                                onClick={() => {
                                  formik.setFieldValue("area", item, false);
                                  onSelectClose();
                                }}
                              >
                                {item}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </FormControl>
                      <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="is_show" mb="0">
                          是否展示
                        </FormLabel>
                        <Switch
                          onChange={e => {
                            formik.setFieldValue("is_show", e.target.checked, false);
                          }}
                          id="is_show"
                          isChecked={is_show}
                          isInvalid
                          isRequired
                          value={is_show ? 1 : 0}
                        />
                      </FormControl>
                      <FormControl variant={show.type === "edit" ? "editfloating" : "floating"} id="remark">
                        <Textarea onChange={formik.handleChange} name="remark" value={remark} type="text" placeholder="  " variant="filled" />
                        <FormLabel>备注</FormLabel>
                      </FormControl>
                      <FormControl isRequired>
                        <Menu
                          eventListeners={{
                            scroll: true,
                            resize: true,
                          }}
                          isOpen={isAddrOpen}
                          matchWidth={true}
                          boundary="clippingParents"
                          computePositionOnMount={true}
                          strategy="fixed"
                        >
                          <MenuButton
                            as={Button}
                            _hover={{
                              bg: useColorModeValue("gray.100", "gray.700"),
                            }}
                            aria-label="Courses"
                            onMouseEnter={onAddrOpen}
                            onMouseLeave={onAddrClose}
                          >
                            {addrString ? addrString : "选择地址"}
                            {isAddrOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          </MenuButton>
                          <MenuList onMouseEnter={onAddrOpen} overflowY="auto" h="150px">
                            {arr.map((v, i) => (
                              <MenuItem key={i} onClick={() => handItem(v, 0)}>
                                {v.label}
                              </MenuItem>
                            ))}
                          </MenuList>
                          {isFirstOpen && (
                            <MenuList pos="absolute" top={isSecondOpen ? "40px" : "-5px"} left="116px" overflowY="auto" h="150px">
                              {firstList.map((v: any, i) => (
                                <MenuItem key={i} onClick={() => handItem(v, 1)}>
                                  {v.label}
                                </MenuItem>
                              ))}
                            </MenuList>
                          )}
                          {isSecondOpen && (
                            <MenuList pos="absolute" top="-5px" left="340px" overflowY="auto" h="150px">
                              {secondList.map((v: any, i) => (
                                <MenuItem key={i} onClick={() => handItem(v, 2)}>
                                  {v.label}
                                </MenuItem>
                              ))}
                            </MenuList>
                          )}
                        </Menu>
                      </FormControl>
                      <Stack direction="row" spacing={10} align="center" justify="flex-end" mt="100px">
                        <Button
                          isLoading={formik.isSubmitting}
                          // disabled={formik.isSubmitting}
                          loadingText="Loading"
                          colorScheme="blue"
                          variant="solid"
                          spinnerPlacement="start"
                          size="lg"
                          type="button"
                          onClick={e => handleSubmit(e)}
                        >
                          提交
                        </Button>
                        <Button colorScheme="blue" variant="outline" spinnerPlacement="end" size="lg">
                          重置
                        </Button>
                      </Stack>
                    </VStack>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
          <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={show.isShow && show.type === "del"} isCentered>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>删除提示?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>您确定要删除这条数据吗？</AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="red" ref={cancelRef} onClick={() => handDelSubmit()}>
                  确定
                </Button>
                <Button ml={3} onClick={() => onClose()}>
                  取消
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Container>
      </Flex>
    </>
  );
};

export default Market;
