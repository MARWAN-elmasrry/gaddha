import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { gameHistory, getGameSession, startGameCheck } from "../../../api/services/userService";
import "./kgStyle.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGame, setGameNames } from "../../../gameSlice";
import { transformQuestions } from "../../../utils/games";

const Card = ({ game }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gameSession, setGameSession] = useState([]);

  const gameCategories = game.categories.map((cat) => cat._id);
  const selectedCategories = {
    player1Cat1id: gameCategories[0],
    player1Cat2id: gameCategories[1],
    player1Cat3id: gameCategories[2],
    player2Cat1id: gameCategories[3],
    player2Cat2id: gameCategories[4],
    player2Cat3id: gameCategories[5],
  };
  const handleCardClick = async () => {
    // Handle card click event
    try {
      const session = await getGameSession(game.gameSessionId);
      const gameQuestions = transformQuestions(session, "categories");
      console.log("gameQuestions", gameQuestions);
      dispatch(
        setGame({
          gameName: game.name,
          teamOne: "احمد",
          teamTwo: "محمد",
          questionBank: gameQuestions,
        })
      );
      // setGameSession(session);
    } catch (err) {
      console.error(err);
      toast.error("خطأ في سحب بيانات الألعاب السابقة");
    }
    dispatch(
      setGameNames({
        gameName: game.name,
        teamOne: "احمد",
        teamTwo: "محمد",
      })
    );
    navigate("/game", { replace: true });
  };
  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="card-num">
        <span className="number">
          <img src="./cate.png" alt="" />
        </span>
      </div>
      <div className="card-info">
        <div className="imgs">
          {game.categories.slice(0, 6).map((cat) => (
            <img key={cat._id} src={cat.image} alt={cat.name} />
          ))}
        </div>
        <h5>{game.gameName}</h5>
      </div>
    </div>
  );
};

const Kgame = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await gameHistory();
        setGames(data);
      } catch (err) {
        console.error(err);
        toast.error("خطأ في سحب بيانات الألعاب السابقة");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="kgame">
      <div className="container">
        <div className="kgame-cont">
          <h3>تابع ألعابك القديمة وين ما وقفت</h3>
          <div className="cards">
            {games.length > 0 ? (
              games.map((game) => <Card key={game._id} game={game} />)
            ) : (
              <h1>لا يوجد ألعاب سابقة</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kgame;
