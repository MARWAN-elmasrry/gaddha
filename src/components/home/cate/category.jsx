import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./cStyle.css";
import { LatestThreeCate } from "../../../api/services/userService";
import { Loading } from "../../dashboard/dmain/dmain";

const Category = () => {
  const [lastThree, setLastThree] = useState([]);
  const [loadingLast , setLoadingLast] = useState(true)

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
      finally{
        setLoadingLast(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cat">
      <div className="container">
        <div className="cat-cont">
          <div className="info">
            <h1>فئاتنا الجديدة</h1>
          </div>
          {loadingLast?(<>
            <Loading />
          </>):(<>
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
          </>)}
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
