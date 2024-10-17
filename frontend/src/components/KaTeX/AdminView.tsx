import React from "react";

interface AdminViewProps {
  name: string;
}

const API_URL = "/api/katex";
//   import.meta.env.VITE_ENV === "PROD"
//     ? import.meta.env.VITE_PROD_API
//     : import.meta.env.VITE_DEV_API;

const AdminView: React.FC<AdminViewProps> = ({ name }) => {
  const startGame = async () => {
    const response = await fetch(`${API_URL}/start_game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (data.error) {
      console.error(data.message);
    } else {
      console.log(data);
    }
  };

  const endGame = async () => {
    const response = await fetch(`${API_URL}/end_game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (data.error) {
      console.error(data.message);
    } else {
      console.log(data);
    }
  };

  const nextQuestion = async () => {
    const response = await fetch(`${API_URL}/next_question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if (data.error) {
      console.error(data.message);
    } else {
      console.log(data);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-bold mb-6">Admin Controls</h2>
      <button
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl mb-4"
        onClick={startGame}
      >
        Start Game
      </button>
      <button
        className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xl"
        onClick={nextQuestion}
      >
        Start Next Question
      </button>
      <button
        className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl"
        onClick={endGame}
      >
        End Game
      </button>
    </div>
  );
};

export default AdminView;
