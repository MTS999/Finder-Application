import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		// console.log();
		
		// console.log("me agia");
		if (authUser) {
			
			
			const socket = io("http://localhost:3000", {
				query: {
					userId: authUser.data._id,
				},
			});
			socket.on("connect", () => {
				console.log(`Connected with socket ID: ${socket.id}`);
			});

			setSocket(socket);

		

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};