import { InputForm } from "../components/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { Alert } from "../components/Modal";

export default function Register() {
    const API = api("http://localhost:8001", () => {});

    const [alert, setAlert] = useState({
        isOpen: true,
        content: "",
        type: "red",
    });

    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
        password_confirmation: "",
    });

    const showAlert = (content, type = "red", reload = false) => {
        setAlert({
            isOpen: false,
            content: content,
            type: type,
        });

        setTimeout(() => {
            setAlert({ isOpen: true, content: "" });
            window.location.href = "/login";
        }, 1500);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Tambahkan kode atau fungsi yang ingin dijalankan saat Enter ditekan
            onSubmit();
        }
    };

    const onSubmit = () => {
        // validation
        if (data.name === "") {
            showAlert("Name is required", "red");
            return;
        }
        if (data.username === "") {
            showAlert("Username is required", "red");
            return;
        }
        if (data.password === "") {
            showAlert("Password is required", "red");
            return;
        }
        if (data.password_confirmation === "") {
            showAlert("Password Confirmation is required", "red");
            return;
        }
        if (data.password !== data.password_confirmation) {
            showAlert("Password doesn't match", "red");
            return;
        }
        if (data.password === data.password_confirmation) {
            API.register(data).then((res) => {
                if (res.resp !== 200) {
                    if (res.message.toLowerCase().includes("constraint")) {
                        showAlert("Username already exists", "red");
                        return;
                    }
                    showAlert(res.message, "red");
                } else {
                    showAlert("Register Successfully", "green", true);
                }
            });
        }
    };

    return (
        <div className="w-full h-svh bg-slate-700 relative">
            <div className="absolute top-[15%] left-1/2 translate-x-[-50%] w-[25%] h-auto bg-slate-900/80 rounded-xl flex flex-col gap-5 justify-center items-center">
                <div
                    className={
                        "px-2 flex justify-center items-center h-[70px] rounded-b-[20px] bg-slate-700"
                    }
                >
                    <span className="text-[30px] font-mono text-slate-200/65">
                        Register
                    </span>
                </div>

                <InputForm
                    id="name"
                    label="Name"
                    type="text"
                    required={true}
                    onChange={(e) => setData({ ...data, name: e })}
                    onKeyPress={handleKeyPress}
                />
                <InputForm
                    id="username"
                    label="Username"
                    type="text"
                    required={true}
                    onChange={(e) => setData({ ...data, username: e })}
                    onKeyPress={handleKeyPress}
                />

                <InputForm
                    id="password"
                    label="Password"
                    type="password"
                    required={true}
                    onChange={(e) => setData({ ...data, password: e })}
                    onKeyPress={handleKeyPress}
                />
                <InputForm
                    id="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    required={true}
                    onChange={(e) =>
                        setData({ ...data, password_confirmation: e })
                    }
                    onKeyPress={handleKeyPress}
                />

                <div className="mt-2 w-[85%] relative flex justify-center items-center text-slate-200/65">
                    <button
                        className="w-full rounded-xl h-10 bg-slate-400 text-slate-900/75 font-mono hover:bg-gray-900/75 hover:border-2 hover:border-slate-700 hover:text-slate-200/65"
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
                <div className="mb-8 w-[85%] flex justify-center items-center text-slate-200/65">
                    <Link
                        className="w-full items-center flex justify-center rounded-xl h-10 hover:bg-slate-700/50 hover:text-slate-200/75 hover:border-0 font-mono bg-transparent border-2 border-slate-700/75 text-slate-200/65"
                        to="/login"
                    >
                        Login
                    </Link>
                </div>
            </div>
            <Alert
                disabled={alert.isOpen}
                content={alert.content}
                type={alert.type}
            />
        </div>
    );
}
