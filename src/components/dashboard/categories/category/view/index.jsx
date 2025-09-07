import { useParams } from "react-router-dom";
import CategoryTable from "../CategoryTable";
import "../Category.css";
import { useEffect, useState } from "react";
import { getCategoryById } from "../../../../../api/services/admingService";
export default function CategoryView() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(id);
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="view-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="#ffd28a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          عرض الفئة
        </h1>
        <div className="back-btn">
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/admin/categories";
            }}
          >
            <img src="/back.png" alt="" />
          </button>
        </div>
      </div>
      <div class="category-details">
        <h3 class="category-title">تفاصيل الفئة</h3>
        <div class="category-content">
          <div class="category-row">
            <span class="label">اسم الفئة:</span>
            <span class="value">{category?.name}</span>
          </div>
          <div class="category-row">
            <span class="label">الوصف:</span>
            <span class="value">{category?.description}</span>
          </div>
          <div class="category-row">
            <span class="label">الصورة:</span>
            <span class="value">
              <img src={category?.image} alt={category?.name} />
            </span>
          </div>
          <div class="category-row">
            <span class="label">المجموعة:</span>
            <span class="value">{category?.group}</span>
          </div>
        </div>
      </div>
      <div className="category-card">
        <h2 className="card-title">تفاصيل الأسئلة</h2>
        <CategoryTable questions={category?.questions} mode="view" />
      </div>
    </div>
  );
}
