import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api, { convertUtcToJakartaTime, formatRupiah } from "../api";
import TableT from "../components/Table";
import Modal, {
    Alert,
    ModalAddTr,
    ModalDelete,
    ModalEditTr,
} from "../components/Modal";

export default function Products() {
    const [alert, setAlert] = useState({
        isOpen: false,
        content: "",
        type: "red",
    });
    const [modalEdit, setModalEdit] = useState({
        isOpen: false,
        onClose: () => setModalEdit({ ...modalEdit, isOpen: false }),
        data: {
            id: "",
            name: "",
            price: "",
            stock: "",
            description: "",
        },
        type: "edit",
    });
    const [modalDelete, setModalDelete] = useState({
        isOpen: false,
        onClose: () => setModalDelete({ ...modalDelete, isOpen: false }),
    });

    const [modalData, setModalData] = useState({
        data: {
            product_id: "",
            quantity: "",
        },
        onClose: () => {
            setModalData({ ...modalData, isOpen: false });
        },
        isOpen: false,
    });
    const [valueSearch, setValueSearch] = useState("");
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 20,
        nextPage: 2,
        prevPage: 1,
    });

    const API = api(window.location.origin, () => setIsLoading(!isLoading));

    const showAlert = (content, type = "red") => {
        setAlert({
            isOpen: true,
            content: content,
            type: type,
        });

        setTimeout(() => setAlert({ isOpen: false, content: "" }), 3000);
    };

    useEffect(() => {
        API.getProducts(15, 1)
            .then((result) => {
                setData(result);
            })
            .catch(() => setData({ data: [] }));
    }, []);

    useEffect(() => {
        API.getProducts(pagination.perPage, 1, valueSearch)
            .then((result) => setData(result))
            .catch(() => setData({ data: [] }));
    }, [pagination.perPage]);

    const addtionalProps = {
        valueSearch: valueSearch,
        setValueSearch: setValueSearch,
        onSubmitSearch: () => {
            API.getProducts(pagination.perPage, 1, valueSearch)
                .then((result) => {
                    if (result !== false) setData(result);
                    else {
                        setData({ data: [] });
                        showAlert("Data Not Found", "red");
                    }
                })
                .catch(() => setData({ data: [] }));
        },
        onClickAdd: () =>
            setModalEdit({ ...modalEdit, isOpen: true, type: "add", data: {} }),
    };

    // useEffect(() => {
    //     console.log(valueSearch);
    // }, [valueSearch]);

    return (
        <Layout {...addtionalProps}>
            <>
                <TableT
                    onModalEdit={(data) =>
                        setModalEdit({
                            ...modalEdit,
                            data: data,
                            isOpen: true,
                            type: "edit",
                        })
                    }
                    onModalDelete={(data) =>
                        setModalDelete({
                            ...modalDelete,
                            data: data,
                            isOpen: true,
                        })
                    }
                    onModalData={(data) =>
                        setModalData({ ...modalData, data: data, isOpen: true })
                    }
                    action={true}
                    label={[
                        "No",
                        "Product Name",
                        "Price",
                        "Stock",
                        "Description",
                        "Created At",
                        "Action",
                    ]}
                    dataTable={data}
                    dataBody={
                        data &&
                        data.data.map((item) => [
                            item.id,
                            item.name,
                            formatRupiah(item.price),
                            item.stock,
                            item.description,
                            convertUtcToJakartaTime(item.created_at),
                        ])
                    }
                    setPagination={(e) =>
                        setPagination({ ...pagination, perPage: e })
                    }
                    clickFirst={async () => {
                        try {
                            const result = await API.getProducts(
                                pagination.perPage,
                                1,
                                valueSearch
                            );
                            if (result !== false) {
                                setData(result);
                                return;
                            }
                            setData({ ...data, data: [] });
                        } catch (e) {
                            setData({ ...data, data: [] });
                            console.log(e);
                        }
                    }}
                    clickLast={() => {
                        API.getProducts(pagination.perPage, data.last_page, valueSearch)
                            .then((result) => {
                                if (result !== false) {
                                    setData(result);
                                    return;
                                }
                                setData({ ...data, data: [] });
                            })
                            .catch(() => setData({ data: [] }));
                    }}
                    clickNext={async () => {
                        try {
                            const result = await API.getProducts(
                                pagination.perPage,
                                data.current_page + 1,
                                valueSearch
                            );
                            if (result !== false) {
                                setData(result);
                                return;
                            }
                            setData({ ...data, data: [] });
                        } catch (e) {
                            setData({ ...data, data: [] });
                        }
                    }}
                    clickPrev={() => {
                        API.getProducts(
                            pagination.perPage,
                            data.current_page - 1,
                            valueSearch
                        )
                            .then((result) => {
                                if (result !== false) {
                                    setData(result);
                                    return;
                                }
                                setData({ ...data, data: [] });
                            })
                            .catch(() => setData({ data: [] }));
                    }}
                />
                {modalData.isOpen && (
                    <ModalAddTr
                        onClose={modalData.onClose}
                        value={modalData.data}
                        onChange={(e) =>
                            setModalData({ ...modalData, data: e })
                        }
                        onSubmit={() => {
                            API.newTransaction(modalData.data).then(
                                (result) => {
                                    if (result[0] === false) {
                                        console.log(
                                            "Failed Submit data:",
                                            result[1]
                                        );
                                        showAlert("Failed Create Product");
                                        setModalData({
                                            ...modalData,
                                            isOpen: false,
                                        });
                                        return;
                                    }
                                    setModalData({
                                        ...modalData,
                                        isOpen: false,
                                    });
                                    API.getProducts(
                                        pagination.perPage,
                                        data.current_page,
                                        valueSearch
                                    ).then((result) => {
                                        if (result !== false) setData(result);
                                    });
                                    showAlert(
                                        "Success Create Product",
                                        "success"
                                    );
                                    return;
                                }
                            );
                        }}
                    >
                        {modalData.content}
                    </ModalAddTr>
                )}
                {modalDelete.isOpen && (
                    <ModalDelete
                        onClose={modalDelete.onClose}
                        onSubmit={() => {
                            API.deleteProduct(modalDelete.data).then(
                                (result) => {
                                    if (result[0] === false) {
                                        console.log(
                                            "Failed Submit data:",
                                            result[1]
                                        );
                                        showAlert("Failed Delete Product", "red");
                                        setModalDelete({
                                            ...modalDelete,
                                            isOpen: false,
                                        });
                                        return
                                    }
                                    setModalDelete({
                                        ...modalDelete,
                                        isOpen: false,
                                    });
                                    API.getProducts(pagination.perPage, data.current_page,valueSearch).then((result) => {
                                        if (result !== false) setData(result);
                                    });
                                    showAlert(
                                        "Success Delete Product",
                                        "success"
                                    );
                                }
                            );
                            API.getProducts(20, 1, valueSearch).then((result) => {
                                if (result !== false) setData(result);
                                return;
                            });
                        }}
                    />
                )}
                {modalEdit.isOpen && (
                    <ModalEditTr
                        label={
                            modalEdit.type === "edit"
                                ? "Edit Product"
                                : "Add Product"
                        }
                        onClose={modalEdit.onClose}
                        value={modalEdit.data}
                        onChange={(e) =>
                            setModalEdit({
                                ...modalEdit,
                                data: e,
                            })
                        }
                        onSubmit={() => {
                            if (modalEdit.data.stock < 0) {
                                showAlert(
                                    "Stock must be greater than 0",
                                    "red"
                                );
                                return;
                            }
                            // field validation
                            if (!modalEdit.data.name) {
                                showAlert("Name is required", "red");
                                return;
                            }
                            if (!modalEdit.data.price) {
                                showAlert("Price is required", "red");
                                return;
                            }
                            if (!modalEdit.data.stock) {
                                showAlert("Stock is required", "red");
                                return;
                            }
                            if (!modalEdit.data.description) {
                                showAlert("Description is required", "red");
                                return;
                            }
                            if (modalEdit.type === "edit") {
                                API.editProduct(modalEdit.data).then(
                                    (result) => {
                                        if (result[0] === false) {
                                            console.log(
                                                "Failed Submit data:",
                                                result[1]
                                            );
                                            return;
                                        }
                                        showAlert(
                                            "Success Edit Product",
                                            "success"
                                        );
                                        API.getProducts(20, 1, valueSearch).then(
                                            (result) => {
                                                if (result !== false)
                                                    setData(result);
                                            }
                                        );
                                        return;
                                    }
                                );
                                setModalEdit({ ...modalEdit, isOpen: false });
                            } else {
                                API.newProduct(modalEdit.data).then(
                                    (result) => {
                                        if (result[0] === false) {
                                            console.log(
                                                "Failed Submit data:",
                                                result[1]
                                            );
                                            return;
                                        }
                                        showAlert(
                                            "Success Add Product",
                                            "success"
                                        );
                                        API.getProducts(20, 1,valueSearch).then(
                                            (result) => {
                                                if (result !== false)
                                                    setData(result);
                                            }
                                        );
                                        return;
                                    }
                                );
                                setModalEdit({ ...modalEdit, isOpen: false });
                            }
                        }}
                    />
                )}
                {alert.isOpen && (
                    <Alert type={alert.type} content={alert.content} />
                )}
            </>
        </Layout>
    );
}
