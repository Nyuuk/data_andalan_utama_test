const TrBody = ({ label, action, Btn }) => {
    const [addBtn, deleteBtn, editBtn] = Btn ? Btn : undefined;
    return (
        <>
            <tr>
                {label &&
                    label.map((item, key) => {
                        if (key === 1) return;
                        return (
                            <td
                                className="px-5 py-3 border-b border-gray-300/70 bg-slate-500 text-sm"
                                key={key}
                            >
                                <p className="text-gray-200/70 whitespace-no-wrap">
                                    {item}
                                </p>
                            </td>
                        );
                    })}
                {action && (
                    <td className="px-5 py-3 border-b border-gray-300/70 bg-slate-500 text-[12px]">
                        <div className="flex flex-row gap-1">
                            <button
                                onClick={addBtn}
                                className="py-1 px-2 bg-slate-700 rounded text-gray-200 hover:bg-slate-900/80"
                            >
                                ADD
                            </button>
                            <button onClick={deleteBtn} className="py-1 px-2 bg-slate-700 rounded text-gray-200 hover:bg-slate-900/80">
                                DELETE
                            </button>
                            <button onClick={editBtn} className="py-1 px-2 bg-slate-700 rounded text-gray-200 hover:bg-slate-900/80">
                                EDIT
                            </button>
                        </div>
                    </td>
                )}
            </tr>
        </>
    );
};

const TableT = ({
    onModalEdit,
    onModalDelete,
    onModalData,
    action,
    label,
    dataTable,
    dataBody,
    setPagination,
    clickFirst,
    clickLast,
    clickNext,
    clickPrev,
}) => {
    let number = 0;
    return (
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            {label &&
                                label.map((item, key) => {
                                    // if (key === 0) {
                                    //     return
                                    // }
                                    return (
                                        <th
                                            key={key}
                                            className="px-5 py-3 border-b-2 border-gray-800/50 bg-slate-600 text-left text-xs font-semibold text-gray-300/65 uppercase tracking-wider"
                                        >
                                            {item}
                                        </th>
                                    );
                                })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataBody &&
                            dataBody.map((item, key) => {
                                number =
                                    key !== 0 ? number + 1 : dataTable.from;
                                return (
                                    <TrBody
                                        action={action}
                                        label={[number, ...item]}
                                        key={key}
                                        Btn={[
                                            () => {
                                                onModalData({
                                                    product_id: item[0],
                                                });
                                            },
                                            () => onModalDelete(item[0]),
                                            () => onModalEdit({
                                                id: item[0],
                                                name: item[1],
                                                price: item[2],
                                                stock: item[3],
                                                description: item[4],
                                            }),
                                        ]}
                                    />
                                );
                            })}
                    </tbody>
                </table>
                <div className="flex justify-between w-full bg-slate-500">
                    <div className="px-3 py-1 flex flex-row gap-2 justify-center items-center">
                        <div>
                            <select
                                onChange={(e) => setPagination(e.target.value)}
                                name="page"
                                id="page"
                                className="px-3 py-1 rounded-md"
                            >
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <p>Items per-page</p>
                    </div>
                    <div className="px-3 py-1 bg-slate-500 flex flex-col xs:flex-row items-center xs:justify-between">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing {dataTable && dataTable.from} to{" "}
                            {dataTable && dataTable.to} of{" "}
                            {dataTable && dataTable.total} Entries
                        </span>
                        <div className="inline-flex mt-1 xs:mt-0 mb-1">
                            <button
                                className={`text-sm bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-l-lg ${
                                    dataTable && dataTable.current_page === 1
                                        ? "opacity-50 text-slate-700/80 hover:cursor-auto"
                                        : "hover:bg-gray-400"
                                }`}
                                onClick={
                                    dataTable && dataTable.current_page !== 1
                                        ? clickFirst
                                        : undefined
                                }
                            >
                                First
                            </button>
                            <button
                                className={`text-sm bg-gray-300 text-gray-800 font-semibold py-2 px-4 ${
                                    dataTable && dataTable.current_page === 1
                                        ? "opacity-50 text-slate-700/80 hover:cursor-auto"
                                        : "hover:bg-gray-400"
                                }`}
                                onClick={
                                    dataTable && dataTable.current_page !== 1
                                        ? clickPrev
                                        : undefined
                                }
                            >
                                Prev
                            </button>
                            <button
                                className={`text-sm bg-gray-300 text-gray-800 font-semibold py-2 px-4 ${
                                    dataTable &&
                                    dataTable.last_page ===
                                        dataTable.current_page
                                        ? "opacity-50 text-slate-700/80 hover:cursor-auto"
                                        : "hover:bg-gray-400"
                                }`}
                                onClick={
                                    dataTable &&
                                    dataTable.last_page !==
                                        dataTable.current_page
                                        ? clickNext
                                        : undefined
                                }
                            >
                                Next
                            </button>
                            <button
                                className={`text-sm bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-r-lg ${
                                    dataTable &&
                                    dataTable.last_page ===
                                        dataTable.current_page
                                        ? "opacity-50 text-slate-700/80 hover:cursor-auto"
                                        : "hover:bg-gray-400"
                                }`}
                                onClick={
                                    dataTable &&
                                    dataTable.last_page !==
                                        dataTable.current_page
                                        ? clickLast
                                        : undefined
                                }
                            >
                                Last
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableT;
