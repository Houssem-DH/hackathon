import React from "react";
import { Button } from "@/Components/ui/button";
import { MessageCircle, Search } from "lucide-react";
import { Link } from "@inertiajs/react";
import HeroImg from '/public/Assets/hero.svg';

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: 'url(/images/community-bg.png)' }}></div>

            <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full z-10">
                {/* Left Side: Hero Content */}
                <div className="space-y-6 text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight transition duration-500 ease-in-out transform hover:scale-105">
                        Join the Community Engagement Hub{" "}
                        <span className="text-yellow-300">Solve Issues Together</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white/90 opacity-90 transition-opacity duration-300 ease-in-out hover:opacity-100">
                        Share your questions, provide solutions, and connect with others in a space built for collaboration and learning.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Link
                            href="/questions"
                            className="bg-yellow-300 text-green-900 hover:bg-yellow-400 px-6 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 transform hover:scale-105"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Post Your Issue
                        </Link>
                        <Link
                            href="/hub"
                            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 py-3 rounded-lg font-semibold flex items-center transition-all duration-300 transform hover:scale-105"
                        >
                            <Search className="mr-2 h-5 w-5" />
                            Explore Hub
                        </Link>
                    </div>
                </div>

                {/* Right Side: Hero Image */}
                <div className="relative flex justify-center lg:justify-end">
                    <img
                        src={HeroImg} // Replace with your actual image path
                        alt="Community Engagement"
                        className="rounded-lg w-[420px] h-auto object-cover transition-all duration-500 transform hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
