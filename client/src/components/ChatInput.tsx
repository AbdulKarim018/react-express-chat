import { useState } from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useSocket } from "@/contexts/socket";
import { SendHorizonal } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const ChatInput = () => {
  const [message, setMessage] = useState<string>("");
  const socket = useSocket();

  const sendMessage = () => {
    if (message.trim() === "") return;
    socket?.emit("chat:message", message);
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <form
      className="p-4 flex gap-4 items-center fixed bottom-0 w-full shadow-md"
      onSubmit={handleSubmit}
    >
      <Textarea
        className="resize-none hidden lg:block"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Input
        className="resize-none lg:hidden"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={sendMessage}
              className="rounded-full grid place-items-center size-12"
            >
              <SendHorizonal />
            </Button>
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
