import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGame } from "../../../gameSlice";
import "./gcStyle.css";

const QUESTION_BANK = {
  "كرة القدم": [
    { q: "من فاز بكأس العالم 2018؟", a: "فرنسا" },
    { q: "أي لاعب يحمل الرقم القياسي لعدد مرات الفوز بالكرة الذهبية؟", a: "ليونيل ميسي" },
    { q: "كم عدد اللاعبين في الملعب لكل فريق في كرة القدم؟", a: "11" },
  ],
  "العلوم": [
    { q: "ما هو الرمز الكيميائي للماء؟", a: "H2O" },
    { q: "أي كوكب يُعرف بالكوكب الأحمر؟", a: "المريخ" },
    { q: "ما الغاز الذي تمتصه النباتات من الجو؟", a: "ثاني أكسيد الكربون" },
  ],
  "التاريخ": [
    { q: "في أي عام انتهت الحرب العالمية الثانية؟", a: "1945" },
    { q: "من كان أول رئيس للولايات المتحدة الأمريكية؟", a: "جورج واشنطن" },
    { q: "أي حضارة قديمة بنت أهرامات الجيزة؟", a: "المصريون القدماء" },
  ],
  "الجغرافيا": [
    { q: "ما هو أكبر محيط على وجه الأرض؟", a: "المحيط الهادئ" },
    { q: "ما هي عاصمة اليابان؟", a: "طوكيو" },
    { q: "أي نهر يمر عبر مصر؟", a: "نهر النيل" },
  ],
  "الأفلام": [
    { q: "أي فيلم فاز بجائزة أفضل فيلم في أوسكار 2020؟", a: "Parasite" },
    { q: "من هو مخرج فيلم Inception؟", a: "كريستوفر نولان" },
    { q: "أي سلسلة أفلام يظهر فيها شخصية دارث فيدر؟", a: "حرب النجوم" },
  ],
  "التكنولوجيا": [
    { q: "ماذا تعني اختصار HTTP؟", a: "بروتوكول نقل النص الفائق" },
    { q: "أي شركة أنشأت نظام تشغيل أندرويد؟", a: "جوجل" },
    { q: "ما هي الوحدة الأساسية للمعلومات في الحوسبة؟", a: "البت" },
  ],
};


const CATEGORIES = [
  { id: "Football", name: "كرة القدم", img: "./catimg.png" },
  { id: "Science", name: "العلوم", img: "./catimg.png" },
  { id: "History", name: "التاريخ", img: "./catimg.png" },
  { id: "Geography", name: "الجغرافيا", img: "./catimg.png" },
  { id: "Movies", name: "الأفلام", img: "./catimg.png" },
  { id: "Technology", name: "التقنية", img: "./catimg.png" },
];

function Card({ category, index, selected, order, onClick }) {
  return (
    <div className="card-cate" onClick={onClick} role="button" tabIndex={0}>
      <div className="card-num">
        {selected ? <span className="number">{order}</span> : null}
      </div>
      <div className="card-info">
        <div className="select">
          {selected ? (
            <img src="./remg.png" alt="selected" />
          ) : (
            <img src="./remg2.png" alt="not-selected" />
          )}
        </div>
        <img src={category.img} alt="" />
        <h5>{category.name}</h5>
      </div>
    </div>
  );
}

export default function GameCate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const canStart = selected.length === 6;

  const selectedWithOrder = useMemo(() => {
    const orderMap = new Map(selected.map((id, i) => [id, i + 1]));
    return orderMap;
  }, [selected]);

  const handleCardClick = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 6) return prev;
      return [...prev, id];
    });
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

    navigate("/start", { replace: true });
  };

  return (
    <div className="game-cate">
      <div className="container">
        <div className="game-cate-cont">
          {canStart ? (
            <button className="remg" onClick={startGame}>
              ابدأ اللعب
            </button>
          ) : (
            <img className="remg" src="./remg.png" alt="" />
          )}

          <div className="game-cate-imgs">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={i < 3 ? "./offerv.png" : "./offerv2.png"}
                alt=""
                className={i < 3 ? "opc-img6" : "opc-img1"}
                style={{ opacity: i < selected.length ? 1 : 0.3 }}
              />
            ))}
          </div>

          <h3> اختر 6 فئات، ثلاثة لكل فريق</h3>

          <div className="cards">
            {CATEGORIES.map((cat, idx) => (
              <Card
                key={cat.id}
                index={idx}
                category={cat}
                selected={selected.includes(cat.id)}
                order={selectedWithOrder.get(cat.id)}
                onClick={() => handleCardClick(cat.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
