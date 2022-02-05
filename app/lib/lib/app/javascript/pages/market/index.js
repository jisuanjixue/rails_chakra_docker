"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_2 = require("react");
const react_query_1 = require("react-query");
const match_sorter_1 = require("match-sorter");
const react_table_1 = require("react-table");
const react_3 = require("@chakra-ui/react");
const icons_1 = require("@chakra-ui/icons");
const formik_1 = require("formik");
const Yup = require("yup");
const market_1 = require("../../apis/market");
const Market = () => {
    const defaultData = {
        name: "",
        type: "",
        is_show: false,
        address: [],
        remark: "",
    };
    const [market, setMarket] = (0, react_2.useState)(defaultData);
    const [marketId, setMarketId] = (0, react_2.useState)("");
    const [show, setShow] = (0, react_2.useState)({ isShow: false, type: "" });
    const toast = (0, react_3.useToast)();
    const cancelRef = (0, react_2.useRef)();
    const initialValues = {
        name: "",
        type: "",
        is_show: false,
        address: [],
        remark: "",
    };
    const MarketSchema = Yup.object().shape({
        name: Yup.string().min(1, "太短了").max(10, "太长了!").required("必填"),
        type: Yup.string().required("必填"),
        is_show: Yup.boolean().required("必填"),
        address: Yup.array().required("必填"),
    });
    const queryClient = (0, react_query_1.useQueryClient)();
    const fetchMarkets = () => {
        return (0, react_query_1.useQuery)("markets", async () => {
            const { data } = await market_1.default.list();
            return data;
        }, {
            refetchOnWindowFocus: false,
        });
    };
    const { status, data, error, isFetching, isRefetching } = fetchMarkets();
    const tableData = data === null || data === void 0 ? void 0 : data.markets.data;
    // Mutations
    const addMarket = (0, react_query_1.useMutation)((market) => market_1.default.create(market), {
        mutationKey: "addMarket",
        onMutate: async (data) => {
            await queryClient.cancelQueries("markets");
            const previousValue = queryClient.getQueryData("markets");
            queryClient.setQueryData("markets", (old) => {
                return Object.assign(Object.assign({}, old), { markets: [...old.markets, data] });
            });
            return previousValue;
        },
        onError: (_err, _variables, previousValue) => queryClient.setQueryData("markets", previousValue),
        onSettled: () => queryClient.invalidateQueries("markets"),
    });
    const updateMarket = (0, react_query_1.useMutation)((market) => market_1.default.update(market), {
        mutationKey: "updateMarket",
        onMutate: async (newMarket) => {
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
        onError: (err, newMarket, context) => {
            queryClient.setQueryData(["categories", context.newMarket.id], context.previousValue);
        },
        // Always refetch after error or success:
        onSettled: (newMarket) => {
            queryClient.invalidateQueries(["categories", newMarket.id]);
        },
    });
    const deleteMarket = (0, react_query_1.useMutation)((id) => market_1.default.remove(id), {
        mutationKey: "deleteMarket",
        onMutate: async (id) => {
            await queryClient.cancelQueries(["categories", id]);
            const previousValue = queryClient.getQueryData("categories");
            const updateValue = [...previousValue.categories];
            const removeDeleted = updateValue.filter(f => f.id !== id);
            queryClient.setQueryData("categories", (old) => {
                return Object.assign(Object.assign({}, old), { categories: removeDeleted });
            });
            return previousValue;
        },
        onError: (_err, _variables, previousValue) => queryClient.setQueryData("categories", previousValue),
        onSettled: () => queryClient.invalidateQueries("categories"),
    });
    const handDelSubmit = () => {
        deleteMarket.mutate(marketId);
    };
    const onClose = () => {
        setShow({ isShow: false, type: "" });
    };
    (0, react_2.useEffect)(() => { }, []);
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
                        render: () => ((0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "success", variant: "solid", alignItems: "center", justifyContent: "center", textAlign: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, { boxSize: "40px", mr: 0 }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mt: 4, mb: 1, fontSize: "lg" }, { children: "\u65B0\u589E\u6210\u529F\uFF01" }), void 0)] }), void 0)),
                    });
                },
                onError: () => {
                    toast({
                        position: "top",
                        isClosable: true,
                        variant: "solid",
                        render: () => ((0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "error", variant: "solid", alignItems: "center", justifyContent: "center", textAlign: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, { boxSize: "40px", mr: 0 }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mt: 4, mb: 1, fontSize: "lg" }, { children: "\u65B0\u589E\u5931\u8D25\uFF01" }), void 0)] }), void 0)),
                    });
                },
            });
        }
        else if (show.type === "edit") {
            updateMarket.mutate(values, {
                onSuccess: () => {
                    toast({
                        position: "top",
                        isClosable: true,
                        variant: "solid",
                        render: () => ((0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "success", variant: "solid", alignItems: "center", justifyContent: "center", textAlign: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, { boxSize: "40px", mr: 0 }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mt: 4, mb: 1, fontSize: "lg" }, { children: "\u7F16\u8F91\u6210\u529F\uFF01" }), void 0)] }), void 0)),
                    });
                },
                onError: () => {
                    toast({
                        position: "top",
                        isClosable: true,
                        variant: "solid",
                        render: () => ((0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "error", variant: "solid", alignItems: "center", justifyContent: "center", textAlign: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, { boxSize: "40px", mr: 0 }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mt: 4, mb: 1, fontSize: "lg" }, { children: "\u7F16\u8F91\u5931\u8D25\uFF01" }), void 0)] }), void 0)),
                    });
                },
            });
        }
        else {
            setShow({ isShow: false, type: "" });
        }
    };
    const handModal = type => {
        setMarket(Object.assign({}, market));
        setShow({ isShow: true, type });
    };
    const handDel = (id, type) => {
        setMarketId(id);
        setShow({ isShow: true, type });
    };
    const handEdit = (row, type) => {
        setMarketId(row.id);
        setMarket(Object.assign(Object.assign({}, market), row));
        setShow({ isShow: true, type });
    };
    // Define a default UI for filtering
    const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, }) => {
        const count = preGlobalFilteredRows.length;
        const [value, setValue] = (0, react_2.useState)(globalFilter);
        const onChange = (0, react_table_1.useAsyncDebounce)(value => {
            setGlobalFilter(value || undefined);
        }, 200);
        return ((0, jsx_runtime_1.jsxs)("span", { children: ["Search:", " ", (0, jsx_runtime_1.jsx)("input", { value: value || "", onChange: e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }, placeholder: `${count} records...`, style: {
                        fontSize: "1.1rem",
                        border: "0",
                    } }, void 0)] }, void 0));
    };
    const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter }, }) => {
        const count = preFilteredRows.length;
        return ((0, jsx_runtime_1.jsx)("input", { value: filterValue || "", onChange: e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }, placeholder: `Search ${count} records...` }, void 0));
    };
    const SelectColumnFilter = ({ column: { filterValue, setFilter, preFilteredRows, id }, }) => {
        // Calculate the options for filtering
        // using the preFilteredRows
        const options = react_2.default.useMemo(() => {
            const options = new Set();
            preFilteredRows.forEach(row => {
                options.add(row.values[id]);
            });
            return [...options.values()];
        }, [id, preFilteredRows]);
        // Render a multi-select box
        return ((0, jsx_runtime_1.jsxs)("select", Object.assign({ value: filterValue, onChange: e => {
                setFilter(e.target.value || undefined);
            } }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "" }, { children: "All" }), void 0), options.map((option, i) => ((0, jsx_runtime_1.jsx)("option", Object.assign({ value: option }, { children: option }), i)))] }), void 0));
    };
    const fuzzyTextFilterFn = (rows, id, filterValue) => {
        return (0, match_sorter_1.matchSorter)(rows, filterValue, {
            keys: [(row) => row.values[id]],
        });
    };
    // Let the table remove the filter if the string is empty
    fuzzyTextFilterFn.autoRemove = val => !val;
    const TableList = ({ columns: marketColumns, data }) => {
        const filterTypes = (0, react_2.useMemo)(() => ({
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
        }), []);
        const defaultColumn = react_2.default.useMemo(() => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }), []);
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, visibleColumns, preGlobalFilteredRows, setGlobalFilter, } = (0, react_table_1.useTable)({
            columns: marketColumns,
            data,
            defaultColumn,
            filterTypes,
        }, react_table_1.useFilters, // useFilters!
        react_table_1.useGlobalFilter, // useGlobalFilter!
        react_table_1.useExpanded);
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "flex flex-col mt-4" }, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "overflow-hidden border-b border-gray-200 shadow sm:rounded-lg" }, { children: (0, jsx_runtime_1.jsxs)(react_3.Table, Object.assign({}, getTableProps(), { className: "min-w-full divide-y divide-gray-200" }, { children: [(0, jsx_runtime_1.jsx)(react_3.TableCaption, { children: "\u5E02\u573A\u5217\u8868" }, void 0), (0, jsx_runtime_1.jsxs)(react_3.Thead, Object.assign({ className: "bg-gray-50" }, { children: [headerGroups.map((headerGroup, i) => ((0, react_1.createElement)(react_3.Tr, Object.assign({}, headerGroup.getHeaderGroupProps(), { key: i }), headerGroup.headers.map((column, index) => ((0, react_1.createElement)(react_3.Th, Object.assign({ scope: "col", className: "px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase group" }, column.getHeaderProps(), { key: index }), column.render("Header"), (0, jsx_runtime_1.jsx)(react_3.Box, { children: column.canFilter
                                                    ? column.render("Filter")
                                                    : null }, void 0))))))), (0, jsx_runtime_1.jsx)(react_3.Tr, { children: (0, jsx_runtime_1.jsx)(react_3.Th, { colSpan: visibleColumns.length, style: {
                                                        textAlign: "left",
                                                    } }, void 0) }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)("tbody", Object.assign({}, getTableBodyProps(), { className: "bg-white divide-y divide-gray-200" }, { children: rows.map((row, i) => {
                                            prepareRow(row);
                                            return ((0, react_1.createElement)("tr", Object.assign({}, row.getRowProps(), { key: i }), row.cells.map((cell, index) => {
                                                return ((0, react_1.createElement)("td", Object.assign({}, cell.getCellProps(), { className: "px-6 py-4 whitespace-nowrap", role: "cell", key: index }), cell.column.Cell.name === "defaultRenderer" ? ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "text-sm text-gray-500" }, { children: cell.render("Cell") }), void 0)) : (cell.render("Cell"))));
                                            })));
                                        }) }), void 0)] }), void 0) }), void 0) }), void 0) }), void 0) }), void 0) }, void 0));
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
    const columns = (0, react_2.useMemo)(() => [
        {
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u540D\u79F0" }), void 0)),
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
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u7C7B\u578B" }), void 0)),
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
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u662F\u5426\u663E\u793A" }), void 0)),
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
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u5730\u5740" }), void 0)),
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
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u5907\u6CE8" }), void 0)),
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
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u64CD\u4F5C" }), void 0)),
            id: "action",
            columns: [
                {
                    accessor: originalRow => ((0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "teal", leftIcon: (0, jsx_runtime_1.jsx)(icons_1.EditIcon, {}, void 0), size: "sm", variant: "solid", onClick: () => handEdit(originalRow, "edit") }, { children: "\u7F16\u8F91" }), void 0)),
                    id: "edit",
                    width: 20,
                    minWidth: 10,
                },
                {
                    Header: "",
                    accessor: originalRow => ((0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "red", leftIcon: (0, jsx_runtime_1.jsx)(icons_1.DeleteIcon, {}, void 0), variant: "solid", onClick: () => handDel(originalRow.id, "del") }, { children: "\u5220\u9664" }), void 0)),
                    id: "del",
                    width: 20,
                    minWidth: 10,
                },
            ],
        },
    ], []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_3.Container, Object.assign({ maxW: "container.xl" }, { children: [(0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ mt: 5, onClick: () => handModal("add"), colorScheme: "blue", variant: "solid", leftIcon: (0, jsx_runtime_1.jsx)(icons_1.AddIcon, {}, void 0), size: "md" }, { children: "\u65B0\u589E" }), void 0), status === "loading" ? ((0, jsx_runtime_1.jsx)(react_3.CircularProgress, { isIndeterminate: true, color: "green.300" }, void 0)) : status === "error" ? ((0, jsx_runtime_1.jsx)(react_3.Box, { children: (0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "error" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, {}, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mr: 2 }, { children: error.message }), void 0), (0, jsx_runtime_1.jsx)(react_3.CloseButton, { position: "absolute", right: "8px", top: "8px" }, void 0)] }), void 0) }, void 0)) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TableList, { columns: columns, data: tableData }, void 0), (0, jsx_runtime_1.jsx)(react_3.Box, { children: isFetching ? ((0, jsx_runtime_1.jsx)(react_3.Spinner, { thickness: "4px", speed: "0.65s", emptyColor: "gray.200", color: "blue.500", size: "xl" }, void 0)) : (" ") }, void 0)] }, void 0)), show.isShow && show.type !== "del" && ((0, jsx_runtime_1.jsxs)(react_3.Modal, Object.assign({ isOpen: show.isShow, onClose: onClose }, { children: [(0, jsx_runtime_1.jsx)(react_3.ModalOverlay, {}, void 0), (0, jsx_runtime_1.jsxs)(react_3.ModalContent, { children: [(0, jsx_runtime_1.jsx)(react_3.ModalHeader, { children: "\u5E02\u573A\u63D0\u4EA4" }, void 0), (0, jsx_runtime_1.jsx)(react_3.ModalCloseButton, {}, void 0), (0, jsx_runtime_1.jsx)(react_3.ModalBody, { children: (0, jsx_runtime_1.jsx)(formik_1.Formik, Object.assign({ initialValues: initialValues, onSubmit: async (values) => onSubmit(values), validationSchema: MarketSchema }, { children: props => {
                                            if (show.type === "edit") {
                                                (0, react_2.useEffect)(() => {
                                                    const fields = [
                                                        "name",
                                                        "type",
                                                        "is_show",
                                                        "address",
                                                        "remark",
                                                    ];
                                                    fields.forEach(field => props.setFieldValue(field, market[field], false));
                                                }, []);
                                            }
                                            return ((0, jsx_runtime_1.jsxs)(formik_1.Form, { children: [(0, jsx_runtime_1.jsx)(formik_1.Field, Object.assign({ name: "name" }, { children: ({ field }) => ((0, jsx_runtime_1.jsxs)(react_3.FormControl, { children: [(0, jsx_runtime_1.jsx)(react_3.FormLabel, Object.assign({ htmlFor: "name" }, { children: "\u540D\u79F0" }), void 0), (0, jsx_runtime_1.jsx)(react_3.Input, Object.assign({}, field, { id: "name", isRequired: true, isInvalid: true, type: "text", placeholder: "\u8BF7\u586B\u5165\u5E02\u573A\u540D\u79F0" }), void 0), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: "name" }, void 0)] }, void 0)) }), void 0), (0, jsx_runtime_1.jsx)(react_3.Divider, { orientation: "horizontal" }, void 0), (0, jsx_runtime_1.jsx)(formik_1.Field, Object.assign({ name: "type" }, { children: ({ field }) => ((0, jsx_runtime_1.jsxs)(react_3.FormControl, { children: [(0, jsx_runtime_1.jsx)(react_3.FormLabel, Object.assign({ htmlFor: "type" }, { children: "\u5E02\u573A\u7C7B\u578B" }), void 0), (0, jsx_runtime_1.jsxs)(react_3.Select, Object.assign({}, field, { icon: (0, jsx_runtime_1.jsx)(icons_1.ChevronDownIcon, {}, void 0), variant: "filled", id: "type", color: "white", placeholder: "\u8BF7\u9009\u62E9" }, { children: [(0, jsx_runtime_1.jsx)("option", { children: "\u4EA7\u533A" }, void 0), (0, jsx_runtime_1.jsx)("option", { children: "\u9500\u533A" }, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: "type" }, void 0)] }, void 0)) }), void 0), (0, jsx_runtime_1.jsx)(react_3.Divider, { orientation: "horizontal" }, void 0), (0, jsx_runtime_1.jsx)(formik_1.Field, Object.assign({ name: "is_show" }, { children: ({ field }) => ((0, jsx_runtime_1.jsxs)(react_3.FormControl, Object.assign({ display: "flex", alignItems: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.FormLabel, Object.assign({ htmlFor: "is_show" }, { children: "\u662F\u5426\u5C55\u793A" }), void 0), (0, jsx_runtime_1.jsx)(react_3.Switch, Object.assign({}, field, { id: "is_show" }), void 0), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: "is_show" }, void 0)] }), void 0)) }), void 0), (0, jsx_runtime_1.jsx)(react_3.Divider, { orientation: "horizontal" }, void 0), (0, jsx_runtime_1.jsx)(formik_1.Field, Object.assign({ name: "address" }, { children: ({ field }) => ((0, jsx_runtime_1.jsxs)(react_3.FormControl, { children: [(0, jsx_runtime_1.jsx)(react_3.FormLabel, Object.assign({ htmlFor: "address" }, { children: "\u5730\u5740" }), void 0), (0, jsx_runtime_1.jsxs)(react_3.Select, Object.assign({}, field, { icon: (0, jsx_runtime_1.jsx)(icons_1.ChevronDownIcon, {}, void 0), variant: "filled", id: "address", color: "white", placeholder: "\u8BF7\u9009\u62E9" }, { children: [(0, jsx_runtime_1.jsx)("option", {}, void 0), (0, jsx_runtime_1.jsx)("option", {}, void 0)] }), void 0), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: "address" }, void 0)] }, void 0)) }), void 0), (0, jsx_runtime_1.jsx)(react_3.Divider, { orientation: "horizontal" }, void 0), (0, jsx_runtime_1.jsx)(formik_1.Field, Object.assign({ name: "remark" }, { children: ({ field }) => ((0, jsx_runtime_1.jsxs)(react_3.FormControl, { children: [(0, jsx_runtime_1.jsx)(react_3.FormLabel, Object.assign({ htmlFor: "address" }, { children: "\u5907\u6CE8" }), void 0), (0, jsx_runtime_1.jsx)(react_3.Textarea, Object.assign({}, field, { id: "remark", isRequired: true, isInvalid: true, type: "text", placeholder: "\u8BF7\u586B\u5165\u5E02\u573A\u540D\u79F0" }), void 0), (0, jsx_runtime_1.jsx)(formik_1.ErrorMessage, { name: "remark" }, void 0)] }, void 0)) }), void 0)] }, void 0));
                                        } }), void 0) }, void 0)] }, void 0)] }), void 0)), (0, jsx_runtime_1.jsxs)(react_3.AlertDialog, Object.assign({ motionPreset: "slideInBottom", leastDestructiveRef: cancelRef, onClose: onClose, isOpen: show.isShow && show.type === "del", isCentered: true }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertDialogOverlay, {}, void 0), (0, jsx_runtime_1.jsxs)(react_3.AlertDialogContent, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertDialogHeader, { children: "\u5220\u9664\u63D0\u793A?" }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertDialogCloseButton, {}, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertDialogBody, { children: "\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u6570\u636E\u5417\uFF1F" }, void 0), (0, jsx_runtime_1.jsxs)(react_3.AlertDialogFooter, { children: [(0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ ref: cancelRef, onClick: () => handDelSubmit() }, { children: "\u786E\u5B9A" }), void 0), (0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "red", ml: 3, onClick: () => onClose() }, { children: "\u53D6\u6D88" }), void 0)] }, void 0)] }, void 0)] }), void 0)] }), void 0) }, void 0));
};
exports.default = Market;
//# sourceMappingURL=index.js.map