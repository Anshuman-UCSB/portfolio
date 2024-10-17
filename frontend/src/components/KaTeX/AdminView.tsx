import React from "react";

interface AdminViewProps {
  onGameOver: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onGameOver }) => {
  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold mb-6">Admin Controls</h2>
      <button className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl">
        Start Next Question
      </button>
      <button className="w-full px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-xl">
        Show Correct Answer
      </button>
      <button
        className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl"
        onClick={onGameOver}
      >
        End Game
      </button>
    </div>
  );
};

export default AdminView;
