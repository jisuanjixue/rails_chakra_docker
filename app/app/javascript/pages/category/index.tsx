

import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import {
    useQuery,
    useQueryClient,
    useMutation
} from "react-query";
import categoriesApi from "../../apis/category";

const Category = () => {
    const fetchCategories = () => {
        return useQuery("categories", async () => {
            const { data } = await categoriesApi.list()
            return data;
        });
    };
    const { status, data, error, isFetching } = fetchCategories();

    console.log("🚀 ~ file: index.tsx ~ line 24 ~ Category ~ data", data)

    const [name, setName] = useState('');
    const queryClient = useQueryClient();

    // Mutations
    const addCategory = useMutation(name => categoriesApi.create(name), {
        onMutate: async name => {
            setName('')
            await queryClient.cancelQueries('categories')
            const previousValue = queryClient.getQueryData('categories')
            queryClient.setQueryData('categories', (old: any) => ({
                ...old,
                categories: [...old.categories, name],
            }))
            return previousValue
        },
        onError: (_err, _variables, previousValue: any) => queryClient.setQueryData('categories', previousValue),
        onSettled: () => queryClient.invalidateQueries('categories')
    })

    const onSubmit = () => {
        addCategory.mutate(name)
    }

    return (
        <>
            <div>
                <label htmlFor="my-modal-2" className="btn btn-primary modal-button">新增类型</label>
                <input type="checkbox" id="my-modal-2" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">请填入类型名称</span>
                            </label>
                            <input value={name} onChange={event => setName(event.target.value)} type="text" placeholder="username" className="input input-bordered" />
                        </div>
                        <div className="modal-action">
                            <label htmlFor="my-modal-2" className="btn btn-primary" onClick={() => onSubmit()}>确定</label>
                            <label htmlFor="my-modal-2" className="btn">关闭</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                {status === "loading" ? <div>加载中</div> : status === "error" ? <div>错误: {error.message}</div> :
                    <>
                        <table className="table w-full table-zebra">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>名称</th>
                                    {/* <th>Job</th>
                        <th>Favorite Color</th> */}
                                </tr>
                            </thead>
                            <tbody>
                            {data.categories.map((item, index) => (
                        <tr key={index + 1}>
                            <th>{index}</th>
                            <td>{item.name}</td>
                        </tr>
                    ))} 
                            </tbody>
                        </table>
                        <div>{isFetching ? 'Updating in background...' : ' '}</div>
                    </>
                }

            </div>
            <ReactQueryDevtools initialIsOpen />
        </>
    )
}

export default Category