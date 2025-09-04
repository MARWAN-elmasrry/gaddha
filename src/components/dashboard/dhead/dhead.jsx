import "./dhStyle.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../userSlice";
import { useContext } from "react";
import { AbilityContext } from "../../../context/abilityContext";

const Dhead = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("authData"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);

  const menuItems = [
    { path: "/admin", label: "لوحة الإحصائيات" },
    { path: "/admin/dmess", label: "الرسائل", action: "view", subject: "Messages" },
    { path: "/admin/dreport", label: "البلاغات", action: "view", subject: "Reports" },
    { path: "/admin/dsale", label: "المبيعات", action: "view", subject: "Sales" },
    { path: "/admin/discount", label: "أكواد الخصم", action: "manage", subject: "all" },
    { path: "/admin/categories", label: "الفئات", action: "manage", subject: "Categories" },
    { path: "/admin/files", label: "الملفات", action: "view", subject: "Files" },
    { path: "/admin/controls", label: "ادوات التحكم", action: "manage", subject: "all" },
    { path: "/admin/dgames", label: "الألعاب", action: "manage", subject: "all" },
    { path: "/admin/users", label: "المستخدمين", action: "manage", subject: "all" },
  ];
  const filteredMenu = menuItems.filter(
    (item) => !item.subject || ability.can(item.action, item.subject)
  );
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <>
      <div className="d-head">
        <div className="container">
          <div className="d-head-cont">
            <div className="side-menu">
              <span className="icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <ul>
                {filteredMenu.map((item) => (
                  <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
                    <NavLink to={item.path}>
                      {item.label}
                      {location.pathname === item.path && (
                        <img src="/dashr.png" alt="" style={{ marginLeft: 20 }} />
                      )}
                    </NavLink>
                  </li>
                ))}
                <li className="exit">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    <img src="./exit.png" alt="" style={{ width: 20 }} /> exit
                  </a>
                </li>
              </ul>
            </div>
            <h1 style={{ direction: "rtl" }}>مرحباً مستر {user.username}</h1>
            <a href="/">
              <img src="/logo.png" alt="logo" style={{ width: 100 }} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dhead;
