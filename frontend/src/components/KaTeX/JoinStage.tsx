import { useState } from "react";

interface JoinStageProps {
  name: string;
  setName: (name: string) => void;
  onJoin: () => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

const API_URL =
  import.meta.env.VITE_ENV === "PROD"
    ? import.meta.env.VITE_PROD_API
    : import.meta.env.VITE_DEV_API;

function JoinStage({ name, setName, onJoin, setIsAdmin }: JoinStageProps) {
  const [error, setError] = useState<string | null>(null);
  const tryJoin = async () => {
    if (name.trim()) {
      try {
        const response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
        const data = await response.json();
        if (data.error) {
          setError(data.message);
        } else {
          setError(null);
          setIsAdmin(data.isAdmin);
          onJoin();
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setError("An error occurred. Please try again.");
      }
    } else {
      setError("Please enter a name.");
    }
  };

  return (
    <div className="p-16 flex flex-col items-center justify-center space-y-6">
      <p className="font-bold text-7xl">
        Ka<del className="text-gray-500">hoot</del>TeX
      </p>
      <input
        type="text"
        placeholder="Enter your name"
        className="px-6 py-3 border rounded-lg text-xl"
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 15))}
        maxLength={15}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            tryJoin();
          }
        }}
      />
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
        onClick={tryJoin}
      >
        Join
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default JoinStage;
