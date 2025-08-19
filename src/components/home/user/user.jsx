import { useState } from "react";
import { useSelector } from "react-redux";
import "./uStyle.css";

import { passUser } from "../../../api/services/userService";

const Info = ({ user }) => {
  if (!user) {
    return <p>لا يوجد بيانات مستخدم</p>;
  }

  return (
    <div className="card">
      <div className="card-info">
        <div className="main-info">
          <h3>{user.username}</h3>
        </div>
        <div className="contact-info">
          <p>{user.email}</p>
        </div>
        <div className="mess">
          <p>
            {user.countryCode} - {user.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

const Sec = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState({ text: "", color: "red" });
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ text: "", color: "red" });
    setLoading(true);

    if (newPassword !== confirmPass) {
      setMessage({ text: "كلمة المرور غير متطابقة", color: "red" });
      setLoading(false);
      return;
    }
    try {
      await passUser(oldPassword, newPassword);
      setMessage({ text: "تم تغير كلمة المرور بنجاح", color: "green" });
      setOldPassword("");
      setNewPassword("");
      setConfirmPass("");
    } catch (err) {
      setMessage({
        text: err,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-info">
        <div className="main-info">
          <input
            type="password"
            dir="rtl"
            className="passnone"
            placeholder="كلمة المرور القديمة"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="contact-info">
          <input
            type="password"
            dir="rtl"
            className="passnone"
            placeholder="كلمة المرور الجديدة"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mess">
          <input
            type="password"
            dir="rtl"
            className="passnone"
            placeholder="أعد كتابة كلمة المرور الجديدة"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        {message.text && (
          <p style={{ color: message.color, fontSize: 20 }}>{message.text}</p>
        )}

        <div className="edit-btn">
          <button className="r-edit" onClick={handleSave} disabled={loading}>
            {loading ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </div>
      </div>
    </div>
  );
};

const User = () => {
  const user = useSelector((state) => state.users.user); // 👈 نجيب البيانات من Redux

  const [activeTab, setActiveTab] = useState("info");
  const [isFlipping, setIsFlipping] = useState(false);

  if (!user) {
    return <h2>❌ مفيش بيانات مستخدم</h2>;
  }

  const handleTabClick = (tab, event) => {
    event.preventDefault();
    if (tab !== activeTab) {
      setIsFlipping(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => setIsFlipping(false), 50);
      }, 150);
    }
  };

  return (
    <div className="user">
      <div className="container">
        <div className="user-cont">
          <h1>الحساب</h1>
          <div className="g-links">
            <div className="g-link">
              <a
                className={activeTab === "sec" ? "g-active" : ""}
                href="#"
                onClick={(e) => handleTabClick("sec", e)}
              >
                الأمان
              </a>
              <a
                className={activeTab === "info" ? "g-active" : ""}
                href="#"
                onClick={(e) => handleTabClick("info", e)}
              >
                معلومات
              </a>
            </div>
          </div>
          <div
            className={`card-flip-container ${isFlipping ? "flipping" : ""}`}
          >
            <div className="card-content">
              {activeTab === "sec" && <Sec />}
              {activeTab === "info" && <Info user={user} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
