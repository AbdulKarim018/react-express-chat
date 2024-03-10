import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";
import { useSocket } from "@/contexts/socket";

interface Message {
  message: string;
  sender: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>(["User 1", "User 2", "User 3"]);
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocket();

  const sendMessage = (message: string, sender: string) => {
    const newMessage: Message = { message, sender };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    socket?.on("chat:message", (msg: Message) => {
      sendMessage(msg.message, msg.sender);
    });

    return () => {
      socket?.off("chat:message");
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom of the chat area when messages change
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-dvh">
      {/* <div className="w-1/4 bg-gray-200 p-4">
        <UserList users={users} />
      </div> */}
      {/* <div className="w-3/4 bg-gray-100 flex flex-col"> */}
      <div className="w-full bg-gray-100 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto" ref={chatAreaRef}>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatApp;
