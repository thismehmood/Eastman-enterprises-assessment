import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import Modal from "./Modal";
import Table from "./Table/Table";

const ProductList = () => {
    const dispatch = useDispatch();
    const {
        products: { items, status }
    } = useSelector((state) => state);

    const [showModal, setShowModal] = useState(false);
    const [modelContent, setModelContent] = useState({});

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleModalClick = () => {
        setShowModal(!showModal); // Show the modal when "Edit" is clicked
        setModelContent({});
    };
    const onRowClick = (data) => {
        setModelContent(data);
        setShowModal(true);
    };

    return (
        <>
            <div className="p-4 ">
                <div className="text-2xl font-extrabold">Products</div>
            </div>
            <div className="px-4">
                <Table
                    values={items}
                    onAddBtnClick={handleModalClick}
                    {...{ onRowClick }}
                />
                <Modal
                    {...{
                        setShowModal,
                        showModal,
                        modelContent,
                        setModelContent
                    }}
                />
            </div>
        </>
    );
};

export default ProductList;
