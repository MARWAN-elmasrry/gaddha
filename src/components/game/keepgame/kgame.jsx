import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { gameHistory, getGameSession, startGameCheck } from "../../../api/services/userService";
import "./kgStyle.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGame, setGameNames } from "../../../gameSlice";
import { transformQuestions } from "../../../utils/games";
import { Loading } from "../../dashboard/dmain/dmain";

const Card = ({ game }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCardClick = async () => {
    // Handle card click event
    try {
      const session = await getGameSession(game.gameSessionId);
      const gameQuestions = transformQuestions(session, "categories");
      dispatch(
        setGame({
          gameName: game?.gameName,
          questionBank: gameQuestions,
          isNewGame: false,
        })
      );
      // setGameSession(session);
    } catch (err) {
      console.error(err);
      toast.error("خطأ في سحب بيانات الألعاب السابقة");
    }
    dispatch(
      setGameNames({
        gameName: game?.gameName,
      })
    );
    navigate("/start", { replace: true });
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
  const [loadingGame , setLoadingGame ] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await gameHistory();
        setGames(data);
      } catch (err) {
        console.error(err);
        toast.error("خطأ في سحب بيانات الألعاب السابقة");
      }
      finally{
        setLoadingGame(false)
      }
    };
    fetchData();
  }, []);

  return (
    <div className="kgame">
      <div className="container">
        <div className="kgame-cont">
          <h3>تابع ألعابك القديمة وين ما وقفت</h3>
          {loadingGame?(<>
              <Loading />
          </>):(<>
            <div className="cards">
            {games.length > 0 ? (
              games.map((game) => <Card key={game._id} game={game} />)
            ) : (
              <h1>لا يوجد ألعاب سابقة</h1>
            )}
          </div>
          </>)}
        </div>
      </div>
    </div>
  );
};

export default Kgame;
