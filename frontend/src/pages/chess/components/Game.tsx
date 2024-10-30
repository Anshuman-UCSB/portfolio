import { io } from "socket.io-client";
import { useState } from "react";
import Board from "./Board";

const port = import.meta.env.MODE === "development" ? ":5000" : "";

function Game() {
    const socket = io(`${port}/api/chess/socket`, {
        transports: ["websocket", "polling"],
    });
    const [color, setColor] = useState<"white" | "black" | undefined>();

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="text-center text-xl mb-2">
                {color ? `Playing as: ${color}` : "Spectator"}
            </div>
            <div className="flex justify-center gap-4">
                <button onClick={() => setColor("white")} className="px-4 py-2 bg-white text-black rounded border border-black">White</button>
                <button className="px-4 py-2 bg-gray-400 text-black rounded border border-black">Restart</button>
                <button onClick={() => setColor("black")} className="px-4 py-2 bg-black text-white rounded border border-black">Black</button>
            </div>
            <div className="flex-1">
                <Board socket={socket} color={color} />
            </div>
        </div>
    );
}

export default Game;
