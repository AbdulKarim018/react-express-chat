import { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const socket = io("ws://192.168.0.109:3000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  if (!SocketContext) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return useContext(SocketContext);
};
