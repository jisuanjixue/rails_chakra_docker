

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
    useQuery,
    useQueryClient,
    useMutation
} from "react-query";
import { useTable, useExpanded } from 'react-table'
import categoriesApi from "../../apis/category";

const Category = () => {
    const [category, setCategory] = useState({ name: '', id: '' });
    const [show, setShow] = useState({ isShow: false, type: '' });

    const fetchCategories = () => {
        return useQuery("categories", async () => {
            const { data } = await categoriesApi.list()
            return data;
        }, {
            refetchOnWindowFocus: false,
        });
    };

    const { status, data, error, isFetching, isRefetching } = fetchCategories();
    const tableData = data?.categories

    useEffect(() => {

    }, [category.name, category.id])

    const queryClient = useQueryClient();

    // Mutations
    const addCategory = useMutation((category: any) => categoriesApi.create(category), {
        mutationKey: "addCategory",
        onMutate: async name => {
            setCategory({ name: '', id: '' })
            await queryClient.cancelQueries('categories')
            const previousValue = queryClient.getQueryData('categories')
            queryClient.setQueryData('categories', (old: any) => {
                return ({
                    ...old,
                    categories: [...old.categories, name],
                })
            })
            return previousValue
        },
        onError: (_err, _variables, previousValue: any) => queryClient.setQueryData('categories', previousValue),
        onSettled: () => queryClient.invalidateQueries('categories')
    })

    const updateCategory = useMutation((category: any) => categoriesApi.update(category), {
        mutationKey: "editCategory",
        onMutate: async newCategory => {
            await queryClient.cancelQueries(['categories', newCategory.id])
            // Snapshot the previous value
            const previousValue = queryClient.getQueryData(['categories', newCategory.id])
            // Optimistically update to the new value
            queryClient.setQueryData(['categories', newCategory.id], newCategory)
            // Return a context object with the snapshotted value
            return { previousValue, newCategory }
        },
        onError: (err, newCategory, context: any) => {
            queryClient.setQueryData(
                ['categories', context.newCategory.id],
                context.previousValue
            )
        },
        // Always refetch after error or success:
        onSettled: (newCategory: any) => {
            queryClient.invalidateQueries(['categories', newCategory.id])
        },
    })

    const deleteCategory = useMutation((id: String) => categoriesApi.remove(id), {
        mutationKey: "delCategory",
        onMutate: async id => {
            await queryClient.cancelQueries(['categories', id])
            const previousValue: any = queryClient.getQueryData('categories')
            const updateValue = [...previousValue.categories]
            const removeDeleted = updateValue.filter(f => f.id !== id)
            queryClient.setQueryData('categories', (old:any) => {
                return ({
                    ...old,
                    categories: removeDeleted,
                })
            })
            return previousValue
        },
        onError: (_err, _variables, previousValue: any) => queryClient.setQueryData('categories', previousValue),
        onSettled: () => queryClient.invalidateQueries('categories')
    })

    const onSubmit = () => {
        if (show.type === 'add') {
            addCategory.mutate(category)
        } else if (show.type === 'edit') {
            updateCategory.mutate(category)
        } else {
            deleteCategory.mutate(category.id)
            setShow({ isShow: false, type: ''})
        }
        if (addCategory.isSuccess || updateCategory.isSuccess || deleteCategory.isSuccess) {
            setShow({ isShow: false, type: ''})
            return (
                <div className="alert alert-success">
                    <div className="flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                        </svg>
                        <label>操作成功</label>
                    </div>
                </div>
            )
        }
        if (addCategory.isError ||  updateCategory.isError) {
            <div className="alert alert-error">
                <div className="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                    </svg>
                    <label>操作失败</label>
                </div>
            </div>
        }

    }

    const onClose = () => {
        setShow({ isShow: false, type: '' })
    }

    const handModal = (id, type) => {
        setShow({ isShow: true, type })
        setCategory({ ...category, id })
    }

    const handEdit = (row, type) => {
        setShow({ isShow: true, type })
        setCategory({ name: row.name, id: row.id })
    }

    const Table = ({ columns: userColumns, data }) => {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            state: { expanded } } = useTable({
                columns: userColumns,
                data
            }, useExpanded)
        return (
            <>
                <div className="mt-4 flex flex-col">
                    <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        {headerGroups.map(headerGroup => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map(column => (
                                                    <th scope="col" className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...column.getHeaderProps()}>{column.render('Header')}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                                        {rows.map((row, i) => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map(cell => {
                                                        return <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap" role="cell">{cell.column.Cell.name === "defaultRenderer"
                                                            ? <div className="text-sm text-gray-500">{cell.render('Cell')}</div>
                                                            : cell.render('Cell')
                                                        }</td>
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const handValue = useCallback(
        (e) => setCategory({ ...category, name: e.target.value }), [category.name, category.id]
    )

    const columns = useMemo(
        () => [
            {
                // Build our expander column
                id: 'expander', // Make sure it has an ID
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                        {isAllRowsExpanded ? '👇' : '👉'}
                    </span>
                ),
                Cell: ({ row }) =>
                    // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                    // to build the toggle for expanding a row
                    row.canExpand ? (
                        <span
                            {...row.getToggleRowExpandedProps({
                                style: {
                                    paddingLeft: `${row.depth * 2}px`,
                                },
                            })}
                        >
                            {row.isExpanded ? '👇' : '👉'}
                        </span>
                    ) : null,
            },
            {
                Header: '类型',
                columns: [
                    {
                        accessor: 'name',
                        width: 60,
                        minWidth: 30
                    },
                ],
            },
            {
                Header: '操作',
                columns: [
                    {
                        accessor: (originalRow, _) => <div className="btn btn-primary" onClick={() => handModal(originalRow.id, 'add')}>新增</div>,
                        id: 'add',
                        width: 20,
                        minWidth: 10,
                    },
                    {
                        accessor: (originalRow, _) => <div className="btn btn-primary" onClick={() => handEdit(originalRow, 'edit')}>编辑</div>,
                        id: 'edit',
                        width: 20,
                        minWidth: 10,
                    },
                    {
                        Header: '',
                        accessor: (originalRow, _) => <div className="btn btn-primary" onClick={() => handModal(originalRow.id, 'del')}>删除</div>,
                        id: 'del',
                        width: 20,
                        minWidth: 10,
                    }
                ],
            },
        ], []
    )

    return (
        <>
            <div className="sm:flex sm:gap-x-2">
                <div className="btn btn-primary" onClick={() => handModal('', 'add')}>新增顶级类型</div>
            </div>
            <div className="overflow-x-auto">
                {status === "loading" ? <div>加载中</div> : status === "error" ? <div>错误: {error.message}</div> :
                    <>
                        <Table columns={columns} data={tableData} />
                        <div>{isFetching ? 'Updating in background...' : ' '}</div>
                    </>
                }

            </div>
            {show.isShow && <div className="modal modal-open">
                <div className="modal-box">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">请填入类型名称</span>
                        </label>
                        <input value={category.name} id="add" onChange={event => handValue(event)} type="text" placeholder="类型名称" className="input input-bordered" />
                    </div>
                    <div className="modal-action">
                        <div className="btn btn-primary" onClick={() => onSubmit()}>确定</div>
                        <div className="btn" onClick={() => onClose()}>关闭</div>
                    </div>
                </div>
            </div>}
            {
                (show.isShow && show.type === "del") && <div className="modal modal-open">
                    <div className="modal-box">
                        <p>确定要删除吗？</p>
                    <div className="modal-action">
                        <div className="btn btn-primary" onClick={() => onSubmit()}>确定</div>
                        <div className="btn" onClick={() => onClose()}>关闭</div>
                    </div>
                </div>
                </div>
            }
        </>
    )
}

export default Category