import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { gameHistory } from "../../../api/services/userService";
import "./kgStyle.css";

const Card = ({ game }) => {
  return (
    <div className="card">
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
              <p>لا يوجد ألعاب سابقة</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kgame;
