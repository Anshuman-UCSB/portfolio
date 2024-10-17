import { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import AdminView from "./AdminView";
import UserView from "./UserView";
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
            <div className="text-2xl mb-8">LaTeX equation goes here</div>
            <p className="text-xl">Question text or additional information</p>
          </div>

          {/* Right side - User/Admin View */}
          <div className="w-1/2 p-8 flex flex-col items-center justify-center">
            {isAdmin ? (
              <AdminView onGameOver={onGameOver} name={name} />
            ) : (
              <UserView name={name} />
            )}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="w-1/4 min-w-[250px] p-4 bg-gray-100">
        <Leaderboard currentPlayerName={name} updateTrigger={updateTrigger} />
      </div>
    </div>
  );
}

export default GameStage;
