import { Head, Link } from "@inertiajs/react";
import NavBar from "@/Components/NavBar";
import HeroSection from "@/Components/Sections/HeroSection";
import Layout from "@/Layouts/Layout";
export default function Home({ auth }) {
    return (
        <>
            <Head title="Home" />

            <Layout user={auth.user}>
            <HeroSection />
            </Layout>
        </>
    );
}
