import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { PlusCircle, Upload } from "lucide-react";
import Layout from "../Layouts/QuestionLayout";

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
            <h2 className="text-2xl font-semibold mb-6">Ask Your Question</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Create a Question</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Question Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <Input
                                type="text"
                                placeholder="What's your question about?"
                                value={data.question_title}
                                onChange={(e) => setData("question_title", e.target.value)}
                                required
                            />
                            {errors.question_title && <p className="text-red-500 text-sm">{errors.question_title}</p>}
                        </div>

                        {/* Question Content */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Question</label>
                            <Textarea
                                placeholder="Provide more details about your question..."
                                value={data.question}
                                onChange={(e) => setData("question", e.target.value)}
                                rows={6}
                                required
                            />
                            {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}
                        </div>

                        {/* File Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Attach a File (optional)</label>
                            <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-100">
                                <Upload className="h-5 w-5 text-gray-500" />
                                <span className="text-gray-700">Upload File</span>
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
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <span className="text-xs mt-1 text-gray-600">{filePreview.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={processing}>
                            <PlusCircle className="h-5 w-5 mr-2" />
                            {processing ? "Submitting..." : "Submit Question"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default QuestionsPage;
