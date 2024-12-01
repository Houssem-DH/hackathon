import React, { useEffect, useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/Components/ui/button";
import ApplicationLogo from "./ApplicationLogo";
import Avatar from "@/Components/Avatar";

const Header = ({ user }) => {
    const [scrollActive, setScrollActive] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To track dropdown state
    const dropdownRef = useRef(null); // Ref for dropdown menu
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => setScrollActive(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Toggle Mobile Menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    // Toggle Dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <header
            className={`fixed top-0 w-full z-30 transition-all ${
                scrollActive
                    ? "shadow-lg bg-white/90 backdrop-blur-lg border-b-1 border-gray-200"
                    : "bg-white"
            }`}
        >
            <nav className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 grid grid-cols-12 items-center py-4">
                {/* Logo */}
                <div className="col-span-3 flex items-center justify-start">
                    <Link href="/">
                        <ApplicationLogo className="h-16 w-auto text-blue-700" />
                    </Link>
                </div>

                {/* Main Links (Desktop) */}
                <ul
                    className={`lg:flex col-span-6 justify-center space-x-6 text-sm font-semibold hidden ${
                        isMobileMenuOpen ? "block" : "hidden"
                    }`}
                >
                    <li>
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded-md transition duration-300 ${
                                url === "/"
                                    ? "text-blue-700 border-b-2 border-blue-700"
                                    : "text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-500"
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/hub"
                            className={`px-3 py-2 rounded-md transition duration-300 ${
                                url === "/hub"
                                    ? "text-blue-700 border-b-2 border-blue-700"
                                    : "text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-500"
                            }`}
                        >
                            Hub
                        </Link>
                    </li>
                    {user && (
                        <li>
                            <Link
                                href="/my-questions"
                                className={`px-3 py-2 rounded-md transition duration-300 ${
                                url === "/my-questions"
                                    ? "text-blue-700 border-b-2 border-blue-700"
                                    : "text-gray-600 hover:text-blue-700 hover:border-b-2 hover:border-blue-500"
                            }`}
                            >
                                My Space
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Actions (Desktop) */}
                <div className="col-span-3 flex justify-end items-center space-x-6">
                    {/* User Profile Dropdown */}
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            <Button
                                variant="ghost"
                                onClick={toggleDropdown} // Toggle dropdown
                                className="p-2 rounded-full"
                            >
                                <Avatar
                                    user={user}
                                    className="cursor-pointer"
                                />
                            </Button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                                    <Link
                                        href={route("profile.edit", {
                                            id: user.id,
                                        })}
                                        className="block px-4 py-2 text-gray-600 hover:text-blue-700 hover:bg-gray-100"
                                    >
                                        <span className="flex items-center gap-2">
                                            <Settings className="h-4 w-4" />
                                            Settings
                                        </span>
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        className="block px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-100"
                                    >
                                        <span className="flex items-center gap-2">
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href={route("login")}>
                                <Button
                                    variant="outline"
                                    className="text-blue-700 border-blue-500"
                                >
                                    Log In
                                </Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button className="bg-blue-700 text-white hover:bg-blue-600">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden col-span-1 flex justify-end items-center space-x-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        className="text-blue-700"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`${
                    isMobileMenuOpen ? "block" : "hidden"
                } lg:hidden absolute top-0 left-0 w-full bg-white py-6 space-y-4`}
            >
                <div className="flex justify-end px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        className="text-blue-700"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                <nav className="flex flex-col items-center space-y-4">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-blue-700"
                        onClick={toggleMobileMenu}
                    >
                        Home
                    </Link>
                    <Link
                        href="/services"
                        className="text-gray-600 hover:text-blue-700"
                        onClick={toggleMobileMenu}
                    >
                        Services
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-600 hover:text-blue-700"
                        onClick={toggleMobileMenu}
                    >
                        Contact
                    </Link>
                    <Link
                        href={route("login")}
                        className="text-gray-600 hover:text-blue-700"
                        onClick={toggleMobileMenu}
                    >
                        Log In
                    </Link>
                    <Link
                        href={route("register")}
                        className="text-blue-700 hover:text-blue-800"
                        onClick={toggleMobileMenu}
                    >
                        Sign Up
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
