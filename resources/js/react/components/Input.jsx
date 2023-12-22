import { useState } from "react";

const InputForm = ({ onChange, type, id, required, label, onKeyPress }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [value, setValue] = useState("");
    return (
        <div className="w-[85%] relative flex justify-center items-center text-slate-200/65">
            <input
                className="w-full rounded-xl h-12 bg-transparent border-4 border-slate-700 px-2"
                type={type}
                id={id}
                required={required}
                onKeyDown={onKeyPress}
                onChange={(e) => {
                    onChange(e.target.value);
                    setValue(e.target.value);
                }}
                onFocus={() => {
                    if (!value) {
                        setIsInputFocused(!isInputFocused);
                    }
                }}
                onBlur={() => {
                    if (!value) {
                        setIsInputFocused(!isInputFocused);
                    }
                }}
            />
            <label
                className={
                    isInputFocused
                        ? `absolute top-[-15px] left-[30px] ${
                              !value
                                  ? "bg-slate-100 text-gray-800/60"
                                  : "bg-slate-700 text-gray-200/55"
                          } px-2 rounded-xl`
                        : `absolute`
                }
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};

const Search = ({ value, onChange, onSubmit }) => {
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Tambahkan kode atau fungsi yang ingin dijalankan saat Enter ditekan
            onSubmit();
        }
    };

    return (
        <div className="w-[15rem] ml-9 relative flex justify-center items-center text-slate-800/65 text-sm">
            <input
                className="w-full h-[36px] rounded-xl bg-slate-300 border-2 border-gray-800/50 focus:border-blue-500 px-2 outline-none"
                type="text"
                id="search"
                value={value}
                onKeyUp={handleKeyPress}
                onChange={(e) => onChange(e.target.value)}
                required
            />
            <label className="absolute right-[8px] px-2" htmlFor="search">
                <svg
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                            stroke="#000000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>{" "}
                    </g>
                </svg>
            </label>
        </div>
    );
};

export { InputForm, Search };
