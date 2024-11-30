import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Image } from "lucide-react"; // Icon for questions without images
import Layout from "../Layouts/QuestionLayout";
import { Link, usePage } from "@inertiajs/react";

const QuestionsPage = ({ auth, questions }) => {
    return (
        <Layout user={auth.user}>
            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Your Questions
                </h1>

                {/* Questions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {questions.length > 0 ? (
                        questions.map((question, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Card Header */}
                                <CardHeader className="flex items-center justify-between">
                                    <CardTitle className="text-xl font-semibold text-gray-800 truncate">
                                        {question.question_title}
                                    </CardTitle>
                                </CardHeader>

                                {/* Card Content */}
                                <CardContent>
                                    {/* Question Content */}
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {question.question}
                                    </p>

                                    {/* Picture Preview */}
                                    {question.picture ? (
                                        <img
                                            src={`storage/${question.picture}`}
                                            alt={question.question_title}
                                            className="w-full h-40 object-cover rounded-lg mb-4"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-40 bg-gray-100 rounded-lg mb-4">
                                            <Image className="h-16 w-16 text-gray-400" />
                                        </div>
                                    )}

                                    {/* View Button */}
                                    <Link
                                        href={route("qa", { id: question.id })}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            View Details
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="col-span-full text-center">
                            <p className="text-lg text-gray-500">
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
