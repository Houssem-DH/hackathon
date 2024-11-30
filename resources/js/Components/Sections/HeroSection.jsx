import React from "react";
import { Button } from "@/Components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-yellow-400 text-white">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side: Hero Content */}
                <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                        Simplify Your Postal Experience with{" "}
                        <span className="text-yellow-300">Algerie Post</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90">
                        Experience seamless postal and financial services. Track parcels, 
                        manage payments, and access innovative solutions tailored for you.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href='/questions' className="bg-yellow-300 text-green-900 hover:bg-yellow-400 px-6 py-3 rounded-lg font-semibold">
                            Track Your Parcel
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Button
                            variant="outline"
                            className="text-white border-white hover:bg-white hover:text-green-900 px-6 py-3 rounded-lg"
                        >
                            Explore Services
                        </Button>
                    </div>
                </div>

                {/* Right Side: Hero Image */}
                <div className="relative">
                    <img
                        src="/images/algerie-post-hero.png" // Replace with your actual image path
                        alt="Algerie Post"
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
