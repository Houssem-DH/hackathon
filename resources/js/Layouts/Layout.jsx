import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/Components/NavBar";

const AIWebSocketChatbot = ({ user }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [inputData, setInputData] = useState(""); // State for text input
    const [messages, setMessages] = useState([]); // State for chat messages
    const [loading, setLoading] = useState(false); // Loading state
    const [connected, setConnected] = useState(false); // Connection status
    const socketRef = useRef(null); // Ref to store the WebSocket instance

    const toggleChat = () => setIsChatOpen((prev) => !prev);

    useEffect(() => {
        const socket = new WebSocket("ws://192.168.1.14:8000/ws/predict");

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
            setConnected(true);
        };

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, { sender: "AI", text: event.data }]);
            setLoading(false);
        };

        socket.onclose = () => {
            console.log("Disconnected from WebSocket server");
            setConnected(false);
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            setLoading(false);
        };

        socketRef.current = socket;

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (connected && socketRef.current && inputData.trim()) {
            setMessages((prev) => [...prev, { sender: "User", text: inputData }]);
            setLoading(true);
            socketRef.current.send(inputData);
            setInputData(""); // Clear input field
        } else {
            console.error("WebSocket is not connected or message is empty.");
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 relative">
            <NavBar user={user} />
            <div className="w-full">{/* Add main content here if necessary */}</div>

            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none"
            >
                💬
            </motion.button>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 right-4 bg-white w-80 max-h-96 shadow-2xl rounded-lg overflow-hidden flex flex-col border border-gray-300"
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Chatbot</h2>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:text-gray-200 focus:outline-none"
                            >
                                ✖️
                            </button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 p-2 rounded-lg ${
                                        message.sender === "User"
                                            ? "bg-blue-100 text-right"
                                            : "bg-gray-100 text-left"
                                    }`}
                                >
                                    <p className="text-gray-800">{message.text}</p>
                                </div>
                            ))}
                            {loading && (
                                <div className="text-gray-500 text-center">Typing...</div>
                            )}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
                            <input
                                type="text"
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                placeholder="Type your message..."
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIWebSocketChatbot;
