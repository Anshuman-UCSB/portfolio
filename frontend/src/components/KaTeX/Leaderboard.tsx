import React, { useEffect } from "react";
import { Socket } from "socket.io-client";

interface LeaderboardProps {
  currentPlayerName: string;
  socket?: Socket;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  currentPlayerName,
  socket,
}) => {
  const [sortedScores, setSortedScores] = React.useState<
    { name: string; score: number }[]
  >([]);

  const fetchLeaderboard = async () => {
    try {
      const API_URL = "/api/katex";
      // import.meta.env.VITE_ENV === "PROD"
      //   ? import.meta.env.VITE_PROD_API
      //   : import.meta.env.VITE_DEV_API;
      const response = await fetch(`${API_URL}/leaderboard`);
      const data = await response.json();
      const scores = Object.entries(data).map(([name, score]) => ({
        name,
        score: score as number,
      }));
      const sorted = scores.sort((a, b) => b.score - a.score);
      setSortedScores(sorted);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };
  useEffect(() => {
    fetchLeaderboard();
    const updateLeaderboardHandler = () => {
      console.log("Update leaderboard");
      fetchLeaderboard();
    };

    socket?.on("update_leaderboard", updateLeaderboardHandler);

    return () => {
      socket?.off("update_leaderboard", updateLeaderboardHandler);
    };
  }, [socket]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul className="space-y-2">
        {sortedScores.map((player, index) => (
          <li
            key={player.name}
            className={`flex justify-between items-center p-2 rounded ${
              player.name === currentPlayerName
                ? "bg-yellow-200 font-bold"
                : index % 2 === 0
                ? "bg-gray-100"
                : ""
            }`}
          >
            <span>{`${index + 1}. ${player.name}`}</span>
            <span>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
