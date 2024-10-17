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

const API_URL =
  import.meta.env.VITE_ENV === "PROD"
    ? import.meta.env.VITE_PROD_API
    : import.meta.env.VITE_DEV_API;

function GameStage({ name, isAdmin }: GameStageProps) {
  const [question, setQuestion] = useState<string>("");

  const fetchQuestion = async () => {
    const response = await fetch(`${API_URL}/question`);
    const data = await response.json();
    setQuestion(data.question);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    // socket.on("update_leaderboard", () => {
    //   console.log("Update leaderboard");
    // });
    // socket.on("start_game", () => {
    //   console.log("Start game");
    // });
    // socket.on("end_game", () => {
    //   console.log("End game");
    // });
    socket.on("next_question", () => {
      console.log("Next question");
      fetchQuestion();
    });
    fetchQuestion();
  }, []);

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
