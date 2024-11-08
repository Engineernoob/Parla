// parla-frontend/pages/chat.tsx
"use client"

import { useEffect, useState } from "react";
import useSocket from "../utils/useSocket";
import axios from "axios";
import Link from "next/link";

interface Message {
  sender: string;
  content: string;
}

const Chat = () => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages from server
    socket.on("receive_message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!socket || inputValue.trim() === "") return;

    // Emit message to server
    const newMessage: Message = { sender: "User", content: inputValue };
    socket.emit("send_message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
  };

  const handleAIResponse = async (message: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/assistant", {
        message,
      });
      const aiMessage: Message = { sender: "AI", content: response.data.response };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", (error as Error).message);
    }
  };
  
  const handleUserInput = () => {
    handleSendMessage();
    handleAIResponse(inputValue);
  };

  return (

      <div className="chat-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="chat-room w-full max-w-4xl bg-white rounded shadow-md flex flex-col h-[80vh]">
          {/* Header */}
          <div className="chat-header bg-blue-600 text-white p-4 rounded-t flex justify-between items-center">
            <h2 className="text-2xl font-bold">Parla Chat Room</h2>
            <Link href="/">
              <span className="text-sm bg-white text-blue-600 py-1 px-3 rounded hover:bg-gray-200">Back to Home</span>
            </Link>
          </div>

          {/* Messages Area */}
          <div className="message-list flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message mb-4 flex ${message.sender === "AI" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.sender === "AI" ? "bg-gray-200 text-left" : "bg-blue-500 text-white text-right"
                  }`}
                >
                  <strong className="block text-sm mb-1">
                    {message.sender === "AI" ? "Parla AI" : "You"}
                  </strong>
                  <span>{message.content}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="chat-input flex items-center p-4 bg-gray-100 rounded-b">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleUserInput}
              className="ml-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>

  );
};

export default Chat;