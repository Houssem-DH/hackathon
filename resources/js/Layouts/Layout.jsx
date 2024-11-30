import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/Components/NavBar";

export default function Layout({ children, user }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 relative">
            <NavBar user={user} />

            <div className="w-full">{children}</div>

            {/* Animated Chatbot Icon */}
            <motion.button
                onClick={toggleChat}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:outline-none"
            >
                💬
            </motion.button>

            {/* Chat Dialog */}
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
                            <p className="text-gray-700">
                                Hi! I’m your assistant. How can I help you today? 😊
                            </p>
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
