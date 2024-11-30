import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import NavBar from "@/Components/NavBar";

export default function Layout({ children, user }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <NavBar user={user} />

            <div >
                {children}
            </div>
        </div>
    );
}
