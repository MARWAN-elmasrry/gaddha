import { useState } from "react";
import { getUserCoins, giftUserCoins , addAdmin } from "../../../api/services/admingService";
import "./cStyle.css";
import { toast } from "react-toastify";

const Controls = () => {
  const [giftedCoinsData, setGiftedCoinsData] = useState({
    userId: "",
    amount: "",
    errors: "",
  });
  const [userCoinsData, setUserCoinsData] = useState({ userId: "", coins: "", errors: "" });
  const [addAdminData, setAddAdminData] = useState({ username: "", email: "",password: "", privileges: [] });
  // const [user,setUser] = useState("")
  // const [userHistory, setUserHistory ] = useState([]);
  
  const handleGiftUserCoins = async () => {
    try {
      await giftUserCoins({ userId: giftedCoinsData.userId, amount: giftedCoinsData.amount });
      toast.success("تم اضافة الالعاب بنجاح 🎉");
      setGiftedCoinsData({ userId: "", amount: "", errors: "" });
    } catch (error) {
      toast.error("حدث خطأ ⚠️");
      console.error("Error gifting coins:", error);
      setGiftedCoinsData((prev) => ({ ...prev, errors: "حدث خطأ أثناء إرسال العملات" }));
    }
  };
  
  const handleGetUserCoins = async () => {
    try {
      const coins = await getUserCoins(userCoinsData.userId);
      setUserCoinsData((prev) => ({ ...prev, coins }));
    } catch (error) {
      toast.error("حدث خطأ ⚠️");
      console.error("Error gifting coins:", error);
      setUserCoinsData((prev) => ({ ...prev, errors: "حدث خطأ أثناء محاولة جلب العملات" }));
    }
  };

  const handleAddAdmin = async() =>{
    try {
      await addAdmin(addAdminData)
      toast.success("نجح عمل الادمن");
    } catch (error) {
      toast.error("حدث خطأ ⚠️");
      console.error("Error adding admin", error);
    }
  }

// const handleGetHistory = async () => {
//   try {
//     const history = await getUserGameHistory(user);
//     setUserHistory(history); 
//     console.log(history)
//   } catch (error) {
//     toast.error("حدث خطأ");
//     console.error("Error getting history:", error);
//   }
// };

  const handleTogglePrivilege = (privilege) => {
    setAddAdminData((prev) => {
      const hasPrivilege = prev.privileges.includes(privilege);
      return {
        ...prev,
        privileges: hasPrivilege
          ? prev.privileges.filter((p) => p !== privilege)
          : [...prev.privileges, privilege],
      };
    });
  };

  return (
    <>
      <div className="control">
        <div className="container">
          <div className="control-cont">
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
              <h1>ادوات التحكم </h1>
              <div className="cont-info"></div>
            </div>
            <div className="cards">
              {/* <div className="card">
                <div className="info">
                  <div className="btn">
                    <button className="color" onClick={handleGiftUserCoins}>
                      حفظ
                    </button>
                    <button
                      className="no-color"
                      onClick={() => {
                        setGiftedCoinsData({ userId: "", amount: "", errors: "" });
                      }}
                    >
                      اعادة تهيئة
                    </button>
                  </div>
                  <h2>التحكم في الألعاب المتبقية</h2>
                </div>
                <div className="inputs">
                  <input
                    type="text"
                    placeholder=" ID إيميل رقم الهاتف أو"
                    dir="rtl"
                    value={giftedCoinsData.userId}
                    onChange={(e) =>
                      setGiftedCoinsData((prev) => ({ ...prev, userId: e.target.value }))
                    }
                  />
                  <input
                    type="number"
                    placeholder="عدد الألعاب للأضافه"
                    dir="rtl"
                    value={giftedCoinsData.amount}
                    onChange={(e) =>
                      setGiftedCoinsData((prev) => ({ ...prev, amount: e.target.value }))
                    }
                  />
                  <div style={{ color: "red", direction: "rtl", fontSize: "18px" }}>
                    {giftedCoinsData.errors}
                  </div>
                </div>
              </div> */}
              <div className="card">
                <div className="info">
                  <div className="btn">
                    <button className="color" onClick={handleGetUserCoins}>
                      عرض
                    </button>
                    <button
                      className="no-color"
                      onClick={() => {
                        setUserCoinsData({ userId: "", coins: "", errors: "" });
                      }}
                    >
                      اعادة تهيئة
                    </button>
                  </div>
                  <h2>التحكم في الألعاب المتبقية</h2>
                </div>
                <div className="inputs">
                  <input
                    type="text"
                    placeholder=" ID إيميل رقم الهاتف أو"
                    dir="rtl"
                    value={userCoinsData.userId}
                    onChange={(e) =>
                      setUserCoinsData((prev) => ({ ...prev, userId: e.target.value }))
                    }
                  />
                  {userCoinsData.coins && (
                    <div style={{ direction: "rtl", fontSize: "18px" }}>
                      <h2
                        style={{
                          direction: "rtl",
                          textAlign: "right",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          paddingRight: "14px",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span className="coin"></span>
                          {userCoinsData.coins}
                        </span>
                        لعبة متبقية
                      </h2>
                    </div>
                  )}
                </div>
              </div>
              <div className="card">
                <div className="info">
                  <div className="btn">
                    {/* onClick={handleGetHistory} */}
                    <button className="color"  >
                      عرض
                    </button>
                  </div>
                  <h2>عرض الألعاب السابقة</h2>
                </div>
                <div className="inputs">
                  {/* <input
                    type="text"
                    placeholder=" ID إيميل رقم الهاتف أو"
                    dir="rtl"
                    value={user}
                    onChange= {(e) => setUser(e.target.value)}
                  /> */}
                  <input
                    type="text"
                    placeholder=" ID إيميل رقم الهاتف أو"
                    dir="rtl"
                  />
                  {userCoinsData.coins && (
                    <div style={{ direction: "rtl", fontSize: "18px" }}>
                        
                    </div>
                  )}
                </div>
              </div>
              <div className="card">
                <div className="info">
                  <div className="btn">
                    <button className="color" 
                    onClick={() => handleAddAdmin()}
                    >حفظ</button>
                    <button
                      className="no-color"
                    >
                      اعادة تهيئة
                    </button>
                  </div>
                  <h2>تفضيلات التحكم</h2>
                </div>
                <div className="inputs">
                  <input
                    type="text"
                    placeholder=" اسم اليوزر "
                    dir="rtl"
                    value={addAdminData.username}
                    onChange={(e) =>
                      setAddAdminData((prev) => ({ ...prev, username: e.target.value }))
                    }
                  />
                  <input
                    type="text"
                    placeholder=" إيميل"
                    dir="rtl"
                    value={addAdminData.email}
                    onChange={(e) =>
                      setAddAdminData((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="الباسورد"
                    dir="rtl"
                    value={addAdminData.password}
                    onChange={(e) =>
                      setAddAdminData((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
                <div className="tools">
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("view_files") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("view_files")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>عرض الملفات</h3>
                  </div>
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("view_sales") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("view_sales")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>عرض المبيعات</h3>
                  </div>
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("view_reports") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("view_reports")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>عرض البلاغات</h3>
                  </div>
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("edit_reports") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("edit_reports")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>تعديل البلاغات</h3>
                  </div>
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("full_control") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("full_control")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>تحكم كامل</h3>
                  </div>
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("full_view") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("full_view")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>عرض كامل</h3>
                  </div>
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("manage_categories") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("manage_categories")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>ادارة الفئات</h3>
                  </div>
                  <div
                    className={`tool ${
                      addAdminData.privileges.includes("specific_categories") ? "selected" : ""
                    }`}
                    onClick={() => handleTogglePrivilege("specific_categories")}
                  >
                    <img src="/dashr.png" alt="" />
                    <h3>ادارة بعض الفئات</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Controls;
