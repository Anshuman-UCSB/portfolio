import { io } from "socket.io-client";
import Board from "./components/Board";
import { useState } from "react";

const port = import.meta.env.MODE === "development" ? ":5000" : "";

const socket = io(`${port}/api/chess/socket`, {
  transports: ["websocket", "polling"],
});

function Chess() {
  const [color, setColor] = useState<"white" | "black" | undefined>();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-brown-500">
      <div className="w-[80vh] h-[80vh]">
        <Board socket={socket} />
      </div>
    </div>
  );
}

export default Chess;