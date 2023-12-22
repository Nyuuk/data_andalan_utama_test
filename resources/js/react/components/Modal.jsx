import { useEffect } from "react";

const Modal = ({ title, children, onClose }) => {
    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            className="overflow-y-auto overflow-x-hidden fixed z-10 w-full md:inset-0 h-full bg-gray-700 bg-opacity-60"
        >
            <div className="relative p-4 w-full max-h-full">
                <div className="absolute top-[100%] left-1/2 translate-x-[-50%] bg-white rounded-lg shadow dark:bg-gray-700 w-[20%]">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button
                            type="button"
                            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">{children}</div>
                </div>
            </div>
        </div>
    );
};

const ModalAddTr = ({ onClose, onChange, value, onSubmit }) => {
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log(value)
            onSubmit();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [value]);

    return (
        <Modal title={"New Transaction"} onClose={onClose}>
            <div className="flex gap-2">
                <InputForm
                    id="name"
                    label="Product ID"
                    type="number"
                    value={value && value.product_id}
                    required
                    onChange={(e) => onChange({ ...value, product_id: e })}
                />
                <InputForm
                    id="name"
                    label="Quantity"
                    type="number"
                    value={value && value.quantity}
                    required
                    onChange={(e) => {
                        onChange({ ...value, quantity: e })
                    }
                    }
                />
            </div>
            <div className="mt-3 w-full">
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Save New Transaction
                </button>
            </div>
        </Modal>
    );
};

const ModalEditTr = ({ onClose, onChange, value, onSubmit, label }) => {
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSubmit();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [value]);

    return (
        <Modal title={label} onClose={onClose}>
            <div className="flex flex-col gap-2">
                <InputForm
                    type="text"
                    label="Name"
                    value={value && value.name}
                    required
                    onChange={(e) => onChange({ ...value, name: e })}
                />
                <InputForm
                    type="number"
                    label="Price"
                    value={value && value.price}
                    required
                    onChange={(e) => onChange({ ...value, price: Number(e) })}
                />
                <InputForm
                    label="Stock"
                    type="number"
                    value={value && value.stock}
                    required
                    onChange={(e) => onChange({ ...value, stock: Number(e) })}
                />
                <InputForm
                    label="Description"
                    type="text"
                    value={value && value.description}
                    required
                    onChange={(e) => onChange({ ...value, description: e })}
                />
            </div>
            <div className="mt-4 w-full">
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Save
                </button>
            </div>
        </Modal>
    );
};

const ModalDelete = ({ onClose, onSubmit }) => {
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSubmit();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div
            id="popup-modal"
            tabIndex="-1"
            className="overflow-y-auto overflow-x-hidden fixed z-10 w-full md:inset-0 h-full bg-gray-700 bg-opacity-60"
        >
            <div className="relative p-4 w-full max-h-full">
                <div className="absolute top-[100%] left-1/2 translate-x-[-50%] bg-white rounded-lg shadow dark:bg-gray-700 w-[25%]">
                    <button
                        onClick={onClose}
                        type="button"
                        className="absolute text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            If this product have some transactions, it cannot be
                            deleted. Are you sure you want to delete this
                            product?
                        </h3>
                        <button
                            onClick={onSubmit}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            onClick={onClose}
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            No, cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputForm = ({ id, label, type, required, onChange, value }) => {
    return (
        <div>
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required={required}
                onChange={(e) => onChange(e.target.value)}
                value={value}
            />
        </div>
    );
};

const Alert = ({ content, type, disabled }) => {
    return (
        <div
            id="toast-top-right"
            className={`${
                disabled ? "hidden" : ""
            } z-50 fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white ${
                type === "red" ? "bg-red-600" : "bg-green-600"
            } divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 space-x`}
            role="alert"
        >
            <div className="text-sm font-normal">{content}</div>
        </div>
    );
};

export default Modal;
export { InputForm, ModalAddTr, ModalEditTr, ModalDelete, Alert };
