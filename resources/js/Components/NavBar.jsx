import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, Search, User, LogOut } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import ApplicationLogo from "./ApplicationLogo";
import Avatar from "@/Components/Avatar";

const Header = ({ user }) => {
    const [scrollActive, setScrollActive] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => setScrollActive(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-30 transition-all ${
                scrollActive ? "shadow-md bg-white/90 backdrop-blur-lg" : "bg-white"
            }`}
        >
            <nav className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 grid grid-cols-12 items-center py-3">
                {/* Logo */}
                <div className="col-span-3 flex items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-8 w-auto text-green-700" />
                    </Link>
                </div>

                {/* Main Links */}
                <ul className="hidden lg:flex col-span-6 justify-center space-x-6 text-sm font-semibold">
                    <li>
                        <Link
                            href="/"
                            className={`px-3 py-2 rounded-md transition ${
                                url === "/"
                                    ? "text-green-700 border-b-2 border-green-700"
                                    : "text-gray-600 hover:text-green-700 hover:border-b-2 hover:border-green-500"
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/services"
                            className="px-3 py-2 rounded-md text-gray-600 hover:text-green-700 hover:border-b-2 hover:border-green-500 transition"
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="px-3 py-2 rounded-md text-gray-600 hover:text-green-700 hover:border-b-2 hover:border-green-500 transition"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>

                {/* Actions */}
                <div className="col-span-3 flex justify-end items-center space-x-4">
                    {/* Search */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Search className="h-5 w-5 text-green-700" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Search</DialogTitle>
                            </DialogHeader>
                            <div className="relative mt-4">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="pl-10 w-full"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* User Menu */}
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar user={user} className="cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                    <Link href={route("profile.edit", { id: user.id })}>
                                        <span className="flex items-center gap-2 text-gray-600 hover:text-green-700">
                                            <User className="h-4 w-4" />
                                            Profile
                                        </span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={route("logout")} method="post">
                                        <span className="flex items-center gap-2 text-gray-600 hover:text-red-600">
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link href={route("login")}>
                                <Button variant="outline" className="text-green-700 border-green-500">
                                    Log In
                                </Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button className="bg-green-700 text-white hover:bg-green-600">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6 text-green-700" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-6 bg-gray-50">
                            <nav className="flex flex-col space-y-4">
                                <Link href="/" className="text-gray-600 hover:text-green-700">
                                    Home
                                </Link>
                                <Link href="/services" className="text-gray-600 hover:text-green-700">
                                    Services
                                </Link>
                                <Link href="/contact" className="text-gray-600 hover:text-green-700">
                                    Contact
                                </Link>
                                <Link href={route("login")} className="text-gray-600 hover:text-green-700">
                                    Log In
                                </Link>
                                <Link href={route("register")} className="text-green-700 hover:text-green-800">
                                    Sign Up
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
};

export default Header;
