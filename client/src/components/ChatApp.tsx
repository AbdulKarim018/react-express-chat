import React, { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import StatusBar from "./StatusBar";
import { useSocket } from "@/contexts/socket";

interface Message {
  message: string;
  sender: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
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

    socket?.on("chat:new-connection", (msg: string[]) => {
      setUsers(msg);
    });

    socket?.on("chat:new-disconnection", (msg) => {
      setUsers(msg);
    });

    return () => {
      socket?.off("chat:message");
      socket?.off("chat:new-connection");
      socket?.off("chat:new-disconnection");
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom of the chat area when messages change
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-300 sticky top-0">
        <StatusBar users={users} />
      </div>
      <div
        className="w-full h-dvh flex flex-col overflow-y-auto"
        ref={chatAreaRef}
      >
        <div className="flex-1 p-4 bg-gray-200">
          {messages.map((msg, index) => (
            <ChatMessage key={index} socketId={socket?.id} msg={msg} />
          ))}
          <div className="h-[13vh]"></div>
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatApp;
