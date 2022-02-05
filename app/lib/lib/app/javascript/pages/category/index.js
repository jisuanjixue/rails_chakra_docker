"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_2 = require("react");
const react_query_1 = require("react-query");
const react_table_1 = require("react-table");
const react_3 = require("@chakra-ui/react");
const icons_1 = require("@chakra-ui/icons");
const category_1 = require("../../apis/category");
const Category = () => {
    const [category, setCategory] = (0, react_2.useState)({ name: "", id: "" });
    const [show, setShow] = (0, react_2.useState)({ isShow: false, type: "" });
    const toast = (0, react_3.useToast)();
    const cancelRef = (0, react_2.useRef)();
    const isError = category.name === "";
    const fetchCategories = () => {
        return (0, react_query_1.useQuery)("categories", async () => {
            const { data } = await category_1.default.list();
            return data;
        }, {
            refetchOnWindowFocus: false,
        });
    };
    const { status, data, error, isFetching, isRefetching } = fetchCategories();
    const tableData = data === null || data === void 0 ? void 0 : data.categories;
    (0, react_2.useEffect)(() => { }, [category.name, category.id]);
    const queryClient = (0, react_query_1.useQueryClient)();
    // Mutations
    const addCategory = (0, react_query_1.useMutation)((category) => category_1.default.create(category), {
        mutationKey: "addCategory",
        onMutate: async (name) => {
            setCategory({ name: "", id: "" });
            await queryClient.cancelQueries("categories");
            const previousValue = queryClient.getQueryData("categories");
            queryClient.setQueryData("categories", (old) => {
                return Object.assign(Object.assign({}, old), { categories: [...old.categories, name] });
            });
            return previousValue;
        },
        onError: (_err, _variables, previousValue) => queryClient.setQueryData("categories", previousValue),
        onSettled: () => queryClient.invalidateQueries("categories"),
    });
    const updateCategory = (0, react_query_1.useMutation)((category) => category_1.default.update(category), {
        mutationKey: "editCategory",
        onMutate: async (newCategory) => {
            await queryClient.cancelQueries(["categories", newCategory.id]);
            // Snapshot the previous value
            const previousValue = queryClient.getQueryData([
                "categories",
                newCategory.id,
            ]);
            // Optimistically update to the new value
            queryClient.setQueryData(["categories", newCategory.id], newCategory);
            // Return a context object with the snapshotted value
            return { previousValue, newCategory };
        },
        onError: (err, newCategory, context) => {
            queryClient.setQueryData(["categories", context.newCategory.id], context.previousValue);
        },
        // Always refetch after error or success:
        onSettled: (newCategory) => {
            queryClient.invalidateQueries(["categories", newCategory.id]);
        },
    });
    const deleteCategory = (0, react_query_1.useMutation)((id) => category_1.default.remove(id), {
        mutationKey: "delCategory",
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
    const onSubmit = () => {
        if (show.type === "add") {
            addCategory.mutate(category, {
                onSuccess: () => {
                    toast({
                        position: "top",
                        isClosable: true,
                        variant: "solid",
                        render: () => ((0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "success", variant: "solid", alignItems: "center", justifyContent: "center", textAlign: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, { boxSize: "40px", mr: 10 }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mt: 4, mb: 1, fontSize: "lg" }, { children: "\u65B0\u589E\u6210\u529F\uFF01" }), void 0)] }), void 0)),
                    });
                },
                onError: () => {
                    toast({
                        position: "top",
                        isClosable: true,
                        variant: "solid",
                        render: () => ((0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "error", variant: "solid", alignItems: "center", justifyContent: "center", textAlign: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, { boxSize: "40px", mr: 0 }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mt: 4, mb: 1, fontSize: "lg" }, { children: "\u64CD\u4F5C\u5931\u8D25\uFF01" }), void 0)] }), void 0)),
                    });
                },
            });
        }
        else if (show.type === "edit") {
            updateCategory.mutate(category, {
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
                        render: () => ((0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "error", variant: "solid", alignItems: "center", justifyContent: "center", textAlign: "center" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, { boxSize: "40px", mr: 0 }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mt: 4, mb: 1, fontSize: "lg" }, { children: "\u64CD\u4F5C\u5931\u8D25\uFF01" }), void 0)] }), void 0)),
                    });
                },
            });
        }
        else {
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
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state: { expanded }, } = (0, react_table_1.useTable)({
            columns: userColumns,
            data,
        }, react_table_1.useExpanded);
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "flex flex-col mt-4" }, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8" }, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8" }, { children: (0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "overflow-hidden border-b border-gray-200 shadow sm:rounded-lg" }, { children: (0, jsx_runtime_1.jsxs)(react_3.Table, Object.assign({}, getTableProps(), { variant: "simple" }, { children: [(0, jsx_runtime_1.jsx)(react_3.TableCaption, { children: "\u7CFB\u7EDF\u7C7B\u578B" }, void 0), (0, jsx_runtime_1.jsx)(react_3.Thead, Object.assign({ className: "bg-gray-50" }, { children: headerGroups.map((headerGroup, index) => ((0, react_1.createElement)(react_3.Tr, Object.assign({}, headerGroup.getHeaderGroupProps(), { key: index }), headerGroup.headers.map((column, i) => ((0, react_1.createElement)(react_3.Th, Object.assign({ scope: "col", className: "px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase group" }, column.getHeaderProps(), { key: i }), column.render("Header"))))))) }), void 0), (0, jsx_runtime_1.jsx)(react_3.Tbody, Object.assign({}, getTableBodyProps(), { className: "bg-white divide-y divide-gray-200" }, { children: rows.map((row, i) => {
                                            prepareRow(row);
                                            return ((0, react_1.createElement)(react_3.Tr, Object.assign({}, row.getRowProps(), { key: i }), row.cells.map((cell, index) => {
                                                return ((0, react_1.createElement)(react_3.Td, Object.assign({}, cell.getCellProps(), { role: "cell", key: index }), cell.column.Cell.name === "defaultRenderer" ? ((0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({ className: "text-sm text-gray-500" }, { children: cell.render("Cell") }), void 0)) : (cell.render("Cell"))));
                                            })));
                                        }) }), void 0)] }), void 0) }), void 0) }), void 0) }), void 0) }), void 0) }, void 0));
    };
    const handValue = (0, react_2.useCallback)(e => setCategory(Object.assign(Object.assign({}, category), { name: e.target.value })), [category.name, category.id]);
    const columns = (0, react_2.useMemo)(() => [
        {
            // Build our expander column
            id: "expander",
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => ((0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({}, getToggleAllRowsExpandedProps(), { children: isAllRowsExpanded ? ((0, jsx_runtime_1.jsx)(icons_1.ChevronDownIcon, { w: 8, h: 8, color: "red.500" }, void 0)) : ((0, jsx_runtime_1.jsx)(icons_1.ChevronRightIcon, { w: 8, h: 8, color: "red.500" }, void 0)) }), void 0)),
            Cell: ({ row }) => 
            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
            // to build the toggle for expanding a row
            row.canExpand ? ((0, jsx_runtime_1.jsx)(react_3.Box, Object.assign({}, row.getToggleRowExpandedProps({
                style: {
                    paddingLeft: `${row.depth * 2}px`,
                },
            }), { children: row.isExpanded ? ((0, jsx_runtime_1.jsx)(icons_1.ChevronDownIcon, { w: 8, h: 8, color: "red.500" }, void 0)) : ((0, jsx_runtime_1.jsx)(icons_1.ChevronRightIcon, { w: 8, h: 8, color: "red.500" }, void 0)) }), void 0)) : null,
        },
        {
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u7C7B\u578B" }), void 0)),
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
            Header: () => ((0, jsx_runtime_1.jsx)(react_3.Heading, Object.assign({ as: "h4", size: "md" }, { children: "\u64CD\u4F5C" }), void 0)),
            id: "caozuo",
            columns: [
                {
                    accessor: (originalRow, _) => ((0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "blue", leftIcon: (0, jsx_runtime_1.jsx)(icons_1.AddIcon, {}, void 0), size: "sm", variant: "solid", onClick: () => handModal(originalRow.id, "add") }, { children: "\u65B0\u589E" }), void 0)),
                    id: "add",
                    width: 10,
                    minWidth: 5,
                },
                {
                    accessor: (originalRow, _) => ((0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "teal", leftIcon: (0, jsx_runtime_1.jsx)(icons_1.EditIcon, {}, void 0), size: "sm", variant: "solid", onClick: () => handEdit(originalRow, "edit") }, { children: "\u7F16\u8F91" }), void 0)),
                    id: "edit",
                    width: 10,
                    minWidth: 5,
                },
                {
                    Header: "",
                    accessor: (originalRow, _) => ((0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "red", size: "sm", leftIcon: (0, jsx_runtime_1.jsx)(icons_1.DeleteIcon, {}, void 0), variant: "solid", onClick: () => handModal(originalRow.id, "del") }, { children: "\u5220\u9664" }), void 0)),
                    id: "del",
                    width: 10,
                    minWidth: 5,
                },
            ],
        },
    ], []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(react_3.Container, Object.assign({ maxW: "container.xl" }, { children: [(0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ mt: 5, onClick: () => handModal("", "add"), colorScheme: "blue", variant: "solid", leftIcon: (0, jsx_runtime_1.jsx)(icons_1.AddIcon, {}, void 0), size: "md" }, { children: "\u65B0\u589E\u9876\u7EA7\u7C7B\u578B" }), void 0), status === "loading" ? ((0, jsx_runtime_1.jsx)(react_3.CircularProgress, { isIndeterminate: true, color: "green.300" }, void 0)) : status === "error" ? ((0, jsx_runtime_1.jsx)(react_3.Box, { children: (0, jsx_runtime_1.jsxs)(react_3.Alert, Object.assign({ status: "error" }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertIcon, {}, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertTitle, Object.assign({ mr: 2 }, { children: error.message }), void 0), (0, jsx_runtime_1.jsx)(react_3.CloseButton, { position: "absolute", right: "8px", top: "8px" }, void 0)] }), void 0) }, void 0)) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TableList, { columns: columns, data: tableData }, void 0), (0, jsx_runtime_1.jsx)(react_3.Box, { children: isFetching ? ((0, jsx_runtime_1.jsx)(react_3.Spinner, { thickness: "4px", speed: "0.65s", emptyColor: "gray.200", color: "blue.500", size: "xl" }, void 0)) : (" ") }, void 0)] }, void 0)), show.isShow && show.type !== "del" && ((0, jsx_runtime_1.jsxs)(react_3.Modal, Object.assign({ isOpen: show.isShow && show.type !== "del", onClose: onClose }, { children: [(0, jsx_runtime_1.jsx)(react_3.ModalOverlay, {}, void 0), (0, jsx_runtime_1.jsxs)(react_3.ModalContent, { children: [(0, jsx_runtime_1.jsx)(react_3.ModalHeader, { children: "\u7C7B\u578B\u63D0\u4EA4" }, void 0), (0, jsx_runtime_1.jsx)(react_3.ModalCloseButton, {}, void 0), (0, jsx_runtime_1.jsx)(react_3.ModalBody, { children: (0, jsx_runtime_1.jsxs)(react_3.FormControl, Object.assign({ isInvalid: isError, isRequired: true }, { children: [(0, jsx_runtime_1.jsx)(react_3.FormLabel, Object.assign({ htmlFor: "name" }, { children: "\u8BF7\u586B\u5165\u7C7B\u578B\u540D\u79F0" }), void 0), (0, jsx_runtime_1.jsx)(react_3.Input, { id: "name", isRequired: true, isInvalid: true, errorBorderColor: "crimson", value: category.name, onChange: event => handValue(event), type: "text", size: "md", variant: "filled", placeholder: "\u7C7B\u578B\u540D\u79F0" }, void 0), !isError ? ((0, jsx_runtime_1.jsx)(react_3.FormHelperText, { children: "\u586B\u5199\u4E0D\u540C\u540D\u79F0\u7C7B\u578B" }, void 0)) : ((0, jsx_runtime_1.jsx)(react_3.FormErrorMessage, { children: "\u540D\u79F0\u5FC5\u987B\u8981\u586B" }, void 0))] }), void 0) }, void 0), (0, jsx_runtime_1.jsxs)(react_3.ModalFooter, { children: [(0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "teal", variant: "outline", mr: 3, onClick: () => onClose() }, { children: "\u5173\u95ED" }), void 0), (0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ variant: "solid", colorScheme: "blue", onClick: () => onSubmit() }, { children: "\u63D0\u4EA4" }), void 0)] }, void 0)] }, void 0)] }), void 0)), (0, jsx_runtime_1.jsxs)(react_3.AlertDialog, Object.assign({ motionPreset: "slideInBottom", leastDestructiveRef: cancelRef, onClose: onClose, isOpen: show.isShow && show.type === "del", isCentered: true }, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertDialogOverlay, {}, void 0), (0, jsx_runtime_1.jsxs)(react_3.AlertDialogContent, { children: [(0, jsx_runtime_1.jsx)(react_3.AlertDialogHeader, { children: "\u5220\u9664\u63D0\u793A?" }, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertDialogCloseButton, {}, void 0), (0, jsx_runtime_1.jsx)(react_3.AlertDialogBody, { children: "\u60A8\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u6570\u636E\u5417\uFF1F" }, void 0), (0, jsx_runtime_1.jsxs)(react_3.AlertDialogFooter, { children: [(0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ ref: cancelRef, onClick: () => onSubmit() }, { children: "\u786E\u5B9A" }), void 0), (0, jsx_runtime_1.jsx)(react_3.Button, Object.assign({ colorScheme: "red", ml: 3, onClick: () => onClose() }, { children: "\u53D6\u6D88" }), void 0)] }, void 0)] }, void 0)] }), void 0)] }), void 0) }, void 0));
};
exports.default = Category;
//# sourceMappingURL=index.js.map