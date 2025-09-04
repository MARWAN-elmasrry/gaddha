import "./hStyle.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../userSlice";
import { useEffect, useState } from "react";
import { myMessagesResponses } from "../../../api/services/userService";
import Logo from "../../../../public/logo.png"

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const [openNotifications, setOpenNotifications] = useState(false);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await myMessagesResponses();
        setAllNotifications(data);
        setNotifications(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchData();
  }, [user]);

  const menuItems = [
    { path: "/", label: "الرئيسية" },
    { path: "/contact", label: "تواصل" },
    { path: "/games", label: "إلعب" },
    { path: "/packages", label: "الباقات" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleShack = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600); 
  };

  return (
    <header>
      <div className="container">
        <div className="head-cont">
          <div className="links">
            <div className="side-menu">
              <span className="icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <ul className="open">
                {menuItems.map((item) => (
                  <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
                    <NavLink to={item.path}>
                      {item.label}
                      {location.pathname === item.path && <img src="/dashr.png" alt="" />}
                    </NavLink>
                  </li>
                ))}

                {user && (
                  <>
                    <li className={location.pathname === "/user" ? "active" : ""}>
                      <NavLink to="/user">
                        {user.role ? "لوحة الإحصائيات" : "حسابى"}
                        {location.pathname === "/user" && <img src="/dashr.png" alt="" />}
                      </NavLink>
                    </li>

                    <li className="exit">
                      <button onClick={handleLogout} className="logout-btn">
                        تسجيل الخروج <img src="./exit.png" alt="" style={{ width: 20 }} />
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {user ? (
              <>
                <button className="points"
                  onClick={(e) => {
          e.preventDefault();
          window.location.href = "/packages";
        }}
                >
                  <img src="./ydot.png" alt="" style={{ width: 25 }} /> {user.coins}
                </button>

                <div className="notification-wrapper" style={{ position: "relative" }}>
                  <button
                    className="notification-btn"
                    onClick={() => setOpenNotifications((prev) => !prev)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill={openNotifications ? "#8b3e1f" : "#f9e7c5"}
                      viewBox="0 0 24 24"
                      onClick={handleShack}
                      className={isShaking ? "shake" : ""}
                    >
                      <path d="M12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm6.364-6c-.958-.958-1.364-2.165-1.364-3.464V10c0-3.309-2.691-6-6-6S5 6.691 5 10v4.536c0 1.299-.406 2.506-1.364 3.464L2 20h20l-3.636-2z" />
                    </svg>
                  </button>

                  {openNotifications && (
                    <div className="notification-menu">
                      <div className="notification-header">الإشعارات</div>

                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            className={`notification-item ${!n.seen ? "unread" : ""}`}
                            onClick={() => setExpanded((prev) => (prev === n._id ? null : n._id))}
                          >
                            <div className="icon">💬</div>
                            <div className="content">
                              <div className="title">رد جديد من الأدمن</div>

                              {expanded === n._id && (
                                <div className="message">
                                  <p>
                                    <strong>انت:</strong> {n.content}
                                  </p>
                                  <p>
                                    <strong>الرد:</strong> {n.response}
                                  </p>
                                </div>
                              )}

                              <div className="time">
                                {new Date(n.timestamp).toLocaleString("ar-EG", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  day: "numeric",
                                  month: "short",
                                })}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="no-notifications">لا يوجد إشعارات</p>
                      )}

                      <div className="notification-footer">
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.preventDefault();
                            setShowAllNotifications((prev) => !prev);
                            setNotifications((prev) => {
                              if (showAllNotifications) {
                                return prev.slice(0, 3);
                              }
                              return allNotifications;
                            });
                          }}
                        >
                          {showAllNotifications ? "إ خفاء" : " عرض كل الإشعارات"}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button onClick={() => navigate("/login")} className="play">
                تسجيل
              </button>
            )}
          </div>
          <a href="/">
            <img src={Logo} alt="logo" style={{ width: 100 }} />
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;
