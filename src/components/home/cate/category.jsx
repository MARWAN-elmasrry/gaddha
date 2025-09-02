import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./cStyle.css";
import { LatestThreeCate } from "../../../api/services/userService";

const Category = () => {
  const [lastThree, setLastThree] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await LatestThreeCate(); // لازم await
        setLastThree(data);
        console.log(data);
      } catch (error) {
        toast.error(
          error.data?.data?.message ||
            error.message ||
            "خطأ فى جلب المجموعات"
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cat">
      <div className="container">
        <div className="cat-cont">
          <div className="info">
            <h1>الفئات</h1>
            <h2>هنا تشوفون جزء من فئاتنا, سووا حساب وشوفوا باقي الفئات</h2>
          </div>
          <div className="cards">
            {lastThree.length > 0 ? (
              lastThree.map((cat, index) => (
                <div key={index} className="card">
                  <div className="card-num">
                  </div>
                  <div className="card-info">
                    <img
                      src={cat.image || "./catimg.png"}
                      alt={cat.name || "Category"}
                    />
                    <h5>{cat.name}</h5>
                  </div>
                </div>
              ))
            ) : (
              <h1>لا يوجد فئات حالياً</h1>
            )}
          </div>

          <div className="bar-b">
            <button className="play"
            onClick={(e) => {
          e.preventDefault();
          window.location.href = "/games";
        }}
            >عرض المزيد</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
