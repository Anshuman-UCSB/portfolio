import { useState } from "react";
import JoinStage from "./JoinStage";
import GameStage from "./GameStage";
import GameOverStage from "./GameOverStage";

function KaTeX() {
  const [name, setName] = useState("");
  const [stage, setStage] = useState<"join" | "game" | "gameover">("join");
  const [isAdmin, setIsAdmin] = useState(false);

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
        <JoinStage
          name={name}
          setName={setName}
          onJoin={handleJoin}
          setIsAdmin={setIsAdmin}
        />
      )}
      {stage === "game" && (
        <GameStage name={name} onGameOver={handleGameOver} isAdmin={isAdmin} />
      )}
      {stage === "gameover" && (
        <GameOverStage
          name={name}
          onPlayAgain={handlePlayAgain}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
}

export default KaTeX;
