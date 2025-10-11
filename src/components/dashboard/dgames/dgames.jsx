import { useCallback, useEffect, useState } from "react";
import { getAllCategories } from "../../../api/services/admingService";
import "./dgStyle.css";
import { toast } from "react-toastify";

const Card = ({ category }) => {
  return (
    <div className="card">
      <div className="card-num">
        <span className="number">{category.playCount}</span>
      </div>
      <div className="card-info">
        <h4>{category.name}</h4>
        <img className="img-cate-card" src={category.image} alt={category.name} />
        <h5>{category.description}</h5>
      </div>
    </div>
  );
};

const Dgames = () => {
  const [categories, setCategories] = useState([]);
  const [reFetch, setRefetch] = useState(false);
  const handleRefresh = useCallback(() => {
    setRefetch((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
        toast.error("حدث خطأ ما");
      }
    };

    fetchData();
  }, [reFetch]);

  console.log(categories);

  return (
    <div className="d-games">
      <div className="container">
        <div className="d-games-cont">
          <div className="h-cont">
            <div className="back-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/admin";
                }}
              >
                <img src="/back.png" alt="رجوع" />
              </button>
            </div>
            <h1>الألعاب </h1>
            <div className="cont-info">
              <div className="info">
                <h3>عدد</h3>
                <p>{categories.reduce((sum, cat) => sum + (cat.playCount || 0), 0)}</p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              style={{
                position: "absolute",
                top: "60px",
                right: "20px",
                zIndex: 3,
              }}
              title="تحديث الصفحة (Ctrl+R)"
            >
              اعاده تحميل
            </button>
          </div>
          <div className="cards">
            {categories.map((cat) => (
              <Card key={cat._id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dgames;
