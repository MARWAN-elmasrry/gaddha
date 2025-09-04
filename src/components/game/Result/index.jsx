import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearGame } from "../../../gameSlice";
import { useNavigate } from "react-router-dom";
import "./resultStyle.css";
const GameResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [gameResult, setGameResult] = useState({ winnerTeam: "", isGameOver: "" });
  const { winnerTeam, isGameOver, teamOne, teamTwo, teamOneScore, teamTwoScore } = useSelector(
    (state) => state.game
  );
  const winnerTeamName = winnerTeam === "teamOne" ? teamOne : teamTwo;
  useEffect(() => {
    if (!isGameOver) navigate("/");
    setGameResult({ winnerTeam, isGameOver });
    // dispatch(clearGame());
  }, []);
  if (!gameResult.isGameOver) return null;
  return (
    <div className="game-result container">
      <div className="header-section">
        <h1>{winnerTeamName} طلع قدّها! </h1>
        <h3> مبروك {winnerTeamName}</h3>
      </div>
      <div className="result-section">
        <div className={`player-one player  ${winnerTeam === "teamOne" ? "winner" : ""}`}>
          <div className="player-name">{teamOne}</div>
          <div className="player-points">
            <span className="square square-right"></span>
            <span className="square square-left"></span>
            <span className="points">{teamOneScore}</span>
          </div>
        </div>
        <div className={`player-two player ${winnerTeam === "teamTwo" ? "winner" : ""}`}>
          <div className="player-name">{teamTwo}</div>
          <div className="player-points">
            <span className="square square-right"></span>
            <span className="square square-left"></span>
            <span className="points">{teamTwoScore}</span>
          </div>
        </div>
      </div>
      <div className="actions-section">
        <button
          onClick={() => {
            navigate("/games");
            dispatch(clearGame());
          }}
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.454256 23.0473L0.454257 1.44671C0.455135 1.22802 0.532343 1.01365 0.677569 0.826682C0.822794 0.639717 1.03054 0.487234 1.27844 0.385647C1.52634 0.284059 1.80502 0.237214 2.08447 0.250154C2.36391 0.263094 2.63355 0.335329 2.86436 0.459083L22.8333 11.2594C23.6612 11.707 23.6612 12.7846 22.8333 13.2334L2.86435 24.0338C2.63403 24.1588 2.36426 24.2321 2.08434 24.2457C1.80443 24.2594 1.52509 24.2128 1.27666 24.1111C1.02823 24.0095 0.82022 23.8565 0.675229 23.669C0.530239 23.4814 0.453814 23.2664 0.454256 23.0473Z"
              fill="#F9E7C5"
            />
          </svg>
          لعبة جديدة
        </button>
        <button>
          <svg
            width="28"
            height="29"
            viewBox="0 0 28 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0308 25.498C11.3769 25.498 8.80859 24.5598 6.77961 22.8492C4.75064 21.1387 3.39169 18.7659 2.94296 16.1503C2.49423 13.5347 2.9846 10.8447 4.3274 8.55565C5.67021 6.26663 7.77899 4.526 10.281 3.64141C12.7831 2.75683 15.5173 2.78524 18.0004 3.72162C20.4836 4.658 22.5557 6.44207 23.8507 8.75849C25.1456 11.0749 25.58 13.7746 25.077 16.3803C24.574 18.986 23.1661 21.33 21.102 22.998M25.2807 23.623H20.2808V18.623"
              stroke="#F9E7C5"
              stroke-width="5.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          اعادة اللعبة
        </button>
      </div>
    </div>
  );
};

export default GameResult;
