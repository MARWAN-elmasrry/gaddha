import { useEffect, useState } from "react";
import { getAllCategories } from "../../../api/services/admingService";
import "./dgStyle.css";

const Card = ({ category }) => {
  return (
    <div className="card">
      <div className="card-num">
        <span className="number"></span>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

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
                <p>{categories.length}</p>
              </div>
            </div>
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
