import { io } from "socket.io-client";
import Board from "./components/Board";

const socket = io(":5000/api/chess/socket", {
  transports: ["websocket", "polling"],
});

function Chess() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <div className="w-[80vh] h-[80vh]">
        <Board socket={socket} />
      </div>
    </div>
  );
}

export default Chess;