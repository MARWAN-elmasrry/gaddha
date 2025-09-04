import { useCallback, useEffect, useState } from "react";
import "./cStyle.css";
import CategoryForm from "./CategoryForm";
import { getAllCategories, toggleCategoryVisibility } from "../../../api/services/admingService";
import { getGroups } from "../../../api/services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const cards = Array.from({ length: 4 });

  const [openCategoryFormCreate, setOpenCategoryFormCreate] = useState(false);
  //   const [openCategoryFormEdit, setOpenCategoryFormEdit] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [mode, setMode] = useState("create");
  const [categories, setCategories] = useState([]);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [groups, setGroups] = useState([]);
  const [reFetch, setRefetch] = useState(false);
        const handleRefresh = useCallback(() => {
          setRefetch(prev => !prev);
        }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        const groups = await getGroups();
        setGroups(groups);
      } catch (err) {
        console.error(err);
        toast.error("خطا غى سحب البيانات");
      }
    };

    fetchData();
  }, [triggerRefetch,reFetch]);
  const handleToggleCategoryVisibility = async (categoryId) => {
    try {
      await toggleCategoryVisibility(categoryId);
      toast.success("تم تغيير حالة الفئة بنجاح");
      setTriggerRefetch((prev) => !prev);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <CategoryForm
        open={openCategoryFormCreate}
        setOpen={setOpenCategoryFormCreate}
        setTriggerRefetch={setTriggerRefetch}
        groups={groups}
      />

      <div className="cate">
        <div className="container">
          <div className="h-cont">
            <div className="back-btn">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/admin";
                }}
              >
                <img src="/back.png" alt="" />
              </button>
            </div>
            <h1>الفئات</h1>
            <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
              <div
                onClick={() => {
                  setMode("create");
                  setInitialData(null);
                  setOpenCategoryFormCreate(true);
                }}
                className="add-button"
              >
                <button>اضافة</button>
              </div>
              <div className="cont-info">
                <div className="info">
                  <h3>عدد</h3>
                  <p>{categories.length}</p>
                </div>
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
            {categories?.map((category, idx) => (
              <div className="card">
                <div className="card-num">
                  <span class="number">
                    <img src="/delete.png" alt="" />
                  </span>
                </div>
                <div className="card-info">
                  <button onClick={() => navigate(`/admin/category/edit/${category._id}`)}>
                    تعديل
                  </button>
                  <button onClick={() => handleToggleCategoryVisibility(category._id)}>
                    {category.isVisible ? "إخفاء" : "رفع"}
                  </button>
                  <button onClick={() => navigate(`/admin/category/view/${category._id}`)}>
                    عرض
                  </button>
                  <p>322</p>
                  <p>{category.questionsCount}</p>
                  <p>{category.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
