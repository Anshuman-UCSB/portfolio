import Leaderboard from "./Leaderboard";

interface GameOverStageProps {
  name: string;
  onPlayAgain: () => void;
  isAdmin: boolean;
}

function GameOverStage({ name, onPlayAgain, isAdmin }: GameOverStageProps) {
  return (
    <div className="p-16 flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold">Game Over</h1>
      {!isAdmin && <p className="text-xl">Thanks for playing, {name}!</p>}
      <Leaderboard currentPlayerName={name} />
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl"
        onClick={onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
}

export default GameOverStage;
