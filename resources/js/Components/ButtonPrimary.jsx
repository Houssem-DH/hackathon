import React from "react";

const ButtonPrimary = ({ children, addClass }) => {
    return (
        <button
            className={
                "py-3 lg:py-4 px-12 lg:px-16 text-main font-semibold rounded-lg  hover:shadow-main-md transition-all outline-none " +
                addClass
            }
        >
            {children}
        </button>
    );
};

export default ButtonPrimary;
