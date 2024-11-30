import React from "react";
import Avatar from "@/Components/Avatar";
import { Link } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

const navbarLinks = [
    { name: "Home", href: "/" },
    { name: "My Questions", href: "/questions" },
    { name: "Settings", href: "/settings" },
];

function Header({ user }) {
    return (
        <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
            {/* Title */}
            <h1 className="text-xl font-bold">Questions Page</h1>

            {/* Navbar Links */}
            <nav className="hidden md:flex space-x-6">
                {navbarLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* User Dropdown */}
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
        </header>
    );
}

export default Header;
