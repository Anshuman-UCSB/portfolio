import { useState, useMemo, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Socket } from "socket.io-client";

export default function Board({ socket }: { socket: Socket }) {
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to server");
    };
    const handleFen = (data: { fen: string }) => {
      console.log("FEN:", data.fen);
      game.load(data.fen);
      setFen(data.fen);
    };
    socket.on("connect", handleConnect);
    socket.on("fen", handleFen);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("fen", handleFen);
    };
  }, [socket]); 

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    const result = game.move(move);
    setFen(game.fen());
    socket.emit("fen", { fen: game.fen() });
    return result;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves({ verbose: true });
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece.slice(-1).toLowerCase()
    });
    console.log(move);
    // illegal move
    if (move === null) return false;
    setTimeout(makeRandomMove, 200);
    return true;
  }
  return (<>
      <Chessboard position={fen} onPieceDrop={onDrop} />
    </>
  );
}
