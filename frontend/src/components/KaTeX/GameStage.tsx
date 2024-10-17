import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import io from "socket.io-client";

interface GameStageProps {
  name: string;
  onGameOver: () => void;
  isAdmin: boolean;
}

const socket = io(
  import.meta.env.VITE_ENV === "PROD"
    ? import.meta.env.VITE_PROD_API + "/socket"
    : import.meta.env.VITE_DEV_API + "/socket"
);

function GameStage({ name, onGameOver, isAdmin }: GameStageProps) {
  const [score, setScore] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("update_leaderboard", () => {
      console.log("Update leaderboard");
      setUpdateTrigger((prev) => prev + 1);
    });
  }, []);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
    // You can add logic here to move to the next question
  };

  return (
    <div className="p-16 flex flex-col items-center justify-center space-y-6">
      <p className="font-bold text-7xl">
        Ka<del className="text-gray-500">hoot</del>TeX
      </p>

      <Leaderboard currentPlayerName={name} updateTrigger={updateTrigger} />

      {/* Placeholder for LaTeX equation */}
      <div className="text-2xl">LaTeX equation goes here</div>

      {/* Placeholder for answer options */}
      <div className="space-y-4">
        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
          onClick={() => handleAnswer(true)}
        >
          Correct Answer
        </button>
        <button
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
          onClick={() => handleAnswer(false)}
        >
          Incorrect Answer
        </button>
      </div>

      <button
        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl"
        onClick={onGameOver}
      >
        End Game
      </button>
    </div>
  );
}

export default GameStage;
