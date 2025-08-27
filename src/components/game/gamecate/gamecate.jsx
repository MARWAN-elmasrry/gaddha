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

export default function GameCate({ selected, setSelected }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [selected, setSelected] =
  //   useState([])
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log("categoriessss", categories);
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
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
    console.log("reach that categorie favorite", id);
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
                src={i < 3 ? "./offerv.png" : "./offerv2.png"}
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
            {categories.map(({ categories: cat }, idx) => (
              <Card
                key={cat[0]._id}
                index={idx}
                category={cat[0]}
                selected={selected.includes(cat[0]._id)}
                order={selectedWithOrder.get(cat[0]._id)}
                isFavorite={favorites.includes(cat[0]._id)}
                onCardClick={() => handleCardClick(cat[0]._id)}
                onFavoriteClick={() => handleFavoriteClick(cat[0]._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
