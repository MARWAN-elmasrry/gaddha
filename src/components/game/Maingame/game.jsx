import "./gStyle.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  markQuestionAsShown,
  updateTeamScore,
  adjustScore,
  switchTurn,
  mutateTeamHelpers,
} from "../../../gameSlice";

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
              {!showConfirm ? (
                <button onClick={handleExitClick} className="exit-btn">
                  خروج
                </button>
              ) : (
                <div className="confirm-box">
                  <button
                    onClick={confirmExit}
                    className="confirm-btn"
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "8px 16px",
                      marginRight: "10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    خروج
                  </button>
                  <button
                    onClick={stayHere}
                    className="cancel-btn"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "8px 25px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    كمل قدها
                  </button>
                </div>
              )}
            </div>
          </div>
          <h1>{gameName}</h1>
          <a href="/">
            <img src="./logo.png" alt="logo" style={{ width: 100 }} />
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
                  className="game-q-points-img"
                  src="./200.png"
                  alt=""
                  style={{
                    opacity: getShownCount(200) > 0 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img"
                  src="./200.png"
                  alt=""
                  style={{
                    opacity: getShownCount(200) > 1 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img"
                  src="./400.png"
                  alt=""
                  style={{
                    opacity: getShownCount(400) > 0 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img"
                  src="./400.png"
                  alt=""
                  style={{
                    opacity: getShownCount(400) > 1 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img"
                  src="./600.png"
                  alt=""
                  style={{
                    opacity: getShownCount(600) > 0 ? 0.2 : 1,
                  }}
                />
                <img
                  className="game-q-points-img"
                  src="./600.png"
                  alt=""
                  style={{
                    opacity: getShownCount(600) > 1 ? 0.2 : 1,
                  }}
                />
              </button>
            </div>
            <img src="./catimg.png" alt="" />
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
      <div className="currentTurn" style={{ textAlign: "center", fontSize: "24px" }}>
        current Turn :{currentTurn}
      </div>
      <div className="footer-container">
        <div className="game-foot-cont">
          <div className="t1">
            <h2>{teamOne || "الفريق الأول"}</h2>
            <div className="score">
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamOne", "subtract")}
                style={{ cursor: "pointer" }}
              >
                <span className="min">-</span>
              </div>
              <p>{teamOneScore}</p>
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamOne", "add")}
                style={{ cursor: "pointer" }}
              >
                <span className="plus">+</span>
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
            <h2>{teamTwo || "الفريق الثاني"}</h2>
            <div className="score">
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamTwo", "subtract")}
                style={{ cursor: "pointer" }}
              >
                <span className="min">-</span>
              </div>
              <p>{teamTwoScore}</p>
              <div
                className="t-btn"
                onClick={() => handleScoreAdjustment("teamTwo", "add")}
                style={{ cursor: "pointer" }}
              >
                <span className="plus">+</span>
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
  };

  return (
    <div className="qa">
      <div className="qa-cont">
        <div className="game-btn ca" onClick={onToggleText} style={{ cursor: "pointer" }}>
          <span className="number">
            <img src="./cate.png" alt="" />
          </span>
        </div>
        <div className="game-btn del">
          <span className="timer" data-turn={turn}>
            {timer}
            {/* <img src="./delete.png" alt="" /> */}
          </span>
        </div>
        <div className="game-btn back" onClick={handleBackClick} style={{ cursor: "pointer" }}>
          <span className="number">
            <img src="./back.png" alt="" />
          </span>
        </div>
        <div className="game-btn excl">
          <span className="number">
            <img src="./Excl.png" alt="" />
          </span>
        </div>

        {currentView === "question" && (
          <>
            <h1>
              السؤال ({doublePointsClicked ? Number(currentQA?.points) * 2 : currentQA?.points}{" "}
              نقطة): {currentQA?.q}
            </h1>
            <div className="qora">
              <img src="./catimg.png" alt="" />
            </div>
          </>
        )}

        {currentView === "answer" && (
          <>
            <h1>
              الجواب ({doublePointsClicked ? Number(currentQA?.points) * 2 : currentQA?.points}{" "}
              نقطة): {currentQA?.a}
            </h1>
            <div className="qora">
              <img src="./catimg.png" alt="" />
            </div>
          </>
        )}

        {currentView === "result" && (
          <GameResult
            currentQA={currentQA}
            onBack={onBack}
            doublePointsClicked={doublePointsClicked}
            setDoublePointsClicked={setDoublePointsClicked}
          />
        )}
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
  const { questionBank } = useSelector((state) => state.game);
  const dispatch = useDispatch();

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

  const handleDifficultyClick = (points) => {
    const categoryQuestions = questionBank[currentCategory] || [];

    // Filter questions by points and find unshown ones
    const questionsWithPoints = categoryQuestions.filter((q) => q.points === points);
    const unshownQuestions = questionsWithPoints.filter((q) => !q.shown);

    // If no unshown questions, don't proceed
    if (unshownQuestions.length === 0) {
      console.log(`No more questions available for ${points} points in ${currentCategory}`);
      return;
    }

    // Get a random unshown question
    const randomQ = unshownQuestions[Math.floor(Math.random() * unshownQuestions.length)];

    // Mark this question as shown in Redux
    dispatch(
      markQuestionAsShown({
        category: currentCategory,
        question: randomQ,
      })
    );

    setCurrentQA(randomQ);
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
    }
  };

  return (
    <div className="m-game">
      <div className="container">
        <div className="m-game-cont">
          <Header />
          {!showQandA ? (
            <div className="cards">
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
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <GameFooter setDoublePointsClicked={setDoublePointsClicked} showQandA={showQandA} />
    </div>
  );
};

export default MainGame;
