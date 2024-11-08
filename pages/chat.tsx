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

      <div className="chat-container flex flex-col items-center justify-center min-h-screen">
        <div className="message-list w-full max-w-2xl bg-white p-4 rounded shadow-md mb-4 h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`message mb-2 ${message.sender === "AI" ? "text-left text-blue-600" : "text-right text-green-600"}`}>
              <strong>{message.sender}: </strong>
              <span>{message.content}</span>
            </div>
          ))}
        </div>
        <div className="chat-input w-full max-w-2xl flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button onClick={handleUserInput} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Send
          </button>
        </div>
        <div className="mt-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>

  );
};

export default Chat;
