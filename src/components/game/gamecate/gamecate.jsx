import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./gcStyle.css";
import {
  toggleCategoryFavorite,
  getCategories,
  getFavoriteCategories,
  getRemainingGamesForACategory,
} from "../../../api/services/userService";
import { Loading } from "../../dashboard/dmain/dmain";
import { toast } from "react-toastify";

function Card({
  selectedCategories,
  category,
  index,
  selected,
  order,
  isFavorite,
  onCardClick,
  onFavoriteClick,
}) {
  const handleCardClick = (e) => {
    if (category.remainingGames === 0) return; // prevent click
    if (e.target.closest(".select-btn")) {
      return;
    }
    onCardClick();
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card selection
    if (category.remainingGames === 0) return; // block favorite toggle if disabled
    onFavoriteClick();
  };

  const isDisabled = category.remainingGames === 0;

  return (
    <div
      className={`card-cate ${isDisabled ? "disabled-card" : ""}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      style={{
        filter: selectedCategories.length > 5 && !selected ? "brightness(40%)" : "brightness(100%)",
        opacity: isDisabled ? 0.4 : selected ? 0.5 : 1,
        cursor: isDisabled ? "not-allowed" : "",
      }}
    >
      <div className="card-num">
        <span className="number">{category.remainingGames}</span>
      </div>
      <div className="card-info">
        <div className="select">
          <button
            className="select-btn"
            onClick={handleFavoriteClick}
            disabled={isDisabled} // disable button too
          >
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
  const [loadingCategories, setloadingCategories] = useState(true);
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

        const categoriesWithRemainingGames = await Promise.all(
          flattenCategories.map(async (category) => {
            try {
              const remainingGames = await getRemainingGamesForACategory(category._id);
              return {
                ...category,
                remainingGames,
              };
            } catch (error) {
              console.error(`Error fetching remaining games for category ${category._id}:`, error);
              return {
                ...category,
                remainingGames: 0,
              };
            }
          })
        );

        setCategories(categoriesWithRemainingGames);
        setInitCategories(categoriesWithRemainingGames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setloadingCategories(false);
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

  const handleFavoriteClick = async (category) => {
    try {
      await toggleCategoryFavorite(id);
    } catch (error) {
      console.error("Error adding category to favorites:", error);
    }
    setFavorites((prev) => {
      // const updatedFavorites = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      if (prev.find((cat) => cat === category._id)) {
        toast.success(`تم إزالة الفئة ${category?.name} من المفضلة`);
        return prev.filter((cat) => cat !== category._id);
      }
      toast.success(`تم إضافة الفئة ${category?.name} إلى المفضلة`);
      return [...prev, category];
      // Save to localStorage
      // localStorage.setItem("categoryFavorites", JSON.stringify(updatedFavorites));
      // return updatedFavorites;
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
            {loadingCategories ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                {categories.map((cat, idx) => (
                  <Card
                    key={cat._id}
                    index={idx}
                    category={cat}
                    selected={selected.includes(cat._id)}
                    selectedCategories={selected}
                    order={selectedWithOrder.get(cat._id)}
                    isFavorite={favorites.includes(cat._id)}
                    onCardClick={() => handleCardClick(cat._id)}
                    onFavoriteClick={() => handleFavoriteClick(cat)}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
