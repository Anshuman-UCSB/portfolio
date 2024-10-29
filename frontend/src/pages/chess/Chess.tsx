// import { io } from "socket.io-client";
import Board from "./components/Board";
// const socket = io("http://localhost:3000");

function Chess() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[80vh] h-[80vh]">
        <Board />
      </div>
    </div>
  );
}

export default Chess;