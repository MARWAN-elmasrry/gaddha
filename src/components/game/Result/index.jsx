import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGame } from "../../../gameSlice";
import { useNavigate } from "react-router-dom";

const GameResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [gameResult, setGameResult] = useState({ winnerTeam: "", isGameOver: "" });
  const { winnerTeam, isGameOver } = useSelector((state) => state.game);
  useEffect(() => {
    // if (!isGameOver) navigate("/");
    setGameResult({ winnerTeam, isGameOver });
    dispatch(clearGame());
  }, []);
  // if (!gameResult.isGameOver) return null;
  return <div className="game-result">Game Over! Winner: {gameResult.winnerTeam}</div>;
};

export default GameResult;
