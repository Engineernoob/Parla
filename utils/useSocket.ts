// parla-frontend/utils/useSocket.ts

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:5000"); // Update with backend URL
    setSocket(newSocket);

    // Clean up the socket connection when component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};

export default useSocket;
