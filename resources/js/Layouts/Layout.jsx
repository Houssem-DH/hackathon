import React from "react";
import NavBar from "@/Components/NavBar";
import ChatBot from "@/Components/ChatBot";

const Layout = ({ user, children }) => {
    return (
        <div>
            <NavBar user={user} />
            <div className="w-full bg-slate-50">{children}</div>
            <ChatBot /> {/* ChatBot Component */}
        </div>
    );
};

export default Layout;
