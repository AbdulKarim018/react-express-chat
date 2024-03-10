import React from "react";
import { useSocket } from "@/contexts/socket";

interface Message {
  message: string;
  sender: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { sender, message: text } = message;
  const socket = useSocket();
  console.log(socket?.id);

  return (
    <div
      className={`mb-2 ${sender === socket?.id ? "text-right" : "text-left"}`}
    >
      <div className="flex flex-col">
        {sender !== socket?.id ? (
          <p className="font-semibold">{sender}</p>
        ) : (
          <p className="font-bold">You</p>
        )}
        <div
          className={`inline-block rounded-lg p-2 ${
            sender === socket?.id
              ? "bg-blue-200 text-blue-800"
              : "bg-white text-gray-800"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
