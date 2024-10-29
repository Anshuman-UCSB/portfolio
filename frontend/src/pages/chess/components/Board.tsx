import { useState, useMemo } from "react";
import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function Board() {
  const game = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(game.fen());

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    const result = game.move(move);
    setFen(game.fen());
    return result; // null if the move was illegal, the move object if the move was legal
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
