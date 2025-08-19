import "./sgStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setGameNames } from "../../../gameSlice"; 
import { useNavigate } from "react-router-dom";

const Start = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gameName, teamOne, teamTwo } = useSelector((state) => state.game);

  const [localGameName, setLocalGameName] = useState(gameName);
  const [localTeamOne, setLocalTeamOne] = useState(teamOne);
  const [localTeamTwo, setLocalTeamTwo] = useState(teamTwo);

  const handleSave = () => {
    dispatch(
      setGameNames({
        gameName: localGameName,
        teamOne: localTeamOne,
        teamTwo: localTeamTwo,
      })
    );
    navigate("/game", { replace: true }); 
  };

  return (
    <div className="start">
      <div className="container">
        <div className="start-cont">
          <div className="game-cate-imgs">
            <img src="./offerv.png" alt="" className="opc-img6" />
            <img src="./offerv.png" alt="" className="opc-img6" />
            <img src="./offerv.png" alt="" className="opc-img6" />
            <img src="./offerv2.png" alt="" className="opc-img1" />
            <img src="./offerv2.png" alt="" className="opc-img1" />
            <img src="./offerv2.png" alt="" className="opc-img1" />
          </div>

          <div className="start-inp">
            <h2 className="start-title">اختر الأسامي ولا نشوف مين قدها</h2>
            <div className="start-input-group">
              <div className="start-input-row">
                <span className="start-icon">
                  <img src="./offerw.png" alt="" />
                </span>
                <input
                  className="start-input"
                  type="text"
                  placeholder="اسم اللعبة"
                  dir="rtl"
                  value={localGameName}
                  onChange={(e) => setLocalGameName(e.target.value)}
                />
              </div>

              <div className="start-input-row">
                <span className="start-icon">
                  <img src="./offerv.png" alt="" />
                </span>
                <input
                  className="start-input"
                  type="text"
                  placeholder="اسم الفريق الأول"
                  dir="rtl"
                  value={localTeamOne}
                  onChange={(e) => setLocalTeamOne(e.target.value)}
                />
              </div>

              <div className="start-input-row">
                <span className="start-icon">
                  <img src="./offerv2.png" alt="" />
                </span>
                <input
                  className="start-input"
                  type="text"
                  placeholder="اسم الفريق الثاني"
                  dir="rtl"
                  value={localTeamTwo}
                  onChange={(e) => setLocalTeamTwo(e.target.value)}
                />
              </div>
            </div>

            <div className="start-btn">
              <button onClick={handleSave}>متابعة</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;