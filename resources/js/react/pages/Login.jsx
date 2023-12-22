// import styles from './login.module.css';
import { useState } from "react";
import { InputForm } from "../components/Input";
import { Link } from "react-router-dom";
import api from "../api";
import { Alert } from "../components/Modal";

export default function Login() {
    const API = api("http://localhost:8001", () => {});
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [alert, setAlert] = useState({
        isOpen: true,
        content: "",
        type: "red",
    });

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Tambahkan kode atau fungsi yang ingin dijalankan saat Enter ditekan
            onClickLogin();
        }
    };

    const onChangeUsername = (username) => {
        setData({
            ...data,
            username: username,
        });
    };

    const onChangePassword = (password) => {
        setData({
            ...data,
            password: password,
        });
    };

    const showAlert = (content, type = "red", reload = false) => {
        setAlert({
            isOpen: false,
            content: content,
            type: type,
        });

        setTimeout(() => {
            setAlert({ isOpen: true, content: "" })
            if (reload) window.location.reload()
    }, 1000);
    };

    const onClickLogin = () => {
        // validate
        if (!data.username) {
            showAlert("Please fill username fields", "red");
            return
        }
        if (!data.password) {
            showAlert("Please fill password fields", "red");
            return
        }
        API.login(data).then((res) => {
            if (res.resp !== 200) {
                showAlert(res.message, "red");
            } else {
                showAlert("Login Successfully", "green", true);
            }
        })
    }

    return (
        <div className="w-full h-svh bg-slate-700 relative">
            <div className="absolute top-[15%] left-1/2 translate-x-[-50%] w-[25%] h-auto bg-slate-900/80 rounded-xl flex flex-col gap-5 justify-center items-center">
                <div
                    className={
                        "px-2 flex justify-center items-center h-[70px] rounded-b-[20px] bg-slate-700"
                    }
                >
                    <span className="text-[30px] font-mono text-slate-200/65">
                        Login
                    </span>
                </div>

                <InputForm
                    id="username"
                    label="Username"
                    type="text"
                    required={true}
                    onChange={onChangeUsername}
                    onKeyPress={handleKeyPress}
                />

                <InputForm
                    id="password"
                    label="Password"
                    type="password"
                    required={true}
                    onChange={onChangePassword}
                    onKeyPress={handleKeyPress}
                />

                <div className="mt-2 w-[85%] relative flex justify-center items-center text-slate-200/65">
                    <button
                        onClick={onClickLogin}
                        className="w-full rounded-xl h-10 bg-slate-400 text-slate-900/75 font-mono hover:bg-gray-900/75 hover:border-2 hover:border-slate-700 hover:text-slate-200/65"
                    >
                        Login
                    </button>
                </div>
                <div className="mb-8 w-[85%] flex justify-center items-center text-slate-200/65">
                    <Link
                        className="w-full items-center flex justify-center rounded-xl h-10 hover:bg-slate-700/50 hover:text-slate-200/75 hover:border-0 font-mono bg-transparent border-2 border-slate-700/75 text-slate-200/65"
                        to="/register"
                    >
                        Register
                    </Link>
                </div>
            </div>
            <div className="hidden"></div>
            <Alert
                disabled={alert.isOpen}
                content={alert.content}
                type={alert.type}
            />
        </div>
    );
}
