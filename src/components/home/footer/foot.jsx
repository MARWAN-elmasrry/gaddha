import "./footStyle.css";
import { useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const location = useLocation();
  const isUserPage = location.pathname === "/user";
  const user = useSelector((state) => state.users.user);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-cont">
          {!isUserPage && (
            <div className="back-img">
              <div className="info-f">
                <h1>قدها ولابس سوالف؟</h1>
                <h3>!ورنا الحين</h3>
                <div className="btn-play">
                  <button
                    className="play"
                    style={{ position: "relative", zIndex: "100" }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/games";
                    }}
                  >
                    العب
                  </button>
                  <div className="an an1"></div>
                  <div className="an an2"></div>
                  <div className="an an3"></div>
                  <div className="an an4"></div>
                </div>
              </div>
              <img src="/hero.png" alt="hero" />
              <img src="/herof.png" alt="herof" />
              <img src="/logo.png" alt="logo" style={{ width: 120 }} />
            </div>
          )}

          {isUserPage && (
            <div className="camel">
              <img src="/camel.png" alt="camel" />
              <img src="/cam.png" alt="camel-deco" />
            </div>
          )}
        </div>
      </div>

      <div className="links">
        <div className="link-cont">
          <div className="f-links">
            <div className="all-links">
              <div className="game-links">
                <p className="game-links-p">صفحات</p>

                <NavLink to="/" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  الرئيسية
                </NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  تواصل
                </NavLink>

                {isLoggedIn ? (
                  <NavLink to="/user" className={({ isActive }) => (isActive ? "active-f" : "")}>
                    {user?.role ? "لوحة الإحصائيات" : "حسابى"}
                  </NavLink>
                ) : (
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "active-f" : "")}>
                    تسجيل
                  </NavLink>
                )}

                <NavLink to="/games" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  إنشاء لعبة
                </NavLink>
                <NavLink to="/games" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  ألعابي
                </NavLink>
              </div>

              <div className="police-links">
                <p className="police-links-p">السياسات</p>
                <NavLink to="/privacy" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  سياسة الخصوصية
                </NavLink>
                <NavLink to="/refund" className={({ isActive }) => (isActive ? "active-f" : "")}>
                  سياسة الاسترداد
                </NavLink>
              </div>

              <div className="links-icons">
                <a
                  href="https://www.instagram.com/gaddhasa?igsh=dG42c2x1OHcybHFo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="./ico-inst.png" alt="Instagram" style={{ width: 40, height: 40 }} />
                </a>
                <a
                  href="https://www.tiktok.com/@gaddhasa?_t=ZS-8zaEqdZFdZa&_r=1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="./ico-tik.png" alt="TikTok" style={{ width: 40, height: 40 }} />
                </a>
                <a href="https://x.com/gaddhasa?s=11" target="_blank" rel="noreferrer">
                  <img src="./ico-x.png" alt="X" style={{ width: 40, height: 40 }} />
                </a>
                <p className="game-links-p">تواصل</p>
              </div>
            </div>

            <div className="f-logo">
              <img src="/logo.png" alt="logo" />
              <h2 className="footer-text-header">
                قدها ولا بس سوالف؟
                <svg
                  width="125"
                  height="4"
                  viewBox="0 0 125 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "none" }}
                >
                  <path d="M22.9167 0L20.8333 2L22.9167 4L25 2L22.9167 0Z" fill="#F4BE32" />
                  <path d="M10.4167 0L8.33333 2L10.4167 4L12.5 2L10.4167 0Z" fill="#F4BE32" />
                  <path d="M18.75 0L16.6667 2L18.75 4L20.8333 2L18.75 0Z" fill="#F4BE32" />
                  <path d="M6.25 0L4.16667 2L6.25 4L8.33333 2L6.25 0Z" fill="#F4BE32" />
                  <path d="M14.5833 0L12.5 2L14.5833 4L16.6667 2L14.5833 0Z" fill="#F4BE32" />
                  <path d="M2.08333 0L0 2L2.08333 4L4.16667 2L2.08333 0Z" fill="#F4BE32" />
                  <path d="M47.9167 0L45.8333 2L47.9167 4L50 2L47.9167 0Z" fill="#F4BE32" />
                  <path d="M35.4167 0L33.3333 2L35.4167 4L37.5 2L35.4167 0Z" fill="#F4BE32" />
                  <path d="M43.75 0L41.6667 2L43.75 4L45.8333 2L43.75 0Z" fill="#F4BE32" />
                  <path d="M31.25 0L29.1667 2L31.25 4L33.3333 2L31.25 0Z" fill="#F4BE32" />
                  <path d="M39.5833 0L37.5 2L39.5833 4L41.6667 2L39.5833 0Z" fill="#F4BE32" />
                  <path d="M27.0833 0L25 2L27.0833 4L29.1667 2L27.0833 0Z" fill="#F4BE32" />
                  <path d="M72.9167 0L70.8333 2L72.9167 4L75 2L72.9167 0Z" fill="#F4BE32" />
                  <path d="M60.4167 0L58.3333 2L60.4167 4L62.5 2L60.4167 0Z" fill="#F4BE32" />
                  <path d="M68.75 0L66.6667 2L68.75 4L70.8333 2L68.75 0Z" fill="#F4BE32" />
                  <path d="M56.25 0L54.1667 2L56.25 4L58.3333 2L56.25 0Z" fill="#F4BE32" />
                  <path d="M64.5833 0L62.5 2L64.5833 4L66.6667 2L64.5833 0Z" fill="#F4BE32" />
                  <path d="M52.0833 0L50 2L52.0833 4L54.1667 2L52.0833 0Z" fill="#F4BE32" />
                  <path d="M97.9167 0L95.8333 2L97.9167 4L100 2L97.9167 0Z" fill="#F4BE32" />
                  <path d="M85.4167 0L83.3333 2L85.4167 4L87.5 2L85.4167 0Z" fill="#F4BE32" />
                  <path d="M93.75 0L91.6667 2L93.75 4L95.8333 2L93.75 0Z" fill="#F4BE32" />
                  <path d="M81.25 0L79.1667 2L81.25 4L83.3333 2L81.25 0Z" fill="#F4BE32" />
                  <path d="M89.5833 0L87.5 2L89.5833 4L91.6667 2L89.5833 0Z" fill="#F4BE32" />
                  <path d="M77.0833 0L75 2L77.0833 4L79.1667 2L77.0833 0Z" fill="#F4BE32" />
                  <path d="M122.917 0L120.833 2L122.917 4L125 2L122.917 0Z" fill="#F4BE32" />
                  <path d="M110.417 0L108.333 2L110.417 4L112.5 2L110.417 0Z" fill="#F4BE32" />
                  <path d="M118.75 0L116.667 2L118.75 4L120.833 2L118.75 0Z" fill="#F4BE32" />
                  <path d="M106.25 0L104.167 2L106.25 4L108.333 2L106.25 0Z" fill="#F4BE32" />
                  <path d="M114.583 0L112.5 2L114.583 4L116.667 2L114.583 0Z" fill="#F4BE32" />
                  <path d="M102.083 0L100 2L102.083 4L104.167 2L102.083 0Z" fill="#F4BE32" />
                </svg>
              </h2>{" "}
              <div className="line"></div>
            </div>
          </div>

          <div className="p-police">
            <p>2025 قدّها, كل الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
