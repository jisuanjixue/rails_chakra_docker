import React, { useState, useMemo, useRef, useEffect } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { matchSorter } from "match-sorter";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useExpanded,
} from "react-table";
import {
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  CircularProgress,
  CloseButton,
  Heading,
  Container,
  Table,
  Thead,
  Tr,
  Th,
  FormLabel,
  FormControl,
  TableCaption,
  Input,
  Switch,
  Textarea,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import marketApi from "../../apis/market";
import { MarketInfo } from "../../types/market";
import arr from "../../../../public/addr";

const Market = () => {
  const { isOpen, onOpen, onClose: onSelectClose } = useDisclosure();
  const {
    isOpen: isAddrOpen,
    onOpen: onAddrOpen,
    onClose: onAddrClose,
  } = useDisclosure();
  const defaultData = {
    name: "",
    type: "",
    is_show: false,
    address: [],
    remark: "",
  };
  const [market, setMarket] = useState<MarketInfo>(defaultData);
  const [marketId, setMarketId] = useState("");
  const [show, setShow] = useState({ isShow: false, type: "" });
  const toast = useToast();
  const cancelRef: any = useRef();
  const initialValues: MarketInfo = {
    name: "",
    type: "",
    is_show: false,
    address: [],
    remark: "",
  };

  const MarketSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, "太短了")
      .max(10, "太长了!")
      .required(
        <Text as="sup" color="red">
          必填
        </Text>
      ),
    type: Yup.string().required("必选"),
    is_show: Yup.boolean().required("必选"),
    address: Yup.array().required("必选"),
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

  const { status, data, error, isFetching, isRefetching } = fetchMarkets();
  const tableData = data?.markets.data;

  // Mutations
  const addMarket = useMutation((market: any) => marketApi.create(market), {
    mutationKey: "addMarket",
    onMutate: async data => {
      await queryClient.cancelQueries("markets");
      const previousValue = queryClient.getQueryData("markets");
      queryClient.setQueryData("markets", (old: any) => {
        return {
          ...old,
          markets: [...old.markets, data],
        };
      });
      return previousValue;
    },
    onError: (_err, _variables, previousValue: any) =>
      queryClient.setQueryData("markets", previousValue),
    onSettled: () => queryClient.invalidateQueries("markets"),
  });

  const updateMarket = useMutation((market: any) => marketApi.update(market), {
    mutationKey: "updateMarket",
    onMutate: async newMarket => {
      await queryClient.cancelQueries(["categories", newMarket.id]);
      // Snapshot the previous value
      const previousValue = queryClient.getQueryData([
        "categories",
        newMarket.id,
      ]);
      // Optimistically update to the new value
      queryClient.setQueryData(["categories", newMarket.id], newMarket);
      // Return a context object with the snapshotted value
      return { previousValue, newMarket };
    },
    onError: (err, newMarket, context: any) => {
      queryClient.setQueryData(
        ["categories", context.newMarket.id],
        context.previousValue
      );
    },
    // Always refetch after error or success:
    onSettled: (newMarket: any) => {
      queryClient.invalidateQueries(["categories", newMarket.id]);
    },
  });

  const deleteMarket = useMutation((id: String) => marketApi.remove(id), {
    mutationKey: "deleteMarket",
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
    onError: (_err, _variables, previousValue: any) =>
      queryClient.setQueryData("categories", previousValue),
    onSettled: () => queryClient.invalidateQueries("categories"),
  });

  const handDelSubmit = () => {
    deleteMarket.mutate(marketId);
  };

  const onClose = () => {
    setShow({ isShow: false, type: "" });
  };

  const flatArr = (arr: any) => {
    return Object.entries(arr).flat();
  };

  useEffect(() => {
    // const newArr = flatArr(pcaa[86]);
    // console.log(newArr);
  }, []);

  // const selectedChange = (value: any) => {
  //   console.log(value);
  // };

  const onSubmit = values => {
    if (show.type === "add") {
      addMarket.mutate(values, {
        onSuccess: () => {
          toast({
            position: "top",
            isClosable: true,
            variant: "solid",
            render: () => (
              <Alert
                status="success"
                variant="solid"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <AlertIcon boxSize="40px" mr={0} />
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
              <Alert
                status="error"
                variant="solid"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  新增失败！
                </AlertTitle>
              </Alert>
            ),
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
            render: () => (
              <Alert
                status="success"
                variant="solid"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
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
              <Alert
                status="error"
                variant="solid"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  编辑失败！
                </AlertTitle>
              </Alert>
            ),
          });
        },
      });
    } else {
      setShow({ isShow: false, type: "" });
    }
  };

  const handModal = type => {
    setMarket({ ...market });
    setShow({ isShow: true, type });
  };

  const handDel = (id, type) => {
    setMarketId(id);
    setShow({ isShow: true, type });
  };

  const handEdit = (row, type) => {
    setMarketId(row.id);
    setMarket({ ...market, ...row });
    setShow({ isShow: true, type });
  };

  // Define a default UI for filtering
  const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined);
    }, 200);
    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0",
          }}
        />
      </span>
    );
  };

  const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter },
  }) => {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  };

  const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach(row => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const fuzzyTextFilterFn = (rows, id, filterValue) => {
    return matchSorter(rows, filterValue, {
      keys: [(row: any) => row.values[id]],
    });
  };

  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val;

  const TableList = ({ columns: marketColumns, data }) => {
    const filterTypes = useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter(row => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        },
      }),
      []
    );

    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    );
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
    } = useTable(
      {
        columns: marketColumns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      useExpanded
    );
    return (
      <>
        <Box className="flex flex-col mt-4">
          <Box className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <Box className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Box className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <Table
                  {...getTableProps()}
                  className="min-w-full divide-y divide-gray-200"
                >
                  <TableCaption>市场列表</TableCaption>
                  <Thead className="bg-gray-50">
                    {headerGroups.map((headerGroup, i) => (
                      <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                        {headerGroup.headers.map((column, index) => (
                          <Th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase group"
                            {...column.getHeaderProps()}
                            key={index}
                          >
                            {column.render("Header")}
                            {/* Render the columns filter UI */}
                            <Box>
                              {column.canFilter
                                ? column.render("Filter")
                                : null}
                            </Box>
                          </Th>
                        ))}
                      </Tr>
                    ))}
                    <Tr>
                      <Th
                        colSpan={visibleColumns.length}
                        style={{
                          textAlign: "left",
                        }}
                      >
                        {/* <GlobalFilter
                          preGlobalFilteredRows={preGlobalFilteredRows}
                          globalFilter={state.globalFilter}
                          setGlobalFilter={setGlobalFilter}
                        /> */}
                      </Th>
                    </Tr>
                  </Thead>
                  <tbody
                    {...getTableBodyProps()}
                    className="bg-white divide-y divide-gray-200"
                  >
                    {rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={i}>
                          {row.cells.map((cell, index) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                                role="cell"
                                key={index}
                              >
                                {cell.column.Cell.name === "defaultRenderer" ? (
                                  <div className="text-sm text-gray-500">
                                    {cell.render("Cell")}
                                  </div>
                                ) : (
                                  cell.render("Cell")
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  // Define a custom filter filter function!
  const filterGreaterThan = (rows, id, filterValue) => {
    return rows.filter(row => {
      const rowValue = row.values[id];
      return rowValue >= filterValue;
    });
  };

  // This is an autoRemove method on the filter function that
  // when given the new filter value and returns true, the filter
  // will be automatically removed. Normally this is just an undefined
  // check, but here, we want to remove the filter if it's not a number
  filterGreaterThan.autoRemove = val => typeof val !== "number";

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <Heading as="h4" size="md">
            名称
          </Heading>
        ),
        id: "name",
        columns: [
          {
            accessor: "name",
            width: 20,
            minWidth: 10,
            filter: "fuzzyText",
          },
        ],
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            类型
          </Heading>
        ),
        id: "type",
        columns: [
          {
            accessor: "type",
            width: 30,
            minWidth: 10,
            filter: "fuzzyText",
          },
        ],
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            是否显示
          </Heading>
        ),
        id: "isShow",
        columns: [
          {
            accessor: "is_show",
            width: 30,
            minWidth: 10,
            Filter: SelectColumnFilter,
            filter: "includes",
          },
        ],
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            地址
          </Heading>
        ),
        id: "address",
        columns: [
          {
            accessor: "address",
            width: 30,
            minWidth: 10,
          },
        ],
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            备注
          </Heading>
        ),
        id: "remark",
        columns: [
          {
            accessor: "remark",
            width: 30,
            minWidth: 10,
          },
        ],
      },
      {
        Header: () => (
          <Heading as="h4" size="md">
            操作
          </Heading>
        ),
        id: "action",
        columns: [
          {
            accessor: originalRow => (
              <Button
                colorScheme="teal"
                leftIcon={<EditIcon />}
                size="sm"
                variant="solid"
                onClick={() => handEdit(originalRow, "edit")}
              >
                编辑
              </Button>
            ),
            id: "edit",
            width: 20,
            minWidth: 10,
          },
          {
            Header: "",
            accessor: originalRow => (
              <Button
                colorScheme="red"
                leftIcon={<DeleteIcon />}
                variant="solid"
                onClick={() => handDel(originalRow.id, "del")}
              >
                删除
              </Button>
            ),
            id: "del",
            width: 20,
            minWidth: 10,
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Container maxW="container.xl">
        <Button
          mt={5}
          onClick={() => handModal("add")}
          colorScheme="blue"
          variant="solid"
          leftIcon={<AddIcon />}
          size="md"
        >
          新增
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
            <Box>
              {isFetching ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                " "
              )}
            </Box>
          </>
        )}
        {show.isShow && show.type !== "del" && (
          <Modal isOpen={show.isShow} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>市场提交</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async values => onSubmit(values)}
                  validationSchema={MarketSchema}
                >
                  {props => {
                    if (show.type === "edit") {
                      useEffect(() => {
                        const fields = [
                          "name",
                          "type",
                          "is_show",
                          "address",
                          "remark",
                        ];
                        fields.forEach(field =>
                          props.setFieldValue(field, market[field], false)
                        );
                      }, []);
                    }

                    return (
                      <Form>
                        <VStack
                          divider={<StackDivider borderColor="gray.200" />}
                          spacing={4}
                          align="stretch"
                        >
                          <Field name="name">
                            {({ field }) => (
                              <FormControl
                                isRequired
                                variant="floating"
                                id="name"
                              >
                                <Input
                                  {...field}
                                  isRequired
                                  isInvalid
                                  type="text"
                                  placeholder=""
                                />
                                <FormLabel htmlFor="name">名称</FormLabel>
                                <ErrorMessage name="name" />
                              </FormControl>
                            )}
                          </Field>
                          <Field name="type">
                            {() => (
                              <FormControl isRequired>
                                <Menu isOpen={isOpen}>
                                  <MenuButton
                                    as={Button}
                                    _hover={{
                                      bg: useColorModeValue(
                                        "gray.100",
                                        "gray.700"
                                      ),
                                    }}
                                    aria-label="Courses"
                                    onMouseEnter={onOpen}
                                    onMouseLeave={onSelectClose}
                                  >
                                    选择市场类型{" "}
                                    {isOpen ? (
                                      <ChevronUpIcon />
                                    ) : (
                                      <ChevronDownIcon />
                                    )}
                                  </MenuButton>
                                  <MenuList
                                    onMouseEnter={onOpen}
                                    onMouseLeave={onSelectClose}
                                  >
                                    <MenuItem>产区</MenuItem>
                                    <MenuItem>销区</MenuItem>
                                  </MenuList>
                                </Menu>
                                <ErrorMessage name="type" />
                              </FormControl>
                            )}
                          </Field>
                          <Field name="is_show">
                            {({ field }) => (
                              <FormControl display="flex" alignItems="center">
                                <FormLabel htmlFor="is_show">
                                  是否展示
                                </FormLabel>
                                <Switch {...field} id="is_show" />
                                <ErrorMessage name="is_show" />
                              </FormControl>
                            )}
                          </Field>
                          <Field name="address">
                            {() => (
                              <FormControl isRequired>
                                <Menu
                                  eventListeners={{
                                    scroll: true,
                                    resize: true,
                                  }}
                                  isOpen={isAddrOpen}
                                  matchWidth={true}
                                  boundary="scrollParent"
                                >
                                  <MenuButton
                                    as={Button}
                                    _hover={{
                                      bg: useColorModeValue(
                                        "gray.100",
                                        "gray.700"
                                      ),
                                    }}
                                    aria-label="Courses"
                                    onMouseEnter={onAddrOpen}
                                    onMouseLeave={onAddrClose}
                                  >
                                    选择地址{" "}
                                    {isAddrOpen ? (
                                      <ChevronUpIcon />
                                    ) : (
                                      <ChevronDownIcon />
                                    )}
                                  </MenuButton>
                                  <MenuList
                                    onMouseEnter={onAddrOpen}
                                    onMouseLeave={onAddrClose}
                                  >
                                    {arr.map((v, i) => (
                                      <MenuItem key={i}>{v.label}</MenuItem>
                                    ))}
                                  </MenuList>
                                </Menu>
                                <ErrorMessage name="address" />
                              </FormControl>
                            )}
                          </Field>
                          {/* <Divider orientation="horizontal" /> */}

                          <Field name="remark">
                            {({ field }) => (
                              <FormControl variant="floating" id="remark">
                                <Textarea
                                  {...field}
                                  isRequired
                                  isInvalid
                                  type="text"
                                  placeholder=""
                                />
                                <FormLabel htmlFor="remark">备注</FormLabel>
                                <ErrorMessage name="remark" />
                              </FormControl>
                            )}
                          </Field>
                        </VStack>
                      </Form>
                    );
                  }}
                </Formik>
              </ModalBody>
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
              <Button ref={cancelRef} onClick={() => handDelSubmit()}>
                确定
              </Button>
              <Button colorScheme="red" ml={3} onClick={() => onClose()}>
                取消
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </>
  );
};

export default Market;
