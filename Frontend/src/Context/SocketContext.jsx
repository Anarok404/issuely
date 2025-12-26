import React,{ createContext, useContext, useEffect } from "react";
import { socket } from "../Socket"
import useAuth from "../Components/AuthContext/AuthContextProvider";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const{user} = useAuth();
  const userId = user?._id || 1;
  useEffect(() => {
    if (userId) {
      socket.connect();

      socket.emit("connection", userId); // optional (presence)
    }

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default function useSocket (){ 
  return useContext(SocketContext); 
} 
