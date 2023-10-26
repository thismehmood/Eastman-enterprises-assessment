import { useEffect } from "react";
import { useState } from "react";

const Table = ({
    columns = [
        {
            header: "Product",
            field: "title",
            render: (values) => {
                return (
                    <div className="flex items-center text-gray-900 whitespace-nowrap">
                        <img
                            className="w-10 h-10"
                            src={values?.thumbnail}
                            alt="Jese image"
                        />
                        <div className="pl-3">
                            <div className="text-base font-semibold">
                                {values?.title}
                            </div>
                            <div className="font-normal text-gray-500">
                                {values?.brand}
                            </div>
                        </div>
                    </div>
                );
            }
        },
        {
            header: "Rating",
            field: "rating",
            render: (values) => {
                const { rating } = values;
                if (rating) {
                    let ratingArray = Array(Math.floor(rating)).fill(rating);
                    let differArray = Array(
                        Math.floor(rating >= 4 && rating <= 5 ? 1 : 5 - rating)
                    ).fill(rating);
                    return (
                        <>
                            <div className="flex items-center mb-2">
                                {ratingArray?.map((item, index) => (
                                    <svg
                                        key={item + index}
                                        className="w-4 h-4 text-yellow-300 mr-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                                {differArray?.map((item, index) => (
                                    <svg
                                        key={item + index}
                                        className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                                <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                                    {rating} out of 5
                                </p>
                            </div>
                        </>
                    );
                } else {
                    return "";
                }
            }
        },
        { header: "Discount (Percent)", field: "discountPercentage" },
        { header: "Category", field: "category" },
        { header: "Price", field: "price" }
    ],
    values = [],
    onAddBtnClick = () => {},
    onRowClick = () => {}
}) => {
    const [products, setProducts] = useState([]);
    const handleSearch = (e) => {
        let filterData = values?.filter((product) => {
            if (
                product.title
                    ?.toLocaleLowerCase()
                    .includes(e.target.value?.toLocaleLowerCase().trim()) ||
                String(product.rating)
                    ?.toLocaleLowerCase()
                    .includes(e.target.value?.toLocaleLowerCase().trim()) ||
                String(product.discountPercentage)
                    ?.toLocaleLowerCase()
                    .includes(e.target.value?.toLocaleLowerCase().trim()) ||
                String(product.price)
                    ?.toLocaleLowerCase()
                    .includes(e.target.value?.toLocaleLowerCase().trim()) ||
                product.category
                    ?.toLocaleLowerCase()
                    .includes(e.target.value?.toLocaleLowerCase().trim())
            ) {
                return product;
            }
        });
        setProducts(filterData);
    };

    useEffect(() => {
        setProducts(values);
    }, [values]);

    return (
        <>
            <div className="flex justify-between mb-4">
                <div className="w-full">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search "
                            onChange={handleSearch}
                        />
                    </div>
                </div>
                <button
                    onClick={onAddBtnClick}
                    type="button"
                    className="text-sm  px-4 py-2 ml-2 w-36 font-medium transition delay-150 duration-300 ease-in-out  text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    + Add Product
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto h-[80vh]">
                <table className="w-full text-sm text-left text-gray-500 table-fixed dark:text-gray-400">
                    <thead className="bg-gray-100 text-xs text-gray-700 uppercase  dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map(({ header }) => (
                                <th
                                    scope="col"
                                    key={header}
                                    className="px-6 py-3"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((value, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                {columns.map(({ field, render }, index) => {
                                    return (
                                        <td
                                            onClick={() => onRowClick(value)}
                                            key={index}
                                            className="px-6 py-4"
                                        >
                                            {render
                                                ? render(value)
                                                : value[field]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!products?.length > 0 && (
                    <div className="p-2 text-center text-blue-400">
                        No records found
                    </div>
                )}
            </div>
        </>
    );
};

export default Table;
