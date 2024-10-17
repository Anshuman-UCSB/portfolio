import { useState } from "react";
import JoinStage from "./JoinStage";
import GameStage from "./GameStage";
import GameOverStage from "./GameOverStage";

function KaTeX() {
  const [name, setName] = useState("");
  const [stage, setStage] = useState<"join" | "game" | "gameover">("join");

  const handleJoin = () => {
    if (name.trim()) {
      setStage("game");
    }
  };

  const handleGameOver = () => {
    setStage("gameover");
  };

  const handlePlayAgain = () => {
    setStage("join");
  };

  return (
    <>
      {stage === "join" && (
        <JoinStage name={name} setName={setName} onJoin={handleJoin} />
      )}
      {stage === "game" && (
        <GameStage name={name} onGameOver={handleGameOver} />
      )}
      {stage === "gameover" && (
        <GameOverStage name={name} onPlayAgain={handlePlayAgain} />
      )}
    </>
  );
}

export default KaTeX;
