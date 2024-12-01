import React from "react";
import { Link } from "@inertiajs/react";
import { Image } from "lucide-react"; // Icon for questions without images
import Layout from "@/Layouts/Layout";

const QuestionsPage = ({ auth, questions }) => {
    return (
        <Layout user={auth.user}>
            <div className="container mx-auto px-12 py-32">
                {/* Page Header */}
                <h1 className="text-4xl font-semibold text-center text-gray-900 mb-12">
                    Your Questions
                </h1>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <h3 className="text-xl font-semibold text-gray-800 truncate">
                                        {question.question_title}
                                    </h3>
                                </div>

                                {/* Card Content */}
                                <div className="px-6 py-8">
                                    {/* Question Content */}
                                    <p className="text-gray-700 mb-6 line-clamp-3 text-sm">
                                        {question.question}
                                    </p>

                                    {/* Picture Preview */}
                                    {question.picture ? (
                                        <img
                                            src={`storage/${question.picture}`}
                                            alt={question.question_title}
                                            className="w-full h-48 object-cover rounded-lg mb-6"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg mb-6">
                                            <Image className="h-20 w-20 text-gray-400" />
                                        </div>
                                    )}

                                    {/* View Button */}
                                    <Link href={route("qa", { id: question.id })}>
                                        <button
                                            className="w-full py-3 text-sm font-medium text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md transition-colors duration-300 ease-in-out"
                                        >
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <p className="text-xl text-gray-500">
                                No questions found. Start by asking one!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default QuestionsPage;
