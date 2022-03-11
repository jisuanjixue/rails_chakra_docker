import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useTable, useExpanded } from "react-table";
import {
  Modal,
  useColorModeValue,
  Flex,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  CircularProgress,
  CloseButton,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Container,
  Table,
  Thead,
  Tbody,
  Heading,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import categoriesApi from "../../apis/category";

const Category = () => {
  const [category, setCategory] = useState({ name: "", id: "" });
  const [show, setShow] = useState({ isShow: false, type: "" });
  const toast = useToast();
  const cancelRef: any = useRef();
  const isError = category.name === "";

  const fetchCategories = () => {
    return useQuery(
      "categories",
      async () => {
        const { data } = await categoriesApi.list();
        return data;
      },
      {
        refetchOnWindowFocus: false,
      }
    );
  };

  const { status, data, error, isFetching, isRefetching } = fetchCategories();
  const tableData = data?.categories;

  useEffect(() => {}, [category.name, category.id]);

  const queryClient = useQueryClient();

  // Mutations
  const addCategory = useMutation((category: any) => categoriesApi.create(category), {
    mutationKey: "addCategory",
    onMutate: async name => {
      setCategory({ name: "", id: "" });
      await queryClient.cancelQueries("categories");
      const previousValue = queryClient.getQueryData("categories");
      queryClient.setQueryData("categories", (old: any) => {
        return {
          ...old,
          categories: [...old.categories, name],
        };
      });
      return previousValue;
    },
    onError: (_err, _variables, previousValue: any) => queryClient.setQueryData("categories", previousValue),
    onSettled: () => queryClient.invalidateQueries("categories"),
  });

  const updateCategory = useMutation((category: any) => categoriesApi.update(category), {
    mutationKey: "editCategory",
    onMutate: async newCategory => {
      await queryClient.cancelQueries(["categories", newCategory.id]);
      // Snapshot the previous value
      const previousValue = queryClient.getQueryData(["categories", newCategory.id]);
      // Optimistically update to the new value
      queryClient.setQueryData(["categories", newCategory.id], newCategory);
      // Return a context object with the snapshotted value
      return { previousValue, newCategory };
    },
    onError: (err, newCategory, context: any) => {
      queryClient.setQueryData(["categories", context.newCategory.id], context.previousValue);
    },
    // Always refetch after error or success:
    onSettled: (newCategory: any) => {
      queryClient.invalidateQueries(["categories", newCategory.id]);
    },
  });

  const deleteCategory = useMutation((id: String) => categoriesApi.remove(id), {
    mutationKey: "delCategory",
    onMutate: async id => {
      await queryClient.cancelQueries(["categories", id]);
      const previousValue: any = queryClient.getQueryData("categories");
      const updateValue = [...previousValue.categories];
      const removeDeleted = updateValue.filter(f => f.id !== id);
      queryClient.setQueryData("categories", (old: any) => {
        return {
          ...old,
          categories: removeDeleted,
        };
      });
      return previousValue;
    },
    onError: (_err, _variables, previousValue: any) => queryClient.setQueryData("categories", previousValue),
    onSettled: () => queryClient.invalidateQueries("categories"),
  });

  const onSubmit = () => {
    if (show.type === "add") {
      addCategory.mutate(category, {
        onSuccess: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            render: () => (
              <Alert status="success" variant="solid" alignItems="center" justifyContent="center" textAlign="center">
                <AlertIcon boxSize="40px" mr={10} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  新增成功！
                </AlertTitle>
              </Alert>
            ),
          });
        },
        onError: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            render: () => (
              <Alert status="error" variant="solid" alignItems="center" justifyContent="center" textAlign="center">
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  操作失败！
                </AlertTitle>
              </Alert>
            ),
          });
        },
      });
    } else if (show.type === "edit") {
      updateCategory.mutate(category, {
        onSuccess: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            render: () => (
              <Alert status="success" variant="solid" alignItems="center" justifyContent="center" textAlign="center">
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  编辑成功！
                </AlertTitle>
              </Alert>
            ),
          });
        },
        onError: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            render: () => (
              <Alert status="error" variant="solid" alignItems="center" justifyContent="center" textAlign="center">
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  操作失败！
                </AlertTitle>
              </Alert>
            ),
          });
        },
      });
    } else {
      deleteCategory.mutate(category.id);
    }
    setShow({ isShow: false, type: "" });
  };

  const onClose = () => {
    setShow({ isShow: false, type: "" });
  };

  const handModal = (id, type) => {
    setShow({ isShow: true, type });
    setCategory({ name: "", id });
  };

  const handEdit = (row, type) => {
    setShow({ isShow: true, type });
    setCategory({ name: row.name, id: row.id });
  };

  const TableList = ({ columns: userColumns, data }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state: { expanded },
    } = useTable(
      {
        columns: userColumns,
        data,
      },
      useExpanded
    );
    return (
      <>
        <Flex w="full" bg="gray.600" p={50} alignItems="center" justifyContent="center">
          <Table
            w="full"
            display={{
              base: "block",
              md: "table",
            }}
            sx={{
              "@media print": {
                display: "table",
              },
            }}
            bg={useColorModeValue("white", "gray.800")}
            {...getTableProps()}
            variant="simple"
          >
            <TableCaption>系统类型</TableCaption>
            <Thead
              display={{
                base: "none",
                md: "table-header-group",
              }}
              sx={{
                "@media print": {
                  display: "table-header-group",
                },
              }}
            >
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, i) => (
                    <Th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase group"
                      {...column.getHeaderProps()}
                      key={i}
                    >
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody
              {...getTableBodyProps()}
              display={{
                base: "block",
                lg: "table-row-group",
              }}
              sx={{
                "@media print": {
                  display: "table-row-group",
                },
              }}
            >
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <Tr
                    {...row.getRowProps()}
                    key={i}
                    display={{
                      base: "grid",
                      md: "table-row",
                    }}
                    sx={{
                      "@media print": {
                        display: "table-row",
                      },
                      gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
                      gridGap: "10px",
                    }}
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          role="cell"
                          key={index}
                          // display={{
                          //   base: 'table-cell',
                          //   md: 'none',
                          // }}
                          sx={{
                            "@media print": {
                              display: "none",
                            },
                            textTransform: "uppercase",
                            color: useColorModeValue("gray.400", "gray.400"),
                            fontSize: "xs",
                            fontWeight: "bold",
                            letterSpacing: "wider",
                            fontFamily: "heading",
                          }}
                        >
                          {cell.column.Cell.name === "defaultRenderer" ? (
                            <Box className="text-sm text-gray-500">{cell.render("Cell")}</Box>
                          ) : (
                            cell.render("Cell")
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
        {/* </Box>
            </Box>
          </Box>
        </Box> */}
      </>
    );
  };

  const handValue = useCallback(e => setCategory({ ...category, name: e.target.value }), [category.name, category.id]);

  const columns = useMemo(
    () => [
      {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          <Box {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? <ChevronDownIcon w={8} h={8} color="red.500" /> : <ChevronRightIcon w={8} h={8} color="red.500" />}
          </Box>
        ),
        Cell: ({ row }) =>
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          row.canExpand ? (
            <Box
              {...row.getToggleRowExpandedProps({
                style: {
                  paddingLeft: `${row.depth * 2}px`,
                },
              })}
            >
              {row.isExpanded ? <ChevronDownIcon w={8} h={8} color="red.500" /> : <ChevronRightIcon w={8} h={8} color="red.500" />}
            </Box>
          ) : null,
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            类型
          </Heading>
        ),
        id: "name",
        columns: [
          {
            accessor: "name",
            width: 60,
            id: "title",
            minWidth: 30,
          },
        ],
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            操作
          </Heading>
        ),
        id: "caozuo",
        columns: [
          {
            accessor: (originalRow, _) => (
              <Button colorScheme="blue" leftIcon={<AddIcon />} size="sm" variant="solid" onClick={() => handModal(originalRow.id, "add")}>
                新增
              </Button>
            ),
            id: "add",
            width: 1,
            minWidth: 0,
          },
          {
            accessor: (originalRow, _) => (
              <Button colorScheme="teal" leftIcon={<EditIcon />} size="sm" variant="solid" onClick={() => handEdit(originalRow, "edit")}>
                编辑
              </Button>
            ),
            id: "edit",
            width: 1,
            minWidth: 0,
          },
          {
            Header: "",
            accessor: (originalRow, _) => (
              <Button
                colorScheme="red"
                size="sm"
                leftIcon={<DeleteIcon />}
                variant="solid"
                onClick={() => handModal(originalRow.id, "del")}
              >
                删除
              </Button>
            ),
            id: "del",
            width: 1,
            minWidth: 0,
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Container maxW="container.xl">
          <Button
            mt={5}
            onClick={() => handModal("", "add")}
            bg="teal.300"
            colorScheme="bold"
            variant="solid"
            fontWeight="medium"
            rounded="md"
            shadow="base"
            _focus={{
              outline: "none",
            }}
            leftIcon={<AddIcon />}
            size="md"
            transition="background 0.8s"
            backgroundPosition="center"
            _hover={{
              bgColor: "teal.200",
              bgGradient: `radial(circle, transparent 1%, teal.300 1%)`,
              bgPos: "center",
              backgroundSize: "15000%",
            }}
            _active={{
              bgColor: "teal.400",
              backgroundSize: "100%",
              transition: "background 0s",
            }}
          >
            新增顶级类型
          </Button>
          {status === "loading" ? (
            <CircularProgress isIndeterminate color="green.300" />
          ) : status === "error" ? (
            <Box>
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{error.message}</AlertTitle>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            </Box>
          ) : (
            <>
              <TableList columns={columns} data={tableData} />
              <Box>{isFetching ? <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" /> : " "}</Box>
            </>
          )}
          {show.isShow && show.type !== "del" && (
            <Modal isOpen={show.isShow && show.type !== "del"} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>类型提交</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl id="name" variant={show.type === "add" ? "floating" : "editfloating"} isInvalid={isError} isRequired>
                    <Input
                      isRequired
                      isInvalid
                      errorBorderColor="crimson"
                      value={category.name}
                      onChange={event => handValue(event)}
                      type="text"
                      size="md"
                      variant="filled"
                      placeholder=" "
                    />
                    <FormLabel htmlFor="name">类型名称</FormLabel>
                    {!isError ? <FormHelperText>填写不同名称类型</FormHelperText> : <FormErrorMessage>必填</FormErrorMessage>}
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="teal" variant="outline" mr={3} onClick={() => onClose()}>
                    关闭
                  </Button>
                  <Button variant="solid" colorScheme="blue" onClick={() => onSubmit()}>
                    提交
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={show.isShow && show.type === "del"}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>删除提示?</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>您确定要删除这条数据吗？</AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => onSubmit()}>
                  确定
                </Button>
                <Button colorScheme="red" ml={3} onClick={() => onClose()}>
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

export default Category;
