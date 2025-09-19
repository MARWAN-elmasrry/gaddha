import "./gStyle.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  markQuestionAsShown,
  updateTeamScore,
  adjustScore,
  switchTurn,
  mutateTeamHelpers,
} from "../../../gameSlice";
import ReportForm from "./ReportForm";

const Header = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { gameName } = useSelector((state) => state.game);

  const handleExitClick = () => {
    setShowConfirm(true);
  };

  const confirmExit = () => {
    navigate("/games");
  };

  const stayHere = () => {
    setShowConfirm(false);
  };

  return (
    <header>
      <div className="header-container">
        <div className="head-cont">
          <div className="links">
            <div className="side-menu">
              <AnimatePresence mode="wait">
                {!showConfirm ? (
                  <motion.button
                    key="exit-btn"
                    onClick={handleExitClick}
                    className="exit-btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    خروج
                  </motion.button>
                ) : (
                  <motion.div
                    key="confirm-box"
                    className="confirm-box"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={confirmExit}
                      className="confirm-btn"
                      style={{ backgroundColor: "red" }}
                    >
                      خروج
                    </button>
                    <button
                      onClick={stayHere}
                      className="cancel-btn"
                      style={{ backgroundColor: "green" }}
                    >
                      كمل قدها
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <h1>{gameName}</h1>
          <a href="/">
            <img src="/logo.png" alt="logo" style={{ width: 100 }} />
          </a>
        </div>
      </div>
    </header>
  );
};

const SelecteCate = ({ category, index, flipped, onClick, onDifficultyClick, questionBank }) => {
  const categoryQuestions = questionBank[category] || [];
  const getShownCount = (points) => {
    return categoryQuestions.filter((q) => q.points === points && q.shown).length;
  };

  const getTotalCount = (points) => {
    return categoryQuestions.filter((q) => q.points === points).length;
  };

  const isAllShown = (points) => {
    const total = getTotalCount(points);
    const shown = getShownCount(points);
    return total > 0 && shown >= total;
  };

  return (
    <div
      className={`card-cate ${flipped ? "flipped" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-info">
            <div className="select">
              <button className="game-q-points">
                <img
                  className="game-q-points-img game-q-points1"
                  src="./200.png"
                  alt=""
                  style={{
                    opacity: getShownCount(200) > 0 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img game-q-points2"
                  src="./200.png"
                  alt=""
                  style={{
                    opacity: getShownCount(200) > 1 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img game-q-points3"
                  src="./400.png"
                  alt=""
                  style={{
                    opacity: getShownCount(400) > 0 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img game-q-points4"
                  src="./400.png"
                  alt=""
                  style={{
                    opacity: getShownCount(400) > 1 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img game-q-points5"
                  src="./600.png"
                  alt=""
                  style={{
                    opacity: getShownCount(600) > 0 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img game-q-points6"
                  src="./600.png"
                  alt=""
                  style={{
                    opacity: getShownCount(600) > 1 ? 0.2 : 1,
                  }}
                />
              </button>
            </div>
            <img
              className="category-img"
              src={
                categoryQuestions[0]?.category?.image
                  ? categoryQuestions[0]?.category?.image
                  : "./catimg.png"
              }
              alt="category image"
            />
            <h5>{category}</h5>
          </div>
        </div>
        <div className="card-back">
          <div
            className="easy"
            onClick={(e) => {
              e.stopPropagation();
              if (!isAllShown(200)) {
                onDifficultyClick(200);
              }
            }}
            style={{
              cursor: isAllShown(200) ? "not-allowed" : "pointer",
              opacity: isAllShown(200) ? 0.5 : 1,
            }}
          >
            <img
              className="game-q-points-img"
              src="./200.png"
              alt=""
              style={{
                opacity: getShownCount(200) > 0 ? 0.2 : 1,
              }}
            />
            <p>200</p>
            <img
              className="game-q-points-img"
              src="./200.png"
              alt=""
              style={{
                opacity: getShownCount(200) > 1 ? 0.2 : 1,
              }}
            />
          </div>
          <div
            className="mid"
            onClick={(e) => {
              e.stopPropagation();
              if (!isAllShown(400)) {
                onDifficultyClick(400);
              }
            }}
            style={{
              cursor: isAllShown(400) ? "not-allowed" : "pointer",
              opacity: isAllShown(400) ? 0.5 : 1,
            }}
          >
            <img
              className="game-q-points-img"
              src="./400.png"
              alt=""
              style={{
                opacity: getShownCount(400) > 0 ? 0.2 : 1,
              }}
            />
            <p>400</p>
            <img
              className="game-q-points-img"
              src="./400.png"
              alt=""
              style={{
                opacity: getShownCount(400) > 1 ? 0.2 : 1,
              }}
            />
          </div>
          <div
            className="hard"
            onClick={(e) => {
              e.stopPropagation();
              if (!isAllShown(600)) {
                onDifficultyClick(600);
              }
            }}
            style={{
              cursor: isAllShown(600) ? "not-allowed" : "pointer",
              opacity: isAllShown(600) ? 0.5 : 1,
            }}
          >
            <img
              className="game-q-points-img"
              src="./600.png"
              alt=""
              style={{
                opacity: getShownCount(600) > 0 ? 0.2 : 1,
              }}
            />
            <p>600</p>
            <img
              className="game-q-points-img"
              src="./600.png"
              alt=""
              style={{
                opacity: getShownCount(600) > 1 ? 0.2 : 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GameFooter = ({ setDoublePointsClicked, showQandA }) => {
  const {
    teamOne,
    teamTwo,
    teamOneScore,
    teamTwoScore,
    currentTurn,
    teamOneHelpers,
    teamTwoHelpers,
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleScoreAdjustment = (team, operation) => {
    dispatch(adjustScore({ team, operation }));
  };
  const handlePhoneCallClick = () => {
    if (currentTurn == "1") {
      if (!teamOneHelpers["phoneCall"]) return;
      else dispatch(mutateTeamHelpers({ helper: "phoneCall" }));
    } else if (currentTurn == "2") {
      if (!teamTwoHelpers["phoneCall"]) return;
      else dispatch(mutateTeamHelpers({ helper: "phoneCall" }));
    }
    setDoublePointsClicked(true);
  };
  const handleDoublePointsClick = () => {
    if (currentTurn == "1") {
      if (!teamOneHelpers["doublePoints"]) return;
      else dispatch(mutateTeamHelpers({ helper: "doublePoints" }));
    } else if (currentTurn == "2") {
      if (!teamTwoHelpers["doublePoints"]) return;
      else dispatch(mutateTeamHelpers({ helper: "doublePoints" }));
    }
    setDoublePointsClicked(true);
  };
  const handleDoubleAnswersClick = () => {
    if (currentTurn == "1") {
      if (!teamOneHelpers["doubleAnswers"]) return;
      else dispatch(mutateTeamHelpers({ helper: "doubleAnswers" }));
    } else if (currentTurn == "2") {
      if (!teamTwoHelpers["doubleAnswers"]) return;
      else dispatch(mutateTeamHelpers({ helper: "doubleAnswers" }));
    }
    setDoublePointsClicked(true);
  };
  return (
    <div className="game-footer">
      {/* <div className="currentTurn" style={{ textAlign: "center", fontSize: "24px" }}>
        current Turn :{currentTurn}
      </div> */}
      <div className="footer-container">
        <div className="game-foot-cont">
          <div className="t1">
            <h2 className={`${currentTurn === "1" ? "active-player turn-indicator" : ""}`}>
              {teamOne || "الفريق الأول"}
            </h2>
            <div className="score">
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamOne", "subtract")}
                style={{ cursor: "pointer" }}
              >
                <span className="min">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 9 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 0.503906H1.5C1.23478 0.503906 0.98043 0.661942 0.792893 0.943246C0.605357 1.22455 0.5 1.60608 0.5 2.00391C0.5 2.40173 0.605357 2.78326 0.792893 3.06457C0.98043 3.34587 1.23478 3.50391 1.5 3.50391H7.5C7.76522 3.50391 8.01957 3.34587 8.20711 3.06457C8.39464 2.78326 8.5 2.40173 8.5 2.00391C8.5 1.60608 8.39464 1.22455 8.20711 0.943246C8.01957 0.661942 7.76522 0.503906 7.5 0.503906Z"
                      fill="#883813"
                    />
                  </svg>
                </span>
              </div>
              <p>{teamOneScore}</p>
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamOne", "add")}
                style={{ cursor: "pointer" }}
              >
                <span className="plus">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.5 0.83724C2.5 0.616226 2.5878 0.404264 2.74408 0.247984C2.90036 0.0917036 3.11232 0.00390625 3.33333 0.00390625H4.16667C4.38768 0.00390625 4.59964 0.0917036 4.75592 0.247984C4.9122 0.404264 5 0.616226 5 0.83724V2.50391H6.66667C6.88768 2.50391 7.09964 2.5917 7.25592 2.74798C7.4122 2.90426 7.5 3.11623 7.5 3.33724V4.17057C7.5 4.39159 7.4122 4.60355 7.25592 4.75983C7.09964 4.91611 6.88768 5.00391 6.66667 5.00391H5V6.67057C5 6.89159 4.9122 7.10355 4.75592 7.25983C4.59964 7.41611 4.38768 7.50391 4.16667 7.50391H3.33333C3.11232 7.50391 2.90036 7.41611 2.74408 7.25983C2.5878 7.10355 2.5 6.89159 2.5 6.67057V5.00391H0.833333C0.61232 5.00391 0.400358 4.91611 0.244078 4.75983C0.0877973 4.60355 0 4.39159 0 4.17057V3.33724C0 3.11623 0.0877973 2.90426 0.244078 2.74798C0.400358 2.5917 0.61232 2.50391 0.833333 2.50391H2.5V0.83724Z"
                      fill="#883813"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="helps">
            <div
              className={`helper ${
                (!teamOneHelpers["phoneCall"] && currentTurn === "1") ||
                (!teamTwoHelpers["phoneCall"] && currentTurn === "2") ||
                !showQandA
                  ? "disabled"
                  : ""
              }`}
              onClick={handlePhoneCallClick}
            >
              <img src="./phone-icon.png" alt="" />
            </div>
            <div
              className={`helper ${
                (!teamOneHelpers["doublePoints"] && currentTurn === "1") ||
                (!teamTwoHelpers["doublePoints"] && currentTurn === "2") ||
                showQandA
                  ? "disabled"
                  : ""
              }`}
              onClick={handleDoublePointsClick}
            >
              <img src="./double-points-icon.png" alt="double points icon" />
            </div>
            <div
              className={`helper ${
                (!teamOneHelpers["doubleAnswers"] && currentTurn === "1") ||
                (!teamTwoHelpers["doubleAnswers"] && currentTurn === "2") ||
                !showQandA
                  ? "disabled"
                  : ""
              }`}
              onClick={handleDoubleAnswersClick}
            >
              <img src="./double-answers.png" alt="" />
            </div>
          </div>
          <div className="t1">
            <h2 className={`${currentTurn === "2" ? "active-player turn-indicator" : ""}`}>
              {teamTwo || "الفريق الثاني"}
            </h2>
            <div className="score">
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamTwo", "subtract")}
                style={{ cursor: "pointer" }}
              >
                <span className="min">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 9 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 0.503906H1.5C1.23478 0.503906 0.98043 0.661942 0.792893 0.943246C0.605357 1.22455 0.5 1.60608 0.5 2.00391C0.5 2.40173 0.605357 2.78326 0.792893 3.06457C0.98043 3.34587 1.23478 3.50391 1.5 3.50391H7.5C7.76522 3.50391 8.01957 3.34587 8.20711 3.06457C8.39464 2.78326 8.5 2.40173 8.5 2.00391C8.5 1.60608 8.39464 1.22455 8.20711 0.943246C8.01957 0.661942 7.76522 0.503906 7.5 0.503906Z"
                      fill="#883813"
                    />
                  </svg>
                </span>
              </div>
              <p>{teamTwoScore}</p>
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamTwo", "add")}
                style={{ cursor: "pointer" }}
              >
                <span className="plus">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.5 0.83724C2.5 0.616226 2.5878 0.404264 2.74408 0.247984C2.90036 0.0917036 3.11232 0.00390625 3.33333 0.00390625H4.16667C4.38768 0.00390625 4.59964 0.0917036 4.75592 0.247984C4.9122 0.404264 5 0.616226 5 0.83724V2.50391H6.66667C6.88768 2.50391 7.09964 2.5917 7.25592 2.74798C7.4122 2.90426 7.5 3.11623 7.5 3.33724V4.17057C7.5 4.39159 7.4122 4.60355 7.25592 4.75983C7.09964 4.91611 6.88768 5.00391 6.66667 5.00391H5V6.67057C5 6.89159 4.9122 7.10355 4.75592 7.25983C4.59964 7.41611 4.38768 7.50391 4.16667 7.50391H3.33333C3.11232 7.50391 2.90036 7.41611 2.74408 7.25983C2.5878 7.10355 2.5 6.89159 2.5 6.67057V5.00391H0.833333C0.61232 5.00391 0.400358 4.91611 0.244078 4.75983C0.0877973 4.60355 0 4.39159 0 4.17057V3.33724C0 3.11623 0.0877973 2.90426 0.244078 2.74798C0.400358 2.5917 0.61232 2.50391 0.833333 2.50391H2.5V0.83724Z"
                      fill="#883813"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const QandA = ({
  onBack,
  onToggleText,
  currentView,
  currentQA,
  category,
  onBackToQuestion,
  setDoublePointsClicked,
  doublePointsClicked,
}) => {
  const [timer, setTimer] = useState(60);
  const [turn, setTurn] = useState(1);
  const [openReportForm, setOpenReportForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentView !== "question") return;

    if (timer === 0) {
      if (turn === 1) {
        setTimeout(() => {
          setTurn(2);
          setTimer(11);
        }, 1000);
      } else {
        onToggleText();
        return;
      }
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, turn]);
  const handleBackClick = () => {
    if (currentView === "answer") {
      onBackToQuestion();
    } else {
      onBack();
    }
    dispatch(switchTurn());
  };
  return (
    <div className="qa">
      <ReportForm questionId={currentQA?.id} open={openReportForm} setOpen={setOpenReportForm} />
      <div className={`qa-cont ${currentView === "result" ? "fixed-height" : ""}`}>
        <div className="game-btn ca" onClick={onToggleText} style={{ cursor: "pointer" }}>
          <span className="number">
            <img src="./cate.png" alt="" />
          </span>
        </div>
        <div className="game-btn del">
          <span className="timer" data-turn={turn}>
            {timer}
            {/* <img src="/delete.png" alt="" /> */}
          </span>
        </div>
        <div className="game-btn back" onClick={handleBackClick} style={{ cursor: "pointer" }}>
          <span className="number">
            <img src="/back.png" alt="" />
          </span>
        </div>
        <div
          className="game-btn excl"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenReportForm(true)}
        >
          <span className="number">
            <img src="./Excl.png" alt="" />
          </span>
        </div>

        <AnimatePresence mode="wait">
          {currentView === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 style={{ direction: "rtl" }}>السؤال : {currentQA?.q}</h1>
              <div className="qora">
                <img src={currentQA.qImage} alt="" />
              </div>
            </motion.div>
          )}

          {currentView === "answer" && (
            <motion.div
              key="answer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 style={{ direction: "rtl" }}>الجواب : {currentQA?.a}</h1>
              <div className="qora">
                <img src={currentQA.aImage} alt="" />
              </div>
            </motion.div>
          )}

          {currentView === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <GameResult
                currentQA={currentQA}
                onBack={onBack}
                doublePointsClicked={doublePointsClicked}
                setDoublePointsClicked={setDoublePointsClicked}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const GameResult = ({ currentQA, onBack, setDoublePointsClicked, doublePointsClicked }) => {
  const { teamOne, teamTwo, currentTurn } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleTeamSelection = (team) => {
    const isSameTeamClickedDoublePointsAnswer =
      (currentTurn === "1" && team == "teamOne") || (currentTurn === "2" && team == "teamTwo");
    if (team !== "none") {
      dispatch(
        updateTeamScore({
          team,
          points:
            doublePointsClicked && isSameTeamClickedDoublePointsAnswer
              ? currentQA.points * 2
              : currentQA.points,
        })
      );
    }
    dispatch(switchTurn());
    setDoublePointsClicked();
    // Go back to main game view
    onBack();
  };

  return (
    <>
      <h1>مين جاوب ؟ ({doublePointsClicked ? currentQA?.points * 2 : currentQA?.points} نقطة)</h1>
      <div
        className="g-t1"
        onClick={() => handleTeamSelection("teamOne")}
        style={{ cursor: "pointer" }}
      >
        <span className="g-t1-span">
          <p>{teamOne || "الفريق الأول"}</p>
        </span>
      </div>
      <div
        className="g-t2"
        onClick={() => handleTeamSelection("teamTwo")}
        style={{ cursor: "pointer" }}
      >
        <span className="g-t2-span">
          <p>{teamTwo || "الفريق الثاني"}</p>
        </span>
      </div>
      <div
        className="g-no-one"
        onClick={() => handleTeamSelection("none")}
        style={{ cursor: "pointer" }}
      >
        <span className="g-no-span">
          <p>ولا احد</p>
        </span>
      </div>
    </>
  );
};

const MainGame = () => {
  const { questionBank, isGameOver, winnerTeam } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showQandA, setShowQandA] = useState(false);
  const [currentView, setCurrentView] = useState("question");
  const [currentQA, setCurrentQA] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [flippedCard, setFlippedCard] = useState(null);
  const [doublePointsClicked, setDoublePointsClicked] = useState(false);

  const handleCategoryClick = (category, index) => {
    if (flippedCard === index) {
      setFlippedCard(null);
      return;
    }
    setFlippedCard(index);
    setCurrentCategory(category);
  };
  useEffect(() => {
    if (isGameOver) {
      navigate("/game/result");
    }
  }, [isGameOver, navigate]);
  const handleDifficultyClick = (points) => {
    const categoryQuestions = questionBank[currentCategory] || [];

    // Filter questions by points and find unshown ones
    const questionsWithPoints = categoryQuestions.filter((q) => q.points === points);
    const unshownQuestions = questionsWithPoints.filter((q) => !q.shown);
    // If no unshown questions, don0't proceed
    if (unshownQuestions.length === 0) {
      console.log(`No more questions available for ${points} points in ${currentCategory}`);
      return;
    }

    // console.log("random question", randomQ);
    // Mark this question as shown in Redux
    dispatch(
      markQuestionAsShown({
        category: currentCategory,
        question: unshownQuestions[0],
      })
    );

    setCurrentQA(unshownQuestions[0]);
    setShowQandA(true);
    setCurrentView("question");
  };

  const handleBackToQuestion = () => {
    setCurrentView("question");
  };

  const handleBackClick = () => {
    setShowQandA(false);
    setCurrentView("question");
    setFlippedCard(null);
  };

  const handleToggleText = () => {
    if (currentView === "question") {
      setCurrentView("answer");
    } else if (currentView === "answer") {
      setCurrentView("result");
    } else if (currentView === "result") {
      setShowQandA(false);
      setCurrentView("question");
      setFlippedCard(null);
      dispatch(switchTurn());
    }
  };

  return (
    <div className="m-game">
      <Header />
      <div className="container">
        <img src="/dashtree.png" alt="" className="right-tree" />
        <img src="/dashtree.png" alt="" className="left-tree" />
        <div className="m-game-cont">
          <AnimatePresence mode="wait">
            {!showQandA ? (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="cards"
              >
                {Object.keys(questionBank).map((cat, index) => (
                  <SelecteCate
                    key={cat}
                    category={cat}
                    index={index}
                    flipped={flippedCard === index}
                    onClick={() => handleCategoryClick(cat, index)}
                    onDifficultyClick={handleDifficultyClick}
                    questionBank={questionBank}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="qanda"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <QandA
                  onBack={handleBackClick}
                  onBackToQuestion={handleBackToQuestion}
                  onToggleText={handleToggleText}
                  currentView={currentView}
                  currentQA={currentQA}
                  category={currentCategory}
                  setDoublePointsClicked={setDoublePointsClicked}
                  doublePointsClicked={doublePointsClicked}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <GameFooter setDoublePointsClicked={setDoublePointsClicked} showQandA={showQandA} />
    </div>
  );
};

export default MainGame;
