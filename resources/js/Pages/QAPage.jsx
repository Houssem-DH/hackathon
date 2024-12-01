import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import Layout from "@/Layouts/Layout";
import { Avatar } from "@/Components/ui/avatar"; // Import Avatar component
import { useEffect, useRef } from "react"; // Add hooks for WebSocket

export default function Home({ auth, question, answers }) {
    const { data, setData, post, processing, reset } = useForm({
        answer: "",
        picture: null, // Add picture field to the form data
    });

    // WebSocket Ref
    const socketRef = useRef(null);

    // Establish WebSocket connection
    useEffect(() => {
        const socket = new WebSocket("ws://127.0.0.1:3600/ws/predict"); // Replace with your server URL
        socket.onopen = () => {
            console.log("WebSocket connected for AI model");
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log("AI Response:", response);
            // Handle AI response if needed
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        socketRef.current = socket;

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("answer", data.answer);
        formData.append("question_id", data.question_id);
        if (data.picture) {
            formData.append("picture", data.picture);
        }

        post(route("answer.insert", { id: question.id }), {
            data: formData,
            onSuccess: () => {
                // Send question and answer to the AI model via WebSocket
                if (
                    socketRef.current &&
                    socketRef.current.readyState === WebSocket.OPEN
                ) {
                    const payload = `${question.question},"${data.answer}"`;
                    socketRef.current.send(payload);
                }

                alert("Answer submitted successfully!");
                reset();
            },
        });
    };

    const handleFileChange = (e) => {
        setData("picture", e.target.files[0]); // Update the picture field with selected file
    };

    return (
        <>
            <Head title="Home" />
            <Layout user={auth.user}>
                <div className="container mx-auto px-6 py-10">
                    {/* Question Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                        <h1 className="text-3xl font-bold mb-4 text-gray-900">
                            {question.question_title}
                        </h1>
                        <p className="text-lg text-gray-700">
                            {question.question}
                        </p>
                        {question.picture && (
                            <img
                                src={question.picture}
                                alt="Question Image"
                                className="mt-4 w-full max-h-64 object-cover rounded-md"
                            />
                        )}
                    </div>

                    {/* Answers Section */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">
                            Answers
                        </h2>

                        {/* Displaying answers */}
                        {answers.length > 0 ? (
                            <div className="space-y-4">
                                {answers.map((answer) => (
                                    <div
                                        key={answer.id}
                                        className="bg-gray-50 border border-gray-200 p-4 rounded-lg flex space-x-4"
                                    >
                                        <div className="flex-shrink-0">
                                            <Avatar
                                                src={
                                                    answer.user ||
                                                    "/default-avatar.png"
                                                }
                                                alt="User Avatar"
                                                className="w-12 h-12"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {answer.user.email}
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    Just now
                                                </span>
                                            </div>
                                            <p className="text-gray-700">
                                                {answer.answer}
                                            </p>
                                            {answer.picture && (
                                                <img
                                                    src={answer.picture}
                                                    alt="Answer Image"
                                                    className="mt-4 w-64 max-h-48 object-cover rounded-lg"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">
                                No answers yet. Be the first to answer!
                            </p>
                        )}

                        {/* Add Answer Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 bg-white shadow-md rounded-lg p-6"
                        >
                            <h3 className="text-xl font-semibold mb-4">
                                Add Your Answer
                            </h3>
                            <Textarea
                                placeholder="Write your answer..."
                                value={data.answer}
                                onChange={(e) =>
                                    setData("answer", e.target.value)
                                }
                                className="w-full mb-4"
                                rows={4}
                                required
                            />
                            {/* File Upload */}
                            <input
                                type="file"
                                name="picture"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mb-4"
                            />
                            <div className="flex justify-between items-center">
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Submitting..."
                                        : "Submit Answer"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}
