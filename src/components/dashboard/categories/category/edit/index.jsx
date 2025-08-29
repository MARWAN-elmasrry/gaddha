import { useParams } from "react-router-dom";
import CategoryTable from "../CategoryTable";
import "../Category.css";
import { useEffect, useState } from "react";
import { getCategoryById } from "../../../../../api/services/admingService";
import CustomFileUpload from "../../../../ui/FileUpload";
import { getGroups } from "../../../../../api/services/userService";
export default function CategoryEdit() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryById(id);
        setCategory(data);
        const groups = await getGroups();
        setGroups(groups);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <div className="category-container">
      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffd28a"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="edit-icon"
        >
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
        </svg>
        تعديل الفئة
      </h1>
      <div className="category-details">
        <h3 className="category-title">تفاصيل الفئة</h3>
        <div className="category-content">
          <div className="category-row">
            <label className="label">اسم الفئة:</label>
            <input
              type="text"
              className="category-input"
              value={category?.name || ""}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
            />
          </div>

          <div className="category-row">
            <label className="label">الوصف:</label>
            <textarea
              className="category-textarea"
              value={category?.description || ""}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
            />
          </div>

          <div className="category-row">
            <label className="label">الصورة:</label>
            <div className="value">
              {category?.image && (
                <img src={category.image} alt={category.name} className="preview-img" />
              )}
              <CustomFileUpload divText="رفع صورة" accept="image/*" />
            </div>
          </div>

          <div className="category-row">
            <label className="label">المجموعة:</label>
            <select
              className="category-input"
              value={category?.group || ""}
              onChange={(e) => setCategory({ ...category, group: e.target.value })}
            >
              <option value="">اختر المجموعة</option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <button className="edit-button" style={{ width: "30%" }}>
            تعديل
          </button>
        </div>
      </div>

      <div className="category-card">
        <h2 className="card-title">تفاصيل الأسئلة</h2>
        <CategoryTable questions={category?.questions} mode="edit" />
      </div>
    </div>
  );
}
