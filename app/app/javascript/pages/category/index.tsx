

import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";
import categoriesApi from "../../apis/category";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.list();
        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCategories();
    }, []);

    if (loading) {
        return (
          <div className="w-screen h-screen">
           fdggf
          </div>
        );
      }

    if (either(isNil, isEmpty)(categories)) {
        return (
            <h1 className="text-xl leading-5 text-center">
              You have no categories assigned 😔
            </h1>
        );
      }

      console.log(categories)

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Price
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <!-- Product 1 --> */}
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Sliver
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Laptop
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        $2999
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                    </td>
                                </tr>
                                {/* <!-- Product 2 --> */}
                                <tr className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple Imac 27"
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        White
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Desktop Pc
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        $1999
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                    </td>
                                </tr>
                                {/* Product 3  */}
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-600">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        iPhone 13 Pro
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        White
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Phone
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        $999
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                    </td>
                                </tr>
                                {/* <!-- Product 4 --> */}
                                <tr className="border-b bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple Magic Mouse 2
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        White
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Accessories
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        $99
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                    </td>
                                </tr>
                                {/* <!-- Product 5 --> */}
                                <tr className="bg-white dark:bg-gray-800">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple Watch Series 7
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Pink
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        Accessories
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                        $599
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category