import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { PlusCircle, Upload } from "lucide-react";
import Layout from "@/Layouts/Layout";

const QuestionsPage = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        question_title: "",
        question: "",
        picture: null, // Store only a single file
    });

    const [filePreview, setFilePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            setData("picture", file);

            // Generate a preview for the single file
            setFilePreview({
                name: file.name,
                url: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("question.insert"), {
            onSuccess: () => {
                alert("Your question has been submitted!");
                setData({
                    question_title: "",
                    question: "",
                    picture: null,
                }); // Reset form data
                setFilePreview(null); // Clear the preview
            },
        });
    };

    return (
        <Layout user={auth.user}>
            <div className="max-w-2xl mx-auto py-32 px-6">
                <h2 className="text-2xl font-semibold text-center mb-8 text-gray-900 animate__animated animate__fadeIn">
                    Post an Issue
                </h2>

                <div className="bg-white shadow-md rounded-lg p-8 transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Create a New Issue</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Question Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Title
                            </label>
                            <Input
                                type="text"
                                placeholder="What's your issue about?"
                                value={data.question_title}
                                onChange={(e) =>
                                    setData("question_title", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            />
                            {errors.question_title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.question_title}
                                </p>
                            )}
                        </div>

                        {/* Question Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Issue Details
                            </label>
                            <Textarea
                                placeholder="Describe your issue in detail..."
                                value={data.question}
                                onChange={(e) =>
                                    setData("question", e.target.value)
                                }
                                rows={5}
                                className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                required
                            />
                            {errors.question && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.question}
                                </p>
                            )}
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Attach a File (optional)
                            </label>
                            <label className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-all">
                                <Upload className="h-5 w-5 text-gray-500" />
                                <span className="text-gray-700 text-sm">Upload File</span>
                                <Input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </label>

                            {/* File Preview */}
                            {filePreview && (
                                <div className="mt-4 flex flex-col items-center">
                                    <img
                                        src={filePreview.url}
                                        alt={filePreview.name}
                                        className="w-32 h-auto object-cover border-2 border-blue-500"
                                    />
                                    <span className="text-xs mt-2 text-gray-600">
                                        {filePreview.name}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                            disabled={processing}
                        >
                            <PlusCircle className="h-5 w-5 mr-2" />
                            {processing ? "Submitting..." : "Submit Issue"}
                        </Button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default QuestionsPage;
