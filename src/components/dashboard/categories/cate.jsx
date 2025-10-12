import { useCallback, useEffect, useState } from "react";
import "./cStyle.css";
import "./Category.css";
import CategoryForm from "./CategoryForm";
import {
  deleteCategory,
  getAllCategories,
  toggleCategoryVisibility,
} from "../../../api/services/admingService";
import { getGroups } from "../../../api/services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";

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
  const [warningModal, setWarningModal] = useState(false);
  const [deletedCategoryId, setDeletedCategoryId] = useState();
  const handleRefresh = useCallback(() => {
    setRefetch((prev) => !prev);
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
  }, [triggerRefetch, reFetch]);
  const handleToggleCategoryVisibility = async (categoryId) => {
    try {
      await toggleCategoryVisibility(categoryId);
      toast.success("تم تغيير حالة الفئة بنجاح");
      setTriggerRefetch((prev) => !prev);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(deletedCategoryId);
      toast.success("تم حذف الفئة بنجاح");
      setTriggerRefetch((prev) => !prev);
    } catch (error) {
      toast.error(error);
    }
    setWarningModal(false);
  };
  return (
    <>
      <Modal
        className="warning-modal-container"
        title=""
        isOpen={warningModal}
        onClose={() => setWarningModal(false)}
      >
        <div className="warning-modal-content">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-1 h-1 text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M6 7a1 1 0 011 1v7a1 1 0 102 0V8a1 1 0 112 0v7a1 1 0 102 0V8a1 1 0 011-1h1V6H5v1h1zm2-3a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1H8zM4 6h12v1a1 1 0 01-1 1H5a1 1 0 01-1-1V6z"
                clipRule="evenodd"
              />
            </svg>
            هل انت متاكد انك تريد الحذف
          </div>
          {/* <div>
            لا يمكن تغيير رقم الهاتف او الايميل,ولكن
            <br /> يمكنك التواصل معنا عبر قسم <br /> الرسائل لاخبارنا بالسبب وراء ذلك و سنساعدك
          </div> */}
          <div className="actions">
            <button onClick={handleDeleteCategory}>حذف</button>
            <button
              onClick={() => {
                setDeletedCategoryId("");
                setWarningModal(false);
              }}
            >
              الغاء{" "}
            </button>
          </div>
        </div>
      </Modal>
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
                <div
                  className="card-num"
                  onClick={() => {
                    setDeletedCategoryId(category._id);
                    setWarningModal(true);
                  }}
                >
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
                  <p>{category.playCount}</p>
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
