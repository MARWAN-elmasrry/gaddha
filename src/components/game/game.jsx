import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GameCate from "./gamecate/gamecate";
import Kgame from "./keepgame/kgame";
import { QUESTION_BANK } from "./questionBank";
import { setGame } from "../../gameSlice";
import "./mgStyle.css";
import {
  createGameSession,
  getFavoriteCategories,
  startGameCheck,
} from "../../api/services/userService";
import { transformQuestions } from "../../utils/games";

const CATEGORIES = [
  {
    id: "كرة القدم",
    name: "كرة القدم",
    img: "./catimg.png",
  },
  {
    id: "العلوم",
    name: "العلوم",
    img: "./catimg.png",
  },
  {
    id: "التاريخ",
    name: "التاريخ",
    img: "./catimg.png",
  },
  {
    id: "الجغرافيا",
    name: "الجغرافيا",
    img: "./catimg.png",
  },
  {
    id: "الأفلام",
    name: "الأفلام",
    img: "./catimg.png",
  },
  {
    id: "التكنولوجيا",
    name: "التكنولوجيا",
    img: "./catimg.png",
  },
];

// FavoriteCard Component
function FavoriteCard({ category, index, selected, order, onCardClick, onRemoveFavorite }) {
  const handleCardClick = (e) => {
    if (e.target.closest(".remove-favorite-btn")) {
      return;
    }
    onCardClick();
  };

  const handleRemoveFavorite = (e) => {
    e.stopPropagation();
    onRemoveFavorite();
  };

  return (
    <div
      className="card-cate favorite-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      style={{
        opacity: selected ? 0.5 : 1,
      }}
    >
      <div className="card-num">{selected ? <span className="number">{order}</span> : null}</div>
      <div className="card-info">
        <div className="select">
          <button className="remove-favorite-btn" onClick={handleRemoveFavorite}>
            <img src="./exit.png" alt="remove from favorites" />
          </button>
        </div>
        <img src={category.image} alt="" />
        <h5>{category.name}</h5>
      </div>
    </div>
  );
}

function FavoriteCate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFavoriteCategories();
        setFavorites(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const selectedWithOrder = useMemo(() => {
    const orderMap = new Map(selected.map((id, i) => [id, i + 1]));
    return orderMap;
  }, [selected]);

  const favoriteCategories = CATEGORIES.filter((cat) => favorites.includes(cat.id));

  const handleCardClick = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 6) return prev;
      return [...prev, id];
    });
  };

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("categoryFavorites", JSON.stringify(updatedFavorites));
    setSelected((prev) => prev.filter((selectedId) => selectedId !== id));
  };

  const startGame = () => {
    const payload = {
      selectedCategories: selected.map((id) => ({
        id,
        name: id,
        qa: QUESTION_BANK[id] || [],
      })),
      questionBank: QUESTION_BANK,
    };

    dispatch(setGame(payload));
    navigate("/start", {
      replace: true,
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="game-cate">
        <div className="container">
          <div className="game-cate-cont">
            <div className="no-favorites">
              <h3>لا توجد فئات مفضلة</h3>
              <h3>اذهب إلى صفحة الفئات لإضافة فئات إلى المفضلة</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-cate">
      <div className="container">
        <div className="game-cate-cont">
          {/* {canStart ? (
            <button className="remg" onClick={startGame}>
              ابدأ اللعب
            </button>
          ) : (
            <img className="remg" src="./remg.png" alt="" />
          )} */}

          <div className="game-cate-imgs">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={i < 3 ? "./offerv.png" : "./offerv2.png"}
                alt=""
                className={i < 3 ? "opc-img6" : "opc-img1"}
                style={{
                  opacity: i < selected.length ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          <h3>فئاتي المفضلة - اختر 6 فئات للعب</h3>

          <div className="cards">
            {favorites.map((cat, idx) => (
              <FavoriteCard
                key={cat._id}
                index={idx}
                category={cat}
                selected={selected.includes(cat._id)}
                order={selectedWithOrder.get(cat._id)}
                onCardClick={() => handleCardClick(cat._id)}
                onRemoveFavorite={() => handleRemoveFavorite(cat._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Game Component
const Game = () => {
  const [activeTab, setActiveTab] = useState("games");
  const [isFlipping, setIsFlipping] = useState(false);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let gameQuestions;
  const startGame = async () => {
    try {
      const gameStatus = await startGameCheck();
      if (gameStatus.message !== "Game started successfully") return;
      console.log("reach that success start game");
      const body = {
        gameName: "first game",
        player1Cat1id: selected[0],
        player1Cat2id: selected[1],
        player1Cat3id: selected[2],
        player2Cat1id: selected[3],
        player2Cat2id: selected[4],
        player2Cat3id: selected[5],
      };
      const session = (await createGameSession(body)).session;
      gameQuestions = transformQuestions(session);
      console.log("create game session success full", gameQuestions);
    } catch {
      return;
    }
    const payload = {
      selectedCategories: selected.map((id) => ({
        id,
        name: id,
        qa: QUESTION_BANK[id] || [],
      })),
      questionBank: gameQuestions,
    };

    dispatch(setGame(payload));

    navigate("/start", {
      replace: true,
    });
  };

  const handleTabClick = (tab, event) => {
    event.preventDefault();
    if (tab !== activeTab) {
      setIsFlipping(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => setIsFlipping(false), 50);
      }, 150);
    }
  };

  return (
    <>
      <div className="game">
        <div className="container">
          <div className="game-cont">
            <div className="g-links">
              <div className="g-link">
                <a
                  className={activeTab === "games" ? "g-active" : ""}
                  href="#"
                  onClick={(e) => handleTabClick("games", e)}
                >
                  ألعابي
                </a>
                <a
                  className={activeTab === "favorites" ? "g-active" : ""}
                  href="#"
                  onClick={(e) => handleTabClick("favorites", e)}
                >
                  <span></span>
                </a>
                <a
                  className={activeTab === "categories" ? "g-active" : ""}
                  href="#"
                  onClick={(e) => handleTabClick("categories", e)}
                >
                  الفئات
                </a>
              </div>
              {/* {selected.length > 1 && ( */}
              {selected.length === 6 && (
                <button className="remg" onClick={startGame}>
                  ابدأ اللعب
                </button>
              )}
            </div>
            <div className={`card-flip-container ${isFlipping ? "flipping" : ""}`}>
              <div className="card-content">
                {activeTab === "games" && <Kgame />}
                {activeTab === "categories" && (
                  <GameCate selected={selected} setSelected={setSelected} />
                )}
                {activeTab === "favorites" && <FavoriteCate />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
