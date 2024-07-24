import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000/'); // Ensure this matches the server path
    setSocket(newSocket);

    // newSocket.on('connect', () => {
    //   console.log('Connected to server');
    // });

    // newSocket.on('connect_error', (error) => {
    //   console.error('Connection Error:', error);
    // });

    // newSocket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });

    return () => {
      newSocket.close();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
