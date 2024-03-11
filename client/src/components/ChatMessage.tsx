import React from "react";

interface Message {
  message: string;
  sender: string;
}

interface ChatMessageProps {
  socketId: string | undefined;
  msg: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ socketId, msg }) => {
  const { sender, message: text } = msg;
  console.log(socketId);

  return (
    <div className={`mb-2 ${sender === socketId ? "text-right" : "text-left"}`}>
      <div className="flex flex-col">
        {sender !== socketId ? (
          <p className="font-semibold">{sender}</p>
        ) : (
          <p className="font-bold">You</p>
        )}
        <div
          className={`inline-block rounded-lg p-2 ${
            sender === socketId
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
