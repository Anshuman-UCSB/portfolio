import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import AdminView from "./AdminView";
import UserView from "./UserView";
import io from "socket.io-client";
import Latex from "react-latex-next";

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

const API_URL = "/api/katex";
// import.meta.env.VITE_ENV === "PROD"
//   ? import.meta.env.VITE_PROD_API
//   : import.meta.env.VITE_DEV_API;

function GameStage({ name, isAdmin, onGameOver }: GameStageProps) {
  const [question, setQuestion] = useState<string>(
    "\\text{Waiting for game to start...}"
  );

  const fetchQuestion = async () => {
    const response = await fetch(`${API_URL}/question`);
    const data = await response.json();
    setQuestion(data.question);
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to server");
    };
    const handleStartGame = () => {
      console.log("Start game");
      fetchQuestion();
    };
    const handleEndGame = () => {
      console.log("End game");
      onGameOver();
    };
    const handleNextQuestion = () => {
      console.log("Next question");
      fetchQuestion();
    };

    socket.on("connect", handleConnect);
    socket.on("start_game", handleStartGame);
    socket.on("end_game", handleEndGame);
    socket.on("next_question", handleNextQuestion);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("start_game", handleStartGame);
      socket.off("end_game", handleEndGame);
      socket.off("next_question", handleNextQuestion);
    };
  }, [socket]);

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col">
        <div className="text-center py-8">
          <p className="font-bold text-7xl">
            Ka<del className="text-gray-500">hoot</del>TeX
          </p>
        </div>
        <div className="flex flex-grow">
          {/* Left side - Current Question */}
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-6">Current Question</h2>
            <div className="text-2xl mb-8">
              Enter the LaTeX for the equation below:
            </div>
            <div className="text-xl">
              <Latex>{`$$${question}$$`}</Latex>
            </div>
          </div>

          {/* Right side - User/Admin View */}
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            {isAdmin ? (
              <AdminView name={name} />
            ) : (
              <UserView name={name} socket={socket} />
            )}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-1/4 min-w-[250px] p-4 bg-gray-100">
        <Leaderboard currentPlayerName={name} socket={socket} />
      </div>
    </div>
  );
}

export default GameStage;
