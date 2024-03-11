import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { useSocket } from "@/contexts/socket";

interface StatusBarProps {
  users: string[];
}

const StatusBar: React.FC<StatusBarProps> = ({ users }) => {
  const [isConnected, IsConnected] = useState(false);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        IsConnected(true);
      });
      socket.on("disconnect", () => {
        IsConnected(false);
      });
    }
    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
    };
  }, [socket]);

  return (
    <div className="p-4 flex gap-4 items-center justify-center">
      <h2 className="text-lg font-semibold">
        Status: {isConnected ? "Connected" : "Offline (Retrying...)"}
      </h2>
      {users.length > 0 && (
        <Sheet>
          <SheetTrigger asChild>
            <Button>{users.length} Users Online</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <p className="font-bold text-2xl py-4">Users Online</p>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {users.map((user, index) => (
                <div className="space-x-2" key={user}>
                  <Badge key={index}>{index + 1}</Badge>
                  <span>{user}</span>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default StatusBar;
