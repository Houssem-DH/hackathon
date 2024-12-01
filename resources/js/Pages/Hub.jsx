import React from "react";
import { formatDistanceToNow } from "date-fns"; // For relative time formatting
import { Link } from "@inertiajs/react"; // Assuming Inertia.js is used for navigation
import Layout from "@/Layouts/Layout"; // Layout component
import Avatar from "@/Components/Avatar"; // Avatar component for user profile pictures
import { Eye, MessageCircle } from "lucide-react"; // Icons for views and answers

function Hub({ auth, questions }) {
    return (
        <Layout user={auth.user}>
            <div className="min-h-screen bg-gray-100 py-32">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Page Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">All Questions</h1>

                    {/* Questions List */}
                    {questions.length > 0 ? (
                        questions.map((question) => (
                            <div
                                key={question.id}
                                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                            >
                                {/* Header: User Info and Time */}
                                <div className="flex items-center space-x-4 mb-4">
                                    <Avatar
                                        user={question.user}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full border-2 border-blue-500"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {question.user.name || question.user.email}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatDistanceToNow(new Date(question.created_at), {
                                                addSuffix: true,
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Question Content */}
                                <div>
                                    <Link
                                        href={`/questions/${question.id}`}
                                        className="text-xl font-semibold text-blue-600 hover:underline"
                                    >
                                        {question.question_title}
                                    </Link>
                                    <p className="text-gray-700 mt-2">{question.question}</p>
                                    {question.picture && (
                                        <img
                                            src={`/storage/${question.picture}`}
                                            alt="Question Image"
                                            className="mt-4 w-full max-h-48 object-cover rounded-md"
                                        />
                                    )}
                                </div>

                                {/* Footer: Views and Answers */}
                                <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <Link href={route('qa',{id:question.id})}>
                                        <Eye className="w-4 h-4" />
                                        </Link>
                                        <span> View</span>
                                        
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{question.answers_count || 0} Answers</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No questions available.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Hub;
