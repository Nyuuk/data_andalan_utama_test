const api = (baseurl, setLoading) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    return {
        checkAuth: async () => {
            setLoading();
            try {
                const response = await fetch(`${baseurl}/apiv1/check-auth`, {
                    method: "GET",
                    headers,
                    credentials: "include",
                });
                const result = await response.json();
                return { ...result, resp: response.status };
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        login: async (data) => {
            setLoading();
            try {
                const response = await fetch(`${baseurl}/apiv1/login`, {
                    method: "POST",
                    headers,
                    // credentials: "include",
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                return { ...result, resp: response.status };
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        logout: async () => {
            setLoading();
            try {
                const response = await fetch(`${baseurl}/apiv1/logout`, {
                    method: "GET",
                    headers,
                    credentials: "include",
                });
                const result = await response.json();
                return { ...result, resp: response.status };
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        register: async (data) => {
            setLoading();
            try {
                const response = await fetch(`${baseurl}/apiv1/register`, {
                    method: "POST",
                    headers,
                    credentials: "include",
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                return { ...result, resp: response.status };
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        getTransactions: async (perPage, page, search = "") => {
            setLoading();
            try {
                const response = await fetch(
                    `${baseurl}/apiv1/transaction/${perPage}/${page}?search=${search}`,
                    {
                        method: "GET",
                        headers,
                        credentials: "include",
                    }
                );
                const result = await response.json();
                if (response.status === 200) {
                    return result;
                }
                return false;
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        getProducts: async (perPage, page, search = "") => {
            setLoading();
            try {
                const response = await fetch(
                    `${baseurl}/apiv1/product/${perPage}/${page}?search=${search}`,
                    {
                        method: "GET",
                        headers,
                        credentials: "include",
                    }
                );
                const result = await response.json();
                if (response.status === 200) {
                    return result;
                }
                return false;
            } catch (error) {
                console.error("Error fetching data: ", error);
                return false;
            } finally {
                setLoading();
            }
        },
        deleteProduct: async (id) => {
            setLoading();
            try {
                const response = await fetch(`${baseurl}/apiv1/product/${id}`, {
                    method: "DELETE",
                    headers,
                    credentials: "include",
                });
                const result = await response.json();
                if (response.status === 200) {
                    return [true, result];
                }
                return [false, result];
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        newTransaction: async (data) => {
            setLoading();
            try {
                const response = await fetch(`${baseurl}/apiv1/transaction`, {
                    method: "POST",
                    headers,
                    credentials: "include",
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                if (response.status === 200) {
                    return [true, result];
                }
                return [false, result];
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        editProduct: async (data) => {
            setLoading();
            try {
                const response = await fetch(
                    `${baseurl}/apiv1/product/${data.id}`,
                    {
                        method: "PUT",
                        headers,
                        credentials: "include",
                        body: JSON.stringify(data),
                    }
                );
                const result = await response.json();
                if (response.status === 200) {
                    return [true, result];
                }
                return [false, result];
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
        newProduct: async (data) => {
            setLoading();
            try {
                const response = await fetch(`${baseurl}/apiv1/product`, {
                    method: "POST",
                    headers,
                    credentials: "include",
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                if (response.status === 200) {
                    return [true, result];
                }
                return [false, result];
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading();
            }
        },
    };
};
function formatRupiah(number) {
    // Convert the number to a string and add commas for thousands separator
    const formattedNumber = number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Add 'Rp.' to the formatted number
    // return `Rp. ${formattedNumber}`;
    return `${formattedNumber}`;
}

function convertUtcToJakartaTime(utcDateString) {
    // Buat objek Date dari string UTC
    const utcDate = new Date(utcDateString);

    // Tetapkan zona waktu Asia/Jakarta pada objek Date
    const jakartaTime = utcDate.toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    return jakartaTime;
}

export default api;
export { formatRupiah, convertUtcToJakartaTime };
