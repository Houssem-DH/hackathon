import { useEffect, useRef } from "react"; // Add hooks for WebSocket
import { formatDistanceToNow } from "date-fns"; // Import from date-fns
import { Paperclip } from "lucide-react"; // Import Lucide icons
import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import Avatar from "@/Components/Avatar";

export default function Home({ auth, question, answers }) {
    const { data, setData, post, processing, reset } = useForm({
        answer: "",
        picture: null,
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("answer", data.answer);
        formData.append("question_id", question.id);
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

                reset();
            },
        });
    };

    const handleFileChange = (e) => {
        setData("picture", e.target.files[0]);
    };

    return (
        <Layout user={auth.user}>
            <div className="flex justify-center min-h-screen bg-gray-100 py-32 px-4">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 space-y-10">
                    {/* Question Section */}
                    <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
                        <div className="flex items-center space-x-4 mb-6">
                            <Avatar
                                user={question.user}
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full border-2 border-blue-500"
                            />
                            <div>
                                <p className="text-lg font-semibold text-gray-800">
                                    {question.user.name || question.user.email}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatDistanceToNow(
                                        new Date(question.created_at),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
                                </p>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {question.question_title}
                        </h1>
                        <p className="text-gray-700 mt-4">
                            {question.question}
                        </p>
                        {question.picture && (
                            <img
                                src={`/storage/${question.picture}`}
                                alt="Question Image"
                                className="mt-6 w-full max-h-64 object-cover rounded-md"
                            />
                        )}
                    </div>

                    {/* Answers Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Answers
                        </h2>
                        {answers.length > 0 ? (
                            <div className="space-y-4">
                                {answers.map((answer) => (
                                    <div
                                        key={answer.id}
                                        className="bg-white p-4 rounded-md border border-gray-200 shadow-sm"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <Avatar
                                                user={answer.user}
                                                alt="User Avatar"
                                                className="w-10 h-10 rounded-full border-2 border-blue-500"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {answer.user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            answer.created_at
                                                        ),
                                                        {
                                                            addSuffix: true,
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-700 mt-4">
                                            {answer.answer}
                                        </p>
                                        {answer.picture && (
                                            <img
                                                src={`/storage/${answer.picture}`}
                                                alt="Answer Image"
                                                className="mt-4 w-full max-h-48 object-cover rounded-md"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">
                                No answers yet. Be the first to answer!
                            </p>
                        )}
                    </div>

                    {/* Add Answer Form */}
                    {auth?.user?.id != question.user.id && (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-gray-50 p-6 rounded-md shadow-md border border-gray-200 space-y-6"
                        >
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add Your Answer
                            </h3>
                            <textarea
                                placeholder="Write your answer..."
                                value={data.answer}
                                onChange={(e) =>
                                    setData("answer", e.target.value)
                                }
                                className="w-full p-4 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-800 hover:border-gray-400 transition"
                                rows={5}
                                required
                            />
                            <div className="flex items-center space-x-4">
                                <label className="relative cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                                    <input
                                        type="file"
                                        name="picture"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <span className="flex items-center space-x-2">
                                        <Paperclip className="w-5 h-5" />
                                        <span>Attach File</span>
                                    </span>
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition ${
                                        processing
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Submitting..."
                                        : "Submit Answer"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    );
}
