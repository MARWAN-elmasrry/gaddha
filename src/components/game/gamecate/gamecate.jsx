import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { QUESTION_BANK } from "../questionBank";
import { setGame } from "../../../gameSlice";
import "./gcStyle.css";
import {
  toggleCategoryFavorite,
  getCategories,
  getFavoriteCategories,
} from "../../../api/services/userService";
import { set } from "react-hook-form";

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

function Card({ category, index, selected, order, isFavorite, onCardClick, onFavoriteClick }) {
  const handleCardClick = (e) => {
    if (e.target.closest(".select-btn")) {
      return;
    }
    onCardClick();
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card selection
    onFavoriteClick();
  };

  return (
    <div
      className="card-cate"
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
          <button className="select-btn" onClick={handleFavoriteClick}>
            <img
              src={isFavorite ? "./exit.png" : "./min.png"}
              alt={isFavorite ? "remove favorite" : "add favorite"}
            />
          </button>
        </div>
        <img src={category.image} alt="" />
        <h5>{category.name}</h5>
      </div>
    </div>
  );
}

export default function GameCate({ selected, setSelected, activeGroup, setActiveGroup }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [selected, setSelected] =
  //   useState([])
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initCategories, setInitCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFavoriteCategories();
        setFavorites(data.map((cat) => cat._id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    return () => setActiveGroup(null);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const flattenCategories = data.flatMap((cat) => cat.categories);
        setCategories(flattenCategories);
        setInitCategories(flattenCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    if (activeGroup) {
      const filteredCategories = initCategories.filter(
        (cat) => cat.group && cat.group === activeGroup
      );
      setCategories(filteredCategories);
    } else setCategories(initCategories);
  }, [activeGroup]);

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

  const handleFavoriteClick = async (id) => {
    try {
      await toggleCategoryFavorite(id);
    } catch (error) {
      console.error("Error adding category to favorites:", error);
    }
    setFavorites((prev) => {
      const updatedFavorites = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];

      // Save to localStorage
      localStorage.setItem("categoryFavorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
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
      isNewGame: true,
    };

    dispatch(setGame(payload));

    navigate("/start", {
      replace: true,
    });
  };

  return (
    <div className="game-cate">
      <div className="container">
        <div className="game-cate-cont">
          <div className="game-cate-imgs">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={i < 3 ? "./offerv.png" : "./offerw.png"}
                alt=""
                className={i < 3 ? "opc-img6" : "opc-img1"}
                style={{
                  opacity: i < selected.length ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          <h3> اختر 6 فئات، ثلاثة لكل فريق</h3>

          <div className="cards">
            {categories.map((cat, idx) => (
              <Card
                key={cat._id}
                index={idx}
                category={cat}
                selected={selected.includes(cat._id)}
                order={selectedWithOrder.get(cat._id)}
                isFavorite={favorites.includes(cat._id)}
                onCardClick={() => handleCardClick(cat._id)}
                onFavoriteClick={() => handleFavoriteClick(cat._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
