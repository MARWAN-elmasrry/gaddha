import { useState } from "react";
import { useSelector } from "react-redux";
import "./uStyle.css";

import { passUser } from "../../../api/services/userService";

const Info = ({ user }) => {
  if (!user) {
    return <p>لا يوجد بيانات مستخدم</p>;
  }

  return (<>
    <div className="card">
      <div className="card-info">
        <div className="main-info">
          <h3>{user.username}</h3>
        </div>
        <div className="main-info">
          <h3>{user.name}</h3>
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
    </>
  );
};

const Sec = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState({ text: "", color: "#f9e7c5" });
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const handleClickShowOld = () => {
    setShowOld(!showOld);
  };
  const handleClickShowNew = () => {
    setShowNew(!showNew);
  };
  const showOldPasswordIcon = showOld ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      onClick={handleClickShowOld}
    >
      <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.77 21.77 0 015.06-5.94" />
      <path d="M1 1l22 22" />
      <path d="M9.88 9.88A3 3 0 0112 9c1.66 0 3 1.34 3 3 0 .53-.14 1.03-.38 1.46" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      onClick={handleClickShowOld}
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
  const showNewPasswordIcon = showNew ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      onClick={handleClickShowNew}
    >
      <path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.77 21.77 0 015.06-5.94" />
      <path d="M1 1l22 22" />
      <path d="M9.88 9.88A3 3 0 0112 9c1.66 0 3 1.34 3 3 0 .53-.14 1.03-.38 1.46" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      onClick={handleClickShowNew}
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ text: "", color: "#f9e7c5" });
    setLoading(true);

    if (newPassword !== confirmPass) {
      setMessage({ text: "كلمة المرور غير متطابقة", color: "#f9e7c5" });
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
        color: "#f9e7c5",
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
            type={showOld ? "text" : ""}
            dir="rtl"
            className="passnone"
            placeholder="كلمة المرور القديمة"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="contact-info">
          {showNewPasswordIcon}

          <input
            type={showNew ? "text" : "password"}
            dir="rtl"
            className="passnone"
            placeholder="كلمة المرور الجديدة"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mess">
          {showNewPasswordIcon}

          <input
            type={showNew ? "text" : "password"}
            dir="rtl"
            className="passnone"
            placeholder="أعد كتابة كلمة المرور الجديدة"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        {message.text && <p style={{ color: message.color, fontSize: 25 }}>{message.text}</p>}

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
            <div className="g-link-u">
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
          <div className={`card-flip-container ${isFlipping ? "flipping" : ""}`}>
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
