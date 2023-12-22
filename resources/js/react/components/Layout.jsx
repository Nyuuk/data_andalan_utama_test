/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Navbar, { NavbarUp } from "./Navbar";


export default function Layout({ children, ...props }) {

    return (
        <div className="w-full h-screen bg-slate-700 flex flex-row">
            <Navbar />
            <div className="flex flex-col w-full bg-slate-700">
                <NavbarUp {...props} />
                <div className="h-screen bg-slate-900/85 rounded-2xl rounded-br-none px-8 py-3 overflow-y-auto overflow-hidden">{children}</div>
            </div>
        </div>
    );
}
