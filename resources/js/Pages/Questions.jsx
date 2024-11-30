import { Head, Link } from "@inertiajs/react";
import NavBar from "@/Components/NavBar";
import HeroSection from "@/Components/Sections/HeroSection";
import Layout from "@/Layouts/Layout";
export default function Questions({ auth }) {
    return (
        <>
            <Head title="Home" />

            <Layout user={auth.user}>
                <div >
                    HH
                </div>
            </Layout>
        </>
    );
}
