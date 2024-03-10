import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Input } from "./ui/input";
import { useSocket } from "@/contexts/socket";

const ChatInput = () => {
  const [message, setMessage] = useState<string>("");
  const socket = useSocket();

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket?.emit("chat:message", message);
    setMessage("");
  };
  return (
    <form
      className="p-4 flex gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <Input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={sendMessage}>Send</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send Message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
};

export default ChatInput;
