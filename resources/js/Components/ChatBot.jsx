import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineSend } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import BotLogo from "/public/Assets/BotLogo.png";

const ChatBot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [inputData, setInputData] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null); // Ref for the end of the messages

    const toggleChat = () => setIsChatOpen((prev) => !prev);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3500/ws/predict");

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
            setConnected(true);
        };

        socket.onmessage = (event) => {
            setMessages((prev) => [
                ...prev,
                { sender: "AI", text: event.data },
            ]);
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

    useEffect(() => {
        // Add a welcome message when the chat opens
        if (isChatOpen) {
            const welcomeMessage = {
                sender: "Bot",
                text: "Hello! How can I assist you today?",
            };
            setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
        }
    }, [isChatOpen]);

    useEffect(() => {
        // Scroll to the last message whenever the messages array changes
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (connected && socketRef.current && inputData.trim()) {
            setMessages((prev) => [
                ...prev,
                { sender: "User", text: inputData },
            ]);
            setLoading(true);
            socketRef.current.send(inputData);
            setInputData("");
        } else {
            console.error("WebSocket is not connected or message is empty.");
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 p-4 rounded-full focus:outline-none z-50"
            >
                <img
                    src={BotLogo}
                    alt="Chat Icon"
                    className="w-16 h-16 object-cover rounded-full"
                />
            </motion.button>

            {/* Chatbox */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 right-6 w-[350px] max-h-[500px] bg-white shadow-xl rounded-lg flex flex-col overflow-hidden border border-gray-200 z-50"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                                <span className="text-[#FDE047] text-xl">
                                    Askiny
                                </span>
                                Bot
                            </h2>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:text-gray-300 focus:outline-none"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-3 max-w-[75%] p-3 rounded-lg text-sm ${
                                        message.sender === "User"
                                            ? "bg-blue-100 ml-auto text-right"
                                            : "bg-gray-100 mr-auto text-left"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            ))}
                            {loading && (
                                <div className="text-gray-500 text-center">
                                    Typing...
                                </div>
                            )}
                            {/* Dummy div for scrolling */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer/Input Area */}
                        <form
                            onSubmit={handleSendMessage}
                            className="flex items-center p-3 border-t bg-gray-50"
                        >
                            <input
                                type="text"
                                value={inputData}
                                onChange={(e) => setInputData(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="ml-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow focus:outline-none transition"
                            >
                                <AiOutlineSend size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
